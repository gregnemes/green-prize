<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="stylesheet" href="//api.tiles.mapbox.com/mapbox.js/v1.4.0/mapbox.css">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- build:css /css/main.css -->
        <link rel="stylesheet" href="/css/main.css">
        <!-- endbuild -->
        <!-- build:js /scripts/vendor/modernizr.js -->
        <script src="/bower_components/modernizr/modernizr.js"></script>
        <!-- endbuild -->
    </head>
    <body>
        <?php 

            function nav_active( $path ) {
                $url = parse_url( $path );
                $current = ( $url['path'] === $_SERVER[ 'REQUEST_URI' ] ) ? 'active' : '';
                return $current;
            }
            
        ?>
       
        <div class="wrap">
            <div class="top-bar">
                <a href="/" title="Back to Home">The Veronica Rudge Green Prize in Urban Design</a>
                <nav id="navigation" role="navigation">
                    <ul>
                        <li class="has-points">
                            <a href="/porto" class="<?php echo nav_active( '/porto/' ); ?>">Porto</a>
                            <ul class="sub-nav">
                                <li>
                                    <a href="/porto/" class="nav-waypoint <?php echo nav_active( '/porto/' ); ?>" data-section="#porto-intro" data-section-text="Porto : Introduction" data-section-default="Porto : Introduction">Introduction</a>
                                </li>
                                <li>
                                    <a href="/porto/timeline" class="nav-waypoint <?php echo nav_active( '/porto/timeline/' ); ?>" data-section="#porto-timeline" data-section-text="Porto : Timeline" data-section-default="Porto : Timeline">Timeline</a>
                                </li>
                                <li>
                                    <a href="/porto/map" class="nav-waypoint <?php echo nav_active( '/porto/map/' ); ?>" data-section="#porto-map" data-section-text="Porto : Interactive Map" data-section-default="Porto : Interactive Map">Interactive Map</a>
                                </li>
                                <li>
                                    <a href="/porto/credits" class='nav-waypoint <?php echo nav_active( '/porto/credits/' ); ?>' data-section='#porto-credits' data-section-text="Porto : Credits" data-section-default="Porto : Credits">Project Credits</a>
                                </li>
                            </ul>
                        </li>
                        <li class="has-points">
                            <a href="/medellin" class="<?php echo nav_active( '/medellin/' ); ?>">Medellin</a>
                            <ul class="sub-nav">
                                <li>
                                    <a href="/medellin/#medellin-intro" class="nav-waypoint <?php echo nav_active( '/medellin/' ); ?>" data-section="#medellin-intro" data-section-text="Medellin : Introduction" data-section-default="Medellin : Introduction">Introduction</a>
                                </li>
                                <li>
                                    <a href="/medellin/timeline" class="nav-waypoint <?php echo nav_active( '/medellin/timeline/' ); ?>" data-section="#medellin-timeline-section" data-section-text="Medellin : Timeline" data-section-default="Medellin : Timeline">Timeline</a>
                                </li>
                                <li>
                                    <a href="/medellin/map" class="nav-waypoint <?php echo nav_active( '/medellin/map/' ); ?>" data-section="#medellin-map" data-section-text="Medellin : Interactive Map" data-section-default="Medellin : Interactive Map">Interactive Map</a>
                                </li>
                                <li>
                                    <a href="/medellin/credits" class="nav-waypoint <?php echo nav_active( '/medellin/credits/' ); ?>" data-section="#medellin-credits" data-section-text="Medellin : Credits" data-section-default="Medellin : Credits">Project Credits</a>
                                </li>
                            </ul>
                        </li>
                        <li class="has-points">
                            <a href="/about" class="<?php echo nav_active( '/about/' ); ?>">About the Prize</a>
                            <ul class="sub-nav">
                                <li>
                                    <a href="/about/#about-history" class="nav-waypoint" data-section="#about-intro" data-section-text="About : Introduction" data-section-default="About : Introduction">About</a>
                                </li>
                                <li>
                                    <a href="/about/#about-past-recipients" class="nav-waypoint" data-section="#about-past-recipients" data-section-text="About : Past Recipients" data-section-default="About : Introduction">Past Recipients</a>
                                </li>
                            </ul>
                        </li>
                        <li><a href="/videos">Video</a></li>
                    </ul>
                </nav>
            </div>