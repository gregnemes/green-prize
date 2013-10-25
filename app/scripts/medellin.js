'use strict';

(function(window, $, App, Utils){

    var Medellin = window.Medellin = {

        anim: {
            delay: 500,
            duration: 1000
        },

        dMap: null,

        d3: App.UI.D3,

        el: {
            areas: null,
            locations: null,
            stations:  null,
            greenLine: null,
            mask:      null,
            locationContent: null,
            tooltip: null
        },
        
        tips: {
            'puente-mirador': 'Puente Mirador: Andaluci\'a-la fancia bridge',
            'dwelling-consolidation': 'Dwelling consolidation and environmental restoration in juan bobo stream',
            'paseo-urbano': 'Paseo urbano de la 107',
            'improving-road': 'Improving the road system: 42C, 42D, and 43',
            'parque-imaginacion': 'Parque de la imaginacio\'n',
            'parque-lineal': 'Parque lineal la herrera',
            'parque-biblioteca': 'Parque biblioteca españa, Santo Domingo',
            'paseo-calle': 'Paseo calle 106, urban street promenade',
            'santo-domingo': 'Santo domingo savio cedezo',
            'granzial-sports': 'Granzial Sports Complex'
        },

        transition: null,

        draw: {

            stations: function() {

                var el              = Medellin.el,
                    stations        = el.stations,
                    greenLine       = el.greenLine,
                    currDot         = 1,
                    offsets         = [-200, -120, 0],
                    anim            = {
                        delay: 1000,
                        duration: 500
                    }
                ;
                

                function dot() {
                    currDot++;
                    return stations.filter( ':nth-child(' + currDot + ')').transition().style( 'opacity', 1 );
                }
                
                function line() {
                    var offset = offsets.shift();
                    return greenLine.transition().style( 'stroke-dashoffset', offset );
                }

                function start() {
                    return stations.filter( ':nth-child(1)' ).transition().delay(anim.delay).duration(anim.duration).style('opacity' , 1);
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

                var locations = Medellin.el.locations,
                    count = locations.size()
                ;
                
                function showDelay( e, idx ) {
                    return ( idx / count ) * ( Medellin.anim.delay * 4 );
                }

                return Medellin.el.locations.transition().delay(showDelay).style( 'opacity', 1 );
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
                        .each( this.locations )
                    .transition()
                        .each( 'end', function() {
                            
                            Medellin.events.ready();

                        });

            }
        },

        initElements: function() {
            
            var el = this.el,
                dMap = this.dMap
            ;

            el.areas            = dMap.select( '#areas' ).selectAll( 'path' ).style('opacity', 0);
            el.locations        = dMap.select( '#locations' ).selectAll( 'circle' ).style( 'opacity', 0 );
            el.stations         = dMap.select( '#stations' ).selectAll( 'circle' ).style( 'opacity', 0 );
            el.greenLine        = dMap.select( '#green-line' );
            el.mask             = dMap.select( '#area-mask' ).style( 'opacity', 0 );
            el.locationContent  = $( '#location-content' ).find( '[data-location]');
            el.tooltip          = dMap.append('div').attr( 'class', 'tooltip rotate');

            return this;
        },

        events: {
            
            ready: function() {
                
                Utils.pubSub.pub( 'medellin:ready' );

            },

            bindEvents: function() {

                Medellin.el.locations
                    .on( 'click', this.findLocation )
                    .on( 'mouseover', this.showTip )
                    .on( 'mouseout', this.hideTip )
                ;

                Utils.pubSub.sub( 'location:found', Medellin.showLocation );
            },

            hideTip: function( d, idx ) {
                Medellin.el.tooltip.classed('show', false).style({top:'auto',left:'auto'});
            },

            showTip: function( d, idx ) {
                
                var that        = this,
                    location    = Medellin.el.locations.filter(function(){ return this === that; } ),
                    data        = location.datum(),
                    d3          = Medellin.d3,
                    mouse       = d3.mouse( this ),
                    id          = location.property('id'),
                    text        = data ? data.text : Medellin.tips[id],
                    tooltip     = Medellin.el.tooltip.text(text).classed( 'show', true ),
                    height      = data ? data.height : parseInt( tooltip.style('height'), 10 ),
                    width       = data ? data.width :  parseInt( tooltip.style('width'), 10 ) + 10,
                    coords      = {
                        left:   parseInt( mouse[0], 10 ) - ( width / 2 ) + 'px',
                        top:    parseInt( mouse[1], 10 ) + ( width / 2 ) + 40 + 'px'
                    }
                ;
                
                // Set the coordinates
                tooltip.style(coords);

                // Cache the known width + height properties
                if( !data ) {
                    location.datum({
                        height: height,
                        width: width,
                        text: text
                    });
                }
                
                
                

            },

            findLocation: function( d, locationIndex ) {

                var el = Medellin.el,
                    location = el.locations.select(function( d, idx ){ return idx === locationIndex ? this : null; }),
                    content = el.locationContent.filter( '[data-location="' + location.attr('id') + '"]' )
                ;


                Utils.pubSub.pub( 'location:found', [location, content, locationIndex]);
                

            }

        },

        on: function( evt, cb ) {
            
            Utils.pubSub.sub( evt, cb );

            return this;

        },

        showLocation: function( e, location, content ) {
            
            var el = Medellin.el,
                locationContent = el.locationContent,
                locations = el.locations,
                isActive = location.classed( 'active' ) ? false : true
            ;


            locations.classed('active', false );
            location.classed( 'active', isActive );
            locationContent.hide();

            if( !isActive ) {

                Utils.pubSub.pub( 'locations:hidden' );
            
            } else {
                content.fadeIn();
            }

            return this;

        },

        next: function(idx) {

            this.events.findLocation( null, idx );

            return this;
        },

        prev: function(idx) {
            
            this.events.findLocation( null, idx );

            return this;
        },

        toggleArea: function( area, opacity ) {

            this.el.areas
                .style( 'opacity', 0 )
                .filter('#' + area ).style( 'opacity', opacity )
            ;

            return this;
        },

        init: function( dMap ) {

            this.dMap = dMap;

            // Initialize Elements
            this.initElements();

            // Initialize the transition object
            this.transition = dMap.transition().duration( this.anim.duration ).delay( this.anim.delay );
            
            // Bind Events
            this.events.bindEvents();

            // Now draw the map
            this.draw.init();

            return this;

        }

    };


})(window, window.App.$, window.App, window.App.Utils );