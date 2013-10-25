<?php require realpath('../../header.php' ); 

    $pages = array_filter( scandir( './' ), function( $file ){
        return $file !== 'index.php' && $file !== '.' && $file !== '..';
    });

?>
<section id="porto-map" class="cf map-wrap">
    <div class="row">
        <div class="col-6 push-6">
            <div id="interactive-content">
                <div id="location-content" class="push-top-80 location-text">
                    <div class="map-intro" data-location="intro">
                        <article>
                            <header>
                                <h5>Metro do porto</h5>
                            </header>
                            <aside class="porto-aside">In a very short space of time the territory of Oporto Metropolitan Area created the postulations for the construction of a new town-planning order and a new urban landscape. A silent revolution occurred in which time approximately 70kms of network and more than 70 stations were built on five lines.</aside class="porto-aside">

                            <p>In the construction of the Porto Metro architecture assumes a fundamental, predominant role given its capacity to coordinate the complex articulation of an interdisciplinary task, demonstrating in exemplary fashion the need for this performance by architecture as an exercise of proposal and synthesis of all the process to transform the territory, regardless of the scope of the intervention.</p>
                        </article>
                    </div>
                    <?php foreach( $pages as $page ): ?>
                        <div data-location="<?php echo $page; ?>">
                            <article>
                                <?php include $page; ?>
                            </article>
                        </div>
                    <?php endforeach; ?>


                </div>
            </div>
        </div>
        <div class="fixed-map">
            <div class="map" data-svg="/images/porto/map/map-overlay.svg" data-image="/images/porto/map/porto-map-bg.jpg" data-image-width="566" data-image-height="752">
            </div>
        </div>
    </div>
</section>


<?php require realpath( '../../footer.php' ); ?>