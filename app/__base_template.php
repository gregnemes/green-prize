<?php if( !defined( 'allowed' ) ) die( 'Direct access is not allowed' );

    function nav_active( $path ) {
        $url = parse_url( $path );
        $current = ( $url['path'] === $_SERVER[ 'REQUEST_URI' ] ) ? 'active' : '';
        return $current;
    }

    function get_header( $pageTitle = "The Veronica Rudge Green Prize in Urban Design" ) {
        ob_start();
        include '__header.php';
        ob_end_flush();
    }

    function get_footer() {
        ob_start();
        include '__footer.php';
        ob_end_flush();
    }

