<?php define( 'allowed', true ); require '../../__base_template.php';

$exclude = array( 'index.php', '.', '..' );
$pages = array_diff( scandir( './' ), $exclude );
$template = new Template( 'Medell&iacute;n - Interactive Map' );
?>

<?php $template->header(); ?>

<div id="medellin-map" class="section cf map-wrap">
    <div class="row">
        <div class="col-6 push-6">
            <div id="interactive-content">
                <div id="location-content" class="push-top-80 location-text">
                    <div class="map-intro" data-location="intro">
                        <article>
                            <header>
                                <h5>NORTHEASTERN INTEGRAL URBAN PROJECT</h5>
                            </header>
                            <aside class="medellin-aside">This project is on the outskirts of Medellín on the northeastern slope (communes 1 and 2), involving 158 hectares and 230,000 people. It benefits eleven neighborhoods close to the Metrocable Santo Domingo, which has been in operation since 2004.</aside>
                            <p>Running 20 hours a day, 355 days a year, for a total of 7,100 hours a year, Metrocable Line K is not simply a technical achievement—its success is even more a matter of social integration. In 2005 alone, the Metrocable transported 15 million passengers. The project was created to improve mobility for more than 170,000 inhabitants of this remote, underprivileged community. Today these inhabitants can reach the city center in 7 minutes by the Metrocable’s direct connection to the Medellín Metro system. Previously the same trip required a one- or two-hour minibus ride. Line K runs 2 kilometers, connecting passengers to the whole Metro system at Acevedo station, where users can transfer without buying an additional ticket.</p>
                        </article>
                    </div>
                    <?php foreach( $pages as $page ): 
                        $info = pathinfo( $page ); 
                        $name = $info['filename']; 
                    ?>
                    <div data-location="<?php echo $name; ?>">
                        <?php include $page; ?>
                    </div>
                    
                    <?php endforeach; ?>
                </div>

            </div>    
        </div><!-- /div.col-6 -->
        <div class="col-5 pull-6">
            <div class="fixed-map medellin-map light-bg">
                <div class="map" data-svg="/images/medellin/map/medellin-map-overlay.svg" data-image="/images/medellin/map/medellin-map-bg.jpg" data-image-width="566" data-image-height="428">
                </div>
                <div id="interactive-graph" class="graph">
                    <img src="/images/altitude.png" alt="Altitude graph" />
                   <ul class="button-group">
                        <li><a id='andalucia' href="#" class="button" data-area="andalucia">Andalucia</a></li>
                        <li><a id='popular' href="#" class="button" data-area="popular">Popular</a></li>
                        <li><a id='santo-domingo-savio' href="#" class="button" data-area="santo-domingo-savio">Santo Domingo Savio</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<a href="/medellin/credits" title="Next Section: Credits" class='section-link'>Project Credits</a>

<?php $template->footer(); ?>