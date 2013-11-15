'use strict';

(function(window, $, Utils, d3, undefined ) {

    window.MedellinTimeline = {

        tl: null,

        el: {
            main: null,
            lineGraph: null,
            redLine: null,
            dataPoints: null,
            xAxis: null,
            yAxis: null,
            shadow: null
        },

        buildTimeline: function() {

            var el = this.el,
                tl = this.tl,
                graphSegments = [580, 290, 160, 100, 0],
                lineSegments = [ 165, 410, 540, 615, 693],
                currPoint = 1
            ;

            function point() {
                el.dataPoints.filter(':nth-child(' + ( currPoint++ ) + ')').transition().style( 'opacity', 1 );
            }

            function line() {
                el.redLine.transition().attr( 'width', lineSegments.shift() );
                return el.lineGraph.transition().style( 'stroke-dashoffset',  graphSegments.shift() );
            }

            function shadow() {
                return el.shadow.transition().attr('width', 150);
            }

            function start() {
                el.yAxis.transition().attr('transform', 'translate(0)' );
                return el.xAxis.transition().ease( 'linear' ).delay(400).duration(1000).attr( 'transform', 'translate(0, 0)' ).style('opacity', 1);
            }

            setTimeout(function(){

                tl.classed( 'showgraph', true );
                
                start()
                    .transition()
                        .each(line)
                    .transition()
                        .each(point)
                        .each(line)
                    .transition()
                        .each(point)
                        .each(line)
                        .each(shadow)
                        .each(point)
                    .transition()
                        .each(point)
                        .each(line)
                    .transition()
                        .each(point)
                        .each(line)
                    .transition()
                        .each(point)
                ;


            });

        },

        initElements: function( e, element, xml ) {
            
            var el = this.el,
                // Get the d3 element
                tl = this.tl = d3.select( element )
            ;

            // Insert the xml document into the d3 canvas
            tl.node().appendChild( document.importNode( xml.documentElement, true ) );
            // Set main element to document element
            el.main = element;
            // Line Graph
            el.lineGraph    = tl.select( '#line-graph' );
            el.dataPoints   = tl.select( '#data-points' ).selectAll( 'g' );
            el.xAxis        = tl.select( '#x-axis' ).attr('transform', 'translate(0, -10)' ).style( 'opacity', 0 );
            el.yAxis        = tl.select( '#y-axis' ).attr( 'transform', 'translate(-30)' );
            el.shadow       = tl.select( '#back-shadow' ).selectAll('rect').attr( 'width', 0 );
            el.redLine      = tl.select( '#red-line' ).attr( 'width', 0 );

        },

        load: function( element ) {
            
            d3.xml( element.getAttribute( 'data-svg' ), 'image/xvg+xml', function( xml ) {
                
                Utils.pubSub.pub( 'medellin:timeline:timelineload', [element, xml] );
                
            });

            return this;
        },

        on: function( evt, cb ) {
            // Cubscribe to event
            Utils.pubSub.sub( 'medellin:timeline:' + evt, cb );
            return this;
        },
        /**
         * Make sure to proxy the call internally, to MedellinTimeline
         */
        onProxy: function( evt, cb ) {
            // Use jQuery proxy method to proxy, the callback to MedellinTimeline
            this.on( evt, $.proxy( cb, this ) );
            return this;
        },

        init: function( element ) {
            //
            // Bind to the mapload event.
            //
            this.onProxy( 'timelineload', this.initElements )
                .onProxy( 'timelineload', this.buildTimeline ).load( element );

            return this;
        }

    };


})(window, window.App.$, window.App.Utils, window.App.UI.D3 );