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
            shadow: null
        },

        buildTimeline: function() {

            var el = this.el,
                tl = this.tl,
                segments = [580, 290, 160, 100, 0],
                currPoint = 1
            ;

            function point() {
                el.dataPoints.filter(':nth-child(' + ( currPoint++ ) + ')').transition().style( 'opacity', 1 );
            }

            function line() {
                return el.lineGraph.transition().style( 'stroke-dashoffset',  segments.shift() );
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
            el.shadow       = tl.select( '#back-shadow' ).attr( 'width', 0 );
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



(function(window, $, App, Utils, undefined ){


    App.UI.Timeline = (function($, Utils, d3){

        var Timeline = function( element ) {
                this._uniqueID = _uniqueID++;
                this.el = element;
                this.onProxy( 'load', this.initElements );
            },
        
            _uniqueID = 0 // Unique Identifier
        ;

        Timeline.prototype.initElements = function( e, xml ) {
            this.tl = d3.select( this.el );
            this.tl.node().appendChild( document.importNode( xml, true ) );
            return this;
        };


        Timeline.prototype.load = function() {

            var that = this;

            d3.xml( this.el.getAttribute( 'data-svg' ), 'image/xvg+xml', function( xml ) {
                that.trigger( that._uniqueID + ':timeline:load', xml.documentElement );
            });

            return this;
        };


        Timeline.prototype.trigger = function() {
            Utils.pubSub.pub.apply( Utils.pubSub, arguments );
            return this;
        };
        
        Timeline.prototype.off = function( evt, cb ) {
            Utils.pubSub.un( this._uniqueID + ':timeline:' + evt, cb );
            return this;
        };
        
        Timeline.prototype.on = function( evt, cb ) {
            Utils.pubSub.sub( this._uniqueID + ':timeline:' + evt, cb );
            return this;
        };

        Timeline.prototype.onProxy = function( evt, cb ) {
            this.on( evt, $.proxy( cb, this ) );
            return this;
        };

        Timeline.prototype.animate = function() {};



        return Timeline;

    })($, Utils, App.UI.D3 );

})(window, window.App.$, window.App, window.App.Utils );


(function(window, $, Utils, d3, Timeline, undefined) {



    window.PortoTimeline = {

        el: {
            element: null,
            $el: null,
            $buttons: null,
            tl2000: null,
            tl2008: null
        },


        trigger: function() {
            Utils.pubSub.pub.apply( Utils.pubSub, arguments );
            return this;
        },

        on: function( evt, cb ) {
            // Cubscribe to event
            Utils.pubSub.sub( 'porto:timeline:' + evt, cb );
            return this;
        },

        /**
         * Make sure to proxy the call internally, to MedellinTimeline
         */
        onProxy: function( evt, cb ) {
            // Use jQuery proxy method to proxy, the callback to MedellinTimeline
            return this.on( evt, $.proxy( cb, this ) );
        },

        events: {

            clickHandler: function( e, button ) {
                
                var el = this.el,
                    $button = el.$buttons.filter ( button ),
                    year = $button.data( 'year' ),
                    show2008 = year === 'show-2008'
                ;

                
                el.$el.toggleClass( 'show-2008', show2008 );

            }


        },


        bind: function() {
            this.onProxy( 'loaded', this.setupElements )
                .onProxy( 'button:clicked', this.events.clickHandler )
            ;
        },

        setupElements: function() {

            var el = this.el,
                $el = el.$el = $( el.element ).addClass( 'timeline-ready' ),
                that = this
            ;
            
            // Create the first button
            el.tl2000.tl.insert( 'a' ).attr( {
                'href': '#',
                'class': 'button timeline-button',
                'data-year': 'show-2008'
            } ).text('1989 - 2000');

            // Create the second button
            el.tl2008.tl.insert( 'a' ).attr( {
                'href': '#',
                'class': 'button timeline-button',
                'data-year': 'show-2000'
            }). text( '2001 - 2008' );

            // Register element click event
            $el.on( 'click', '.timeline-button', function( e ) {
                e.preventDefault();
                that.trigger( 'porto:timeline:button:clicked', this );
            });

            // Get the buttons
            el.$buttons = $el.find( '.timeline-button' );

        },

        loadTimelines: function( element ) {

            var timelines = element.getElementsByClassName( 'timeline' ),
                tOne = timelines.item(0),
                tTwo = timelines.item(1),
                el = this.el
            ;

            el.element = element;
            el.tl2000 = new Timeline( tOne );
            el.tl2008 = new Timeline( tTwo );

            el.tl2008.on( 'load', function(){
                Utils.pubSub.pub( 'porto:timeline:loaded' );
            });

            // First load the 2000 timeline.
            el.tl2000.on( 'load', function() {
                // When that is done loading, load the 2008 timeline.
                el.tl2008.load();
            
            }).load();

            
            return this;

        },

        init: function( element ) {


            // We need to load both timelines
            this.bind();
            this.loadTimelines( element );
            // Then setup each timeline
            // There should be events presented for both timelines.

            return this;

        }

    };

})(window, window.App.$, window.App.Utils, window.App.UI.D3, App.UI.Timeline );


$(document).ready(function(){

    var medellinTimeline = document.getElementById( 'medellin-timeline' );

    if( medellinTimeline ) {
        window.MedellinTimeline.init( medellinTimeline );
    }

    var p = document.getElementById( 'porto-timeline' );

    window.PortoTimeline.init( p );


});



