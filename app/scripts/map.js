'use strict';

(function(window, App, undefined ) {


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

    })( App.$, App.UI.D3, App.Utils );



})(window, window.App );