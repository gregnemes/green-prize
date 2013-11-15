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

$( document ).ready(function(){

    var  homeMap             = document.getElementById( 'home-map' ),
         medellinTimeline    = document.getElementById( 'medellin-timeline' ),
         portoTimeline       = document.getElementById( 'porto-timeline' )
    ;
    
    // $(document).scrollsnap({
    //     snaps: '.snap',
    //     proximity: 100
    // });

    

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

    

    $( '.gallery' ).gallery();
    $( '#navigation' ).navPoints();
    
    window.skrollr.init();

});



