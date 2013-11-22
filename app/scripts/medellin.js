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
            graph: null,
            graphAreas: null,
            tooltip: null
        },
        
        tips: {
            'puente-mirador': 'Puente Mirador',
            'dwelling-consolidation': 'juan bobo stream',
            'paseo-urbano': 'Paseo urbano de la 107',
            'improving-road': 'Improving the road',
            'parque-imaginacion': 'Parque de la imaginaci&oacute;n',
            'parque-lineal': 'Parque lineal la herrera',
            'parque-biblioteca': 'Parque biblioteca espa&ntilde;a',
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

            el.graph = $( '#interactive-graph' );
            el.graphAreas = el.graph.find( '.button' );

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

                Medellin.el.graphAreas.on( 'click', this.findArea );

                Utils.pubSub
                    .sub( 'location:reset', this.resetLocations )
                    .sub( 'area:reset', this.resetAreas )
                    .sub( 'location:found', Medellin.showLocation )
                    .sub( 'locations:hidden', this.resetLocations )
                    .sub( 'locations:hidden', this.resetAreas )
                ;

            },

            hideTip: function( d, idx ) {
                Medellin.el.tooltip.classed('show', false);
            },

            showTip: function( d, idx ) {
                
                var that        = this,
                    location    = Medellin.el.locations.filter(function(){ return this === that; } ),
                    data        = location.datum(),
                    d3          = Medellin.d3,
                    mouse       = d3.mouse( this ),
                    id          = location.property('id'),
                    text        = data ? data.text : Medellin.tips[id],
                    tooltip     = Medellin.el.tooltip.html(text).classed( 'show', true ),
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

            resetAreas: function() {
                
                Medellin.el.graphAreas.removeClass( 'active' );
                Medellin.el.areas.style( 'opacity', 0 );

            },

            resetLocations: function() {
                Medellin.el.locations.classed( 'active', false );
                
            },

            // Find areaContent
            // Reset location circles
            // Then set area to active
            // Then show content
            findArea: function( e ) {

                e.preventDefault();

                var el = Medellin.el,
                    graphAreas = el.graphAreas,
                    trigger = graphAreas.filter(this),
                    contentId
                ;

                
                Utils.pubSub.pub( 'location:reset' );

                if( ! trigger.hasClass( 'active' ) ) {
                    
                    contentId = trigger.data( 'area' );
                    Utils.pubSub.pub( 'area:reset' );
                    trigger.addClass( 'active' );

                    Medellin.toggleArea( contentId, 0.85 );

                }

                Utils.pubSub.pub( 'location:found', [contentId]);


            },
            // findLocation
            // Reset areas
            // Set location to active
            // Show content
            findLocation: function( d, locationIndex ) {

                var el = Medellin.el,
                    location = el.locations.select(function( d, idx ){ return idx === locationIndex ? this : null; }),
                    contentId
                ;

                Utils.pubSub.pub( 'area:reset' );

                if( !location.classed( 'active' ) ) {
                    contentId = location.attr('id') ;
                    Utils.pubSub.pub( 'location:reset' );
                    location.classed( 'active', true );
                }

                Utils.pubSub.pub( 'location:found', [contentId]);

            }

        },

        on: function( evt, cb ) {
            
            Utils.pubSub.sub( evt, cb );

            return this;

        },
        

        // Show location
        // Should hide 
        showLocation: function( e, contentId ) {
            
            var locationContent = Medellin.el.locationContent,
                content = contentId ? locationContent.filter( '[data-location="' + contentId + '"]' ) : false
            ;
            
            locationContent.hide();

            if( content ) {
                
                content.fadeIn();

            } else {

                
                Utils.pubSub.pub( 'locations:hidden' );
            
            }

            return this;

        },

        toggleArea: function( area, opacity ) {
            
            this.el.areas
                .style( 'opacity', 0 )
                .filter( '#' + area ).style( 'opacity', opacity )
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