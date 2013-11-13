'use strict';

(function($, Medellin, Map){

    var $medellinMap    = $( '#medellin-map' ),
        $intro          = $medellinMap.find( '.map-intro' ).show()
    ;
    

    function showIntro() {
        $intro.show();
    }

    function startMedellinMap() {

        $intro.addClass( 'intro-active' );

        var map = new Map( $medellinMap.get(0) );

        map.ready(function(e, dMap){
            
            Medellin.init( dMap ).on( 'locations:hidden', showIntro );

        });

    }

    if( $medellinMap.length > 0 ) {
        startMedellinMap();
    }


})(jQuery, window.Medellin, window.App.UI.Map );

;(function($, Porto, Map){

    var $portoMap       = $( '#porto-map' ),
        $intro          = $portoMap.find( '.map-intro' ).show()
    ;
    

    function showIntro() {
        $intro.show();
    }

    function startPortoMap() {

        $intro.addClass( 'intro-active' );

        var map = new Map( $portoMap.get(0) );

        map.ready(function(e, dMap) {
           
            Porto.init( dMap ).on( 'locations:hidden', showIntro )
                .on( 'locations:ready', function() {
                    $portoMap.addClass( 'ready' );
                });
            
            

        });

    }

    if( $portoMap.length > 0 ) {
        startPortoMap();
    }


})(jQuery, window.Porto, window.App.UI.Map );

;(function($){


    $.fn.navPoints = function() {


        this.each(function(){
            
            var navPoint = {

                el: {

                    $el: null,
                    $waypoints: null,
                    $win: $( window )
                
                },

                options: {
                    offset: 100
                },

                events: {
                    
                    updateNavText: function( direction ) {

                        var $this = $( this ),

                            nav = $this.data( 'nav' ),
                            
                            data = nav.data(),
                            
                            $anchor = data.anchor,
                            
                            isInView = direction === 'down',

                            newText = isInView ? data.sectionText : data.sectionDefault,

                            prev = $this.waypoint( 'prev' )
                        ;


                        $anchor.text( newText );

                        navPoint.el.$waypoints.filter( '.active' ).removeClass( 'active' );

                        nav.toggleClass( 'active', isInView );

                        if( prev.length > 0 && !isInView ) {
                            
                            prev.data( 'nav' ).addClass( 'active' );
                        }

                    }

                },

                initElements: function( el ){

                    this.el.$el = $( el );
                    this.el.$waypoints = this.el.$el.find( '.nav-waypoint' );

                },

                bind: function( section ) {

                    section.waypoint( this.events.updateNavText, this.options );

                },

                prepareData: function() {

                    var $waypoints = this.el.$waypoints,
                        that = this
                    ;

                    $waypoints.each(function(){
                        
                        var $this = $( this ),
                            $section = $( $this.data( 'section' ) ),
                            $anchor = $this.parents( '.has-points' ).find( '> a' )
                        ;

                        $section.data( 'nav', $this );
                        $this.data( 'anchor', $anchor );
                        $this.data( 'anchorText', $anchor.text() );

                        that.bind( $section );

                    });

                },

                init: function( el ) {
                    this.initElements( el );
                    this.prepareData();
                }

            };

            navPoint.init( this );
        
        });

        return this;
        

    };


})(jQuery);



$(document).ready(function(){

    var homeMap = document.getElementById( 'home-map' );

    // $(document).scrollsnap({
    //     snaps: '.snap',
    //     proximity: 100
    // });    

    //var s = skrollr.init();
    

    if( homeMap ) {
        homeMap = new window.App.UI.HomeMap( homeMap );
        // Medellin
        homeMap.addDivMarker([6.2483085724565814, -75.56811149999989], { className: 'medellin-icon', html: '<a href="/medellin"><span>Medellin</span></a>', size: [60, 20] } );
        // Porto
        homeMap.addDivMarker([41.240478418280226, -8.331139695340624], { className: 'porto-icon', html: '<a href="/porto"><span>Porto</span></a>', size: [40, 20] } );
    }
    

    $('.gallery').gallery();
    $('#navigation').navPoints();

});


(function(window, $, Utils, d3, undefined ) {

    window.MedellinTimeline = {

        tl: null,

        el: {
            main: null,
            lineGraph: null,
            dataPoints: null,
            xAxis: null,
            yAxis: null,
            
        },

        buildTimeline: function() {

            var el = this.el,
                tl = this.tl,
                segments = [580, 290, 170, 160, 100, 0],
                currPoint = 1
            ;

            function point() {
                el.dataPoints.filter(':nth-child(' + ( currPoint++ ) + ')').transition().style( 'opacity', 1 );
            }

            function line() {
                return el.lineGraph.transition().style( 'stroke-dashoffset',  segments.shift() );
            }

            function start() {
                el.yAxis.transition().attr('transform', 'translate(0)' );
                return el.xAxis.transition().delay( 100 ).duration( 1000 ).attr( 'transform', 'translate(0)' );
            }

            setTimeout(function(){

                tl.classed( 'showgraph', true );
                
                start()
                    .transition()
                        .each(line)
                        .each(point)
                    .transition()
                        .each(line)
                    .transition()
                        .each(point)
                        .each(line)
                        .each(point)
                        .each(line)
                        .each(point)
                    .transition()
                        .each(line)
                        .each(point)
                    .transition()
                        .each(line)
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
            el.lineGraph = tl.select( '#line-graph' );
            el.dataPoints = tl.select( '#data-points' ).selectAll( 'g' );
            el.xAxis = tl.select( '#x-axis' ).attr('transform', 'translate(-780)' );
            el.yAxis = tl.select( '#y-axis' ).attr( 'transform', 'translate(-30)' );

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


$(document).ready(function(){

    var medellinTimeline = document.getElementById( 'medellin-timeline' );

    if( medellinTimeline ) {
        window.MedellinTimeline.init( medellinTimeline );
    }


});



