<?php if( !defined( 'allowed' ) ) die( 'Direct access is not allowed' );
    
    function nav_active( $path ) {
        $url = parse_url( $path );
        $current = ( $url['path'] === $_SERVER[ 'REQUEST_URI' ] ) ? 'active' : '';
        return $current;
    }

    class Template {

        public $pageTitle = "";
        public $pageDescription = "";
        public $sectionUrl = "";
        public $sectionTitle = "";

        public function __construct( $title = "The Veronica Rudge Green Prize in Urban Design", $desc = "") {
            $this->pageTitle = $title;
            $this->pageDescription = $desc;
        }

        public function header() {
            ob_start();
            $title = $this->pageTitle;
            $description = $this->pageDescription;
            include '__header.php';
            ob_end_flush();
        }

        public function nextSection( $url, $title ) {
            $this->sectionTitle = $title;
            $this->sectionUrl = $url;
        }

        public function footer() {
            ob_start();

            $sectionUrl = $this->sectionUrl;
            $sectionTitle = $this->sectionTitle;

            include '__footer.php';
            ob_end_flush();
        }

    }


