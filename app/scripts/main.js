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
            Porto.init( dMap ).on( 'locations:hidden', showIntro );
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

    $(document).scrollsnap({
        snaps: '.snap',
        proximity: 100

    });

    
    //var s = skrollr.init();


    $('.gallery').gallery();


    

    $('#navigation').navPoints();

});














