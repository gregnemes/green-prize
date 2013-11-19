<?php if( !defined('allowed') ) die( 'Direct access is not allowed' ); define( 'CACHE_PATH', realpath( dirname( __FILE__ ) . '/cache/' ) );

class Vimeo {

    private static $vimeoUrl = 'http://vimeo.com/api/v2/video/%s.php';
    private static $videoUrl = '//player.vimeo.com/video/%s?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff';
    private static $cache = CACHE_PATH;

    
    function cachePut($id, $video) {
        file_put_contents( self::getFilePath($id), $video );
    }
    
    function getFilePath( $id ) {
        return self::$cache . '/' . $id;
    }

    function getFile( $filename ) {
        
        $file = false;

        try {        
            $file = file_get_contents( $filename );
        } catch( Exception $ex ) {            
            $file = false;
        }

        return $file;
    }

    function cacheGet($id) {

        $filename = self::getFilePath($id);
        $file = file_exists( $filename ) ? self::getFile( $filename ) : false;
        return $file;

    }

    function getDetails($id) {

        $video = self::cacheGet($id);

        if( ! $video ) {
            
            $video = self::getFile( sprintf( self::$vimeoUrl, $id ) );
            
            self::cachePut( $id, $video );
        }

        $video = unserialize($video);

        return $video[0];
    }


    function getThumb( $id, $size='thumbnail_large' ) {

        $video = self::getDetails($id);
        $thumb = '';

        if($video) {
            $thumb = $video[$size] ? $video[$size] : $video[ 'thumbnail_small' ];
        }

        return $thumb;

    }

    function getVideoUrl($id) {
        return sprintf(self::$videoUrl, $id);
    }

    function getIframe( $id, $w=936, $h=526 ) {
        return sprintf( '<iframe src="%1$s" width="%2$d" height="%3$d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>', self::getVideoUrl($id), $w, $h );
    }

}

