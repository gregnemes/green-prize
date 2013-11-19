<?php define( 'allowed', true ); require '../__base_template.php';

    $recipients = array_diff( scandir('./past-recipients' ), array( '.', '..' ) );
    arsort($recipients, SORT_ASC);

?>
<?php get_header( 'About the Prize' ); ?>

<div id="about-intro" class="section more-room">
    <div class="over-dark">
        <aside class="content-area callout light-text push-top-80 push-bottom-80">
            The Veronica Rudge Green Prize in Urban Design is the foremost award recognizing achievement in this field. The award was established in 1986 on the occasion of Harvard University’s 350th anniversary, and the 50th anniversary of the Harvard Graduate School of Design. Nominations for the prize are received from the GSD’s extensive network of academics and urban design professionals.
        </aside>
    </div>
</div>
<div id="about-history" class="section">
    <div class="content-area">
        <div class="col-6 postfix-1 push-top-20 push-bottom-20 divider align-opposite">
            <article>
                <header>
                    <h5>2013 Jury</h5>
                </header>
                <dl class="jury-list">
                    <dt>Anita Berrizebeitia</dt>
                    <dd>Professor of Landscape Architecture</dd>
                    <dt>Joan Busquets</dt>
                    <dd></dd>
                    <dt>Martin Bucksbaum</dt>
                    <dd>Professor in Practice of Urban Planning and Design</dd>
                    <dt>Gary Hilderbrand</dt>
                    <dd>Adjunct Professor of Landscape Architecture</dd>
                    <dt>Michael Sorkin</dt>
                    <dd>Distinguished Professor of Architecture Director of the Graduate Program in Urban Design at the Bernard and Anne Spitzer School of Architecture</dd>
                </dl>
            </article>
        </div>
        <div class="col-6 push-top-20 push-bottom-20 prefix-1">
            <article>
                <header>
                    <h5>The history of the prize</h5>
                </header>
                <p>The prize is awarded biennially to recognize exemplary urban design projects. Projects must be more than one building or an open space built anywhere in the world within the last ten years that makes a positive contribution to the public realm of a city and improves the quality of urban life in that context. The project must also demonstrate a humane and worthwhile direction for the design of urban environments.</p>
            </article>
        </div>
    </div>
</div>
<div id="about-video" class="section dark-back">
    <div class="content-area">
        <div class="col-7">
            <div class="quote-wrap align-opposite">
                &quot;Since its inception in 1986, the Veronica Rudge Green Prize in Urban Design has become an important aspect of our School's life. It is in fact one of the few opportunities we have left, institutionally speaking, to pause for a moment and take a good hard look at what's
                <figure class="alignright push-flow-10">
                    <iframe src="//player.vimeo.com/video/78636985?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="538" height="302" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    <figcaption class="light-caption alignright">
                        The history of the Green Prize, consectetur adipiscing elit. Vestibulum ut blandit eros, eget sagittis augue.
                    </figcaption>
                </figure>
                 going on out there in the world, to take stock of how problems of urban design are being formulated and tackled, and what practices seem to be more successful than others. In a corollary fashion, the prize also allows the School to define itself, especially with respect to those essential values it holds dear.&quot;
                <p class="quote-signature">&mdash; Peter G. Rowe, Raymond Garbe Professor of Architecture and Urban Design and Harvard University Distinguished Service Professor</p>
            </div>
        </div>
    </div>
</div>
<div id="about-past-recipients" class="section">
    <div class="content-area">
        <article class="recipient-wrap">
            <header>
                <h1 class="page-title">Past Recipients</h1>
            </header>
            
                
                <?php 
                    foreach( $recipients as $recipient ): 
                        $file = pathinfo( $recipient );
                        $year = $file['filename'];
                ?>
                    <section class="recipient">
                        <header class="recipient-header">
                            <h1>
                                <time><?php echo $year; ?></time>
                            </h1>
                        </header>
                        <?php include "past-recipients/{$recipient}"; ?>
                    </section>
                    <?php endforeach; ?>
               

        </article>
    </div>
</div>
<?php get_footer(); ?>