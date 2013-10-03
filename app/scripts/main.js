'use strict';

(function(window, undefined ) {


    var App = window.App = window.App || {};

    /** =jQuery Library */
    App.$ = window.jQuery;

    /** =UI Namespace */
    App.UI = {};


    /** =D3 Library */
    App.UI.D3 = window.d3;


    /** =Utilities */
    App.UI.Utils = (function Utils($) {
            
        var exports = {};

        
        exports.pubSub = {

            o: $({}),

            sub: function() {
                this.o.on.apply( this.o, arguments );
            },

            un: function() {
                this.o.off.apply( this.o, arguments );
            },

            pub: function() {
                this.o.trigger.apply( this.o, arguments );
            }

        };

        
        return exports;


    })( App.$ );



    App.UI.Map = (function($, d3, Utils){

        var Map = function Map( elem, rdyCallback ) {

            this._init( elem, rdyCallback );

            return this;
        };


        Map.prototype._init = function( elem, rdyCallback ) {
            
            // If a callback was specified
            // register it on the readyCallback
            if( rdyCallback && typeof rdyCallback === 'function' ) {
                
                this.ready( rdyCallback );

            }

            // Initialize our elements
            this._initElements( elem, this._prepareMap );

            return this;
        };


        Map.prototype._prepareMap = function( xml ) {

            var dMap        = this.dMap,
                node        = this.node = document.importNode( xml.documentElement, true ),
                data        = this.$el.data(),
                imageSrc    = data.image,
                imageWidth  = data.imageWidth || 566,
                imageHeight = data.imageHeight || 428
            ;
            
            // Finally Append the map.
            dMap.node().appendChild( node );

                
            if( imageSrc ) {

                dMap.select( 'svg' )
                    .insert( "svg:image", ":first-child" )
                        .attr( {
                            "xlink:href": imageSrc,
                            'width': imageWidth,
                            'height': imageHeight
                        });


            }



            // Okay, we're done
            // Notifiy that we're done processing the map.
            Utils.pubSub.pub( 'map:ready', [dMap] );

            return this;
            
        };


        Map.prototype._initElements = function( elem, cb ) {

            // Reference to Map
            var self = this;
            
            // Set the el 
            this.el     = ( 'object' === typeof elem ) ? elem : document.getElementById( elem );
            
            // Get a jQuery reference
            this.$el    = $( this.el );

            // Get the d3 Map reference
            this.dMap    = d3.select( this.el );

            // Have D3 Fetch the xml file.
            // Then call buildMap with the xml result
            d3.xml( this.$el.data( 'svg' ), 'image/xvg+xml', function( xml ) {
            
                cb.call( self, xml );
            
            });

            return this;

        };

        /**
         * Callback ready handler
         * Call this function to receive the d3 enabled Map
         *
         * var map = new App.UI.Map( 'map-id' );
         * map.ready( function( e, d3Map ) { ... };
         *
         * @param cb 
         */
        Map.prototype.ready = function( cb ) {
            
            if( cb ) {
                Utils.pubSub.sub( 'map:ready', cb );
            }
        };


        return Map;

    })( App.$, App.UI.D3, App.UI.Utils );



})(window);


var map = new App.UI.Map( 'interactive-map' );


map.ready( function( e, dMap ) {
    
    var Medellin = {

        anim: {
            delay: 500,
            duration: 1000
        },

        el: {
            whiteDots:   dMap.select( '#white-dots' ).selectAll( 'circle' ).style( 'opacity', 0 ),
            blueStation: dMap.select( "#blue-dot" ).style( 'opacity', 0 ),
            greenStations: dMap.select( '#green-dots' ).selectAll( 'circle' ).style( 'opacity', 0 ),
            greenLine:   dMap.select( '#green-line' ),
            mask:        dMap.select( '#area-mask' ).style( 'opacity', 0 )
        },
        
        
        transition: null,

        draw: {

            stations: function() {

                var el              = Medellin.el,
                    greenStations   = el.greenStations,
                    blueStation     = el.blueStation,
                    greenLine       = el.greenLine,
                    currDot         = 0,
                    offsets         = [-200, -120, 0],
                    anim            = {
                        delay: 1000,
                        duration: 500
                    }
                ;
                

                function dot() {
                    currDot++;
                    return greenStations.filter( ':nth-child(' + currDot + ')').transition().style( 'opacity', 1 );
                }
                
                function line() {
                    var offset = offsets.shift();
                    return greenLine.transition().style( 'stroke-dashoffset', offset );
                }

                function start() {
                    return blueStation.transition().delay(anim.delay).duration(anim.duration).style('opacity', 1);
                }

                return start()
                        .transition()
                            .each(line)
                        .transition()
                            .each(dot)
                        .transition()
                            .each(line)
                        .transition()
                            .each(dot)
                        .transition()
                            .each(line)
                        .transition()
                            .each(dot)
                ;
                
            },


            line: function() {
                return Medellin.el.greenLine.transition().style( 'stroke-dashoffset', 0 );
            },


            locations: function() {

                var whiteDots = Medellin.el.whiteDots,
                    count = whiteDots.size()
                ;
                
                function showDelay( e, idx ) {
                    return ( idx / count ) * ( Medellin.anim.delay * 4 );
                }

                return Medellin.el.whiteDots.transition().delay(showDelay).style( 'opacity', 1 );
            },

            mask: function() {
                return Medellin.el.mask.transition().style( 'opacity', '.45' );
            },

            init: function() {

                Medellin
                .transition
                    .each( this.mask )
                    .transition()
                        .each( this.stations )
                    .transition()
                        .each( 'end', this.locations );

            }
        },

        init: function() {

            // Initialize the transition object
            this.transition = dMap.transition().duration( this.anim.duration ).delay( this.anim.delay );
            
            // Now draw the map
            this.draw.init();

        }

    };


    
    Medellin.init();


});
