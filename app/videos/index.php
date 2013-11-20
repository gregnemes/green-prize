<?php define( 'allowed', true ); require '../__base_template.php'; require 'video/vimeo.php'; ?>

<?php 
    
    function get_thumb($id) {
        return Vimeo::getThumb($id);
    }
    $template = new Template( 'Videos' );

?>

<?php $template->header(); ?>

<div class="section breath-top-40">
    <div class="content-area">
        <section class='snap'>
            <header>
                <h2 class="page-title sectioned">Urban Conditions</h2>
            </header>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78083007"><img src="<?php echo get_thumb('78083007'); ?>" alt="Urban Conditions - Joan Busquets" /></a>
                    <figcaption>
                        <h5>Joan Busquets</h5>
                    </figcaption>
                </figure>
                <figure class='col-5 push-2'>
                    <a href="video?v=78082448"><img src="<?php echo get_thumb('78082448'); ?>" alt="Urban Conditions - Michael Sorkin" /></a>
                    <figcaption>
                        <h5>Michael Sorkin</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78075092"><img src="<?php echo get_thumb('78075092'); ?>" alt="Urban Conditions - Gary Hilderbrand" /></a>
                    <figcaption>
                        <h5>Gary Hilderbrand</h5>
                    </figcaption>
                </figure>
                <figure class='col-5 push-2'>
                    <a href="video?v=78075090"><img src="<?php echo get_thumb('78075090'); ?>" alt="Urban Conditions - Anita Berrizbeitia" /></a>
                    <figcaption>
                        <h5>Anita Berrizbeitia</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78075089"><img src="<?php echo get_thumb('78075089'); ?>" alt="Urban Conditions - Rahul Mehrotra" /></a>
                    <figcaption>
                        <h5>Rahul Mehrotra</h5>
                    </figcaption>
                </figure>
            </div>
        </section>
        <section class='snap breath-top-40'>
            <header>
                <h2 class="page-title sectioned">Physical Mobility</h2>
            </header>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78640577"><img src="<?php echo get_thumb('78640577'); ?>" alt="Physical Mobility - Michael Sorkin" /></a>
                    <figcaption>
                        <h5>Michael Sorkin</h5>
                    </figcaption>
                </figure>
                <figure class="col-5 push-2">
                    <a href="video?v=78636984"><img src="<?php echo get_thumb('78636984'); ?>" alt="Physical Mobility - Anita Berrizbeitia" /></a>
                    <figcaption>
                        <h5>Anita Berrizbeitia</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78110268"><img src="<?php echo get_thumb('78110268'); ?>" alt="Physical Mobility - Rahul Mehrotra" /></a>
                    <figcaption>
                        <h5>Rahul Mehrotra</h5>
                    </figcaption>
                </figure>
                <figure class="col-5 push-2">
                    <a href="video?v=78108140"><img src="<?php echo get_thumb('78108140'); ?>" alt="Physical Mobility - Joan Busquets" /></a>
                    <figcaption>
                        <h5>Joan Busquets</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78108015"><img src="<?php echo get_thumb('78108015'); ?>" alt="Physical Mobility - Gary Hilderbrand" /></a>
                    <figcaption>
                        <h5>Gary Hilderbrand</h5>
                    </figcaption>
                </figure>
            </div>
        </section>
        <section class='snap breath-top-40'>
            <header>
                <h2 class="page-title sectioned">Social Mobility</h2>
            </header>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78095545"><img src="<?php echo get_thumb('78095545'); ?>" alt="Social Mobility - Gary Hilderbrand" /></a>
                    <figcaption>
                        <h5>Gary Hilderbrand</h5>
                    </figcaption>
                </figure>
                <figure class="col-5 push-2">
                    <a href="video?v=78087507"><img src="<?php echo get_thumb('78087507'); ?>" alt="Social Mobility - Joan Busquets" /></a>
                    <figcaption>
                        <h5>Joan Busquets</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78087501"><img src="<?php echo get_thumb('78087501'); ?>" alt="Social Mobility - Rahul Mehrotra" /></a>
                    <figcaption>
                        <h5>Rahul Mehrotra</h5>
                    </figcaption>
                </figure>
                <figure class="col-5 push-2">
                    <a href="video?v=78087500"><img src="<?php echo get_thumb('78087500'); ?>" alt="Social Mobility - Michael Sorkin" /></a>
                    <figcaption>
                        <h5>Michael Sorkin</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78087498"><img src="<?php echo get_thumb('78087498'); ?>" alt="Social Mobility - Anita Berrizbeitia" /></a>
                    <figcaption>
                        <h5>Anita Berrizbeitia</h5>
                    </figcaption>
                </figure>
            </div>
        </section>
        <section class='snap breath-top-40'>
            <header>
                <h2 class="page-title sectioned">Futures</h2>
            </header>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78636986"><img src="<?php echo get_thumb('78636986'); ?>" alt="Futures - Gary Hilderbrand" /></a>
                    <figcaption>
                        <h5>Gary Hilderbrand</h5>
                    </figcaption>
                </figure>
                <figure class="col-5 push-2">
                    <a href="video?v=78101831"><img src="<?php echo get_thumb('78101831'); ?>" alt="Futures - Joan Busquets" /></a>
                    <figcaption>
                        <h5>Joan Busquets</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78101562"><img src="<?php echo get_thumb('78101562'); ?>" alt="Futures - Rahul Mehrotra" /></a>
                    <figcaption>
                        <h5>Rahul Mehrotra</h5>
                    </figcaption>
                </figure>
                <figure class="col-5 push-2">
                    <a href="video?v=78101559"><img src="<?php echo get_thumb('78101559'); ?>" alt="Futures - Michael Sorkin" /></a>
                    <figcaption>
                        <h5>Michael Sorkin</h5>
                    </figcaption>
                </figure>
            </div>
            <div class="row breath-top-40">
                <figure class="col-5">
                    <a href="video?v=78101555"><img src="<?php echo get_thumb('78101555'); ?>" alt="Futures - Anita Berrizbeitia" /></a>
                    <figcaption>
                        <h5>Anita Berrizbeitia</h5>
                    </figcaption>
                </figure>
            </div>
        </section>
    </div>
</div>

<?php $template->footer(); ?>