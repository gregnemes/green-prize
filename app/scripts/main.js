'use strict';

(function($, Medellin, Map){

    var $mapWrap    = $('#map'),
        $intro      = $mapWrap.find('#map-intro').show()
    ;
    

    function showIntro() {
        $intro.show();
    }

    function startMedellinMap() {

        $mapWrap.waypoint( 'destroy' );
        $intro.addClass( 'intro-active' );

        var map = new Map( 'interactive-map' );

        map.ready(function(e, dMap){
            
            Medellin.init( dMap )
                .on( 'locations:hidden', showIntro )
            ;

        });

    }


    if( $mapWrap.length > 0 ) {
        $mapWrap.waypoint( startMedellinMap, { offset: 100 } );
    }

})(jQuery, window.Medellin, window.App.UI.Map );


$(document).ready(function(){

    $(document).scrollsnap({
        snaps: '.snap',
        proximity: 100

    });

    
    var s = skrollr.init();

});












