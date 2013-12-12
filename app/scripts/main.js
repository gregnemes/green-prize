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

(function($, Porto, Map){

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



(function($){



    $.fn.tabs = function() {


        var Tabs = {


            el: {
                $container: null,
                $tabs: null,
                $content: null
            },

            events: {

                tabChange: function( e, el ) {
                    
                    var tab = this.$tabs.filter( el ),
                        content = this.$container.find( '#' + tab.data('tab') )
                    ;
                    
                    if( tab.hasClass( 'current' ) ) {
                        return;
                    }

                    this.$tabs.removeClass( 'current' );
                    this.$content
                            .removeClass('last')
                            .filter('.current')
                                .addClass('last')
                                .removeClass( 'current' );

                    content.addClass( 'current' );
                    tab.addClass( 'current' );
                    
                }

            },

            initElements: function( el ) {

                this.$container = $( el );
                this.$tabs = this.$container.find( 'a[data-tab]' );
                this.$content = this.$container.find( '[data-tab-content]' );
                return this;

            },
            
            bind: function() {

                this.$container
                
                    .on( 'tab:change', $.proxy( this.events.tabChange, this  ) )
                
                    .on( 'click.tab', '[data-tab]', function(e){
                        
                        if( e ) { 
                            e.preventDefault();
                        }

                        $(this).trigger( 'tab:change', this );

                    });

            },

            prepare: function() {

                this.$tabs.first().click();

            },

            init: function( el ) {

                this.initElements( el );
                this.bind();
                this.prepare();
                return this;
            }

        };


        this.each(function(){
            
            var tabs = this._tabs;

            if( !tabs ) {
                tabs = Tabs.init( this );
            }

            this._tabs = tabs;
        });

        return this;


    };

    


})(window.App.$);


$( document ).ready(function(){

    var  homeMap             = document.getElementById( 'home-map' ),
         medellinTimeline    = document.getElementById( 'medellin-timeline' ),
         portoTimeline       = document.getElementById( 'porto-timeline' )
    ;
    
    if( homeMap ) {
        homeMap = new window.App.UI.HomeMap( homeMap );
        // Medellin
        homeMap.addDivMarker([6.2483085724565814, -75.56811149999989], { className: 'medellin-icon', html: '<a href="/medellin"><span>Medellin</span></a>', size: [60, 20] } );
        // Porto
        homeMap.addDivMarker([41.240478418280226, -8.331139695340624], { className: 'porto-icon', html: '<a href="/porto"><span>Porto</span></a>', size: [40, 20] } );
    }

    if( medellinTimeline ) {
        window.MedellinTimeline.init( medellinTimeline );
    }
    if( portoTimeline ) {
        window.PortoTimeline.init( portoTimeline );
    }

    $( '.tabs' ).tabs();

    $( '.gallery' ).gallery();
    $( '#navigation' ).navPoints();
    

    $(document).scrollsnap({
        snaps: '.snap',
        proximity: 100,
        offset: -100 // account for top-bar
    });

    if( !Modernizr.touch ) {
        window.skrollr.init({
            forceHeight: false,
            mobileCheck: function() {
                return false;
            }
        });
    }
    
    window.scrollEnd.init();
    
});



