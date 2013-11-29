<?php define( 'allowed', true ); require '../__base_template.php';

    $recipients = array_diff( scandir('./past-recipients' ), array( '.', '..' ) );
    arsort($recipients, SORT_ASC);
    $template = new Template('About the Prize');
    $template->nextSection( "/videos/", "Videos" );

$template->header(); ?>

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
                    <dd>Professor of Landscape Architecture, GSD</dd>
                    <dt>Joan Busquets</dt>
                    <dd>Martin Bucksbaum Professor in Practice of Urban Planning and Design, GSD</dd>
                    <dt>Rahul Mehrotra</dt>
                    <dd>Green Prize Jury Chair and Chair of the Department of Urban Planning and Design, GSD</dd>
                    <dt>Gary Hilderbrand</dt>
                    <dd>Adjunct Professor of Landscape Architecture, GSD</dd>
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
                <figure class="about-logos">
                    <a href="http://www.gsd.harvard.edu/" title="Visit: Harvard University Graduate School of Design"><img src="/images/gsd-logo-black.png" width="185" height="45" class='gsd-black-logo' alt="Harvard University Graduate School of Design" /></a>
                    <a href="/" title="Back to: The Veronica Rudge Green Prize in Urban Design"><img src="/images/logo.png" width="153" height="70" class='green-logo' alt="The Veronica Rudge Green Prize in Urban Design" /></a>
                </figure>
            </article>
        </div>
    </div>
</div>
<div id="about-video" class="section dark-back">
    <div class="content-area">
        <div class="col-7">
            <div class="quote-wrap align-opposite">
                &ldquo;Since its inception in 1986, the Veronica Rudge Green Prize in Urban Design has become an important aspect of our School's life. It is in fact one of the few opportunities we have left, institutionally speaking, to pause for a moment and take a good hard look at what's
                <figure class="alignright push-flow-10">
                    <iframe src="//player.vimeo.com/video/78636985?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff" width="538" height="302" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                </figure>
                 going on out there in the world, to take stock of how problems of urban design are being formulated and tackled, and what practices seem to be more successful than others. In a corollary fashion, the prize also allows the School to define itself, especially with respect to those essential values it holds dear.&rdquo;
                <p class="quote-signature">&mdash; Peter G. Rowe, Raymond Garbe Professor of Architecture and Urban Design and Harvard University Distinguished Service Professor</p>
            </div>
        </div>
    </div>
</div>
<div id="about-past-recipients" class="section">
    <div class="content-area">
        <article class="recipient-wrap squeeze-area">
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
<div id="about-site-credits" class="section dark-back light-text">
    <article class="content-area squeeze-area">
        <div class="col-6 push-6">
            <header>
                <h5>Site Credits</h5>
            </header>
            
            <h6>Graduate School of Design</h6>
            <ul>
                <li>Mohsen Mostafavi, Dean, Alexander and Victoria Wiley Professor of Design</li>
                <li>Pat Roberts, Executive Dean</li>
                <li>Rahul Mehrotra, Professor of Urban Design and Planning, Chair of the Department of Urban Planning and Design</li>
                <li>Beth Kramer, Associate Dean for Development</li>
                <li>Benjamin Prosky, Assistant Dean of Communications</li>
            </ul>
            
            <h6>Content Team</h6>
            <ul>
                <li>Dan Borelli, Director of Exhibitions</li>
                <li>Maggie Janik, Multimedia Specialist</li>
                <li>Ronee Saroff, Content Manager</li>
                <li>Melissa Vaughn, Director of Publications</li>
                <li>James Whitten, MAUD '13</li>
                <li>David Zimmerman-Stuart, Exhibitions Coordinator</li>
            </ul>
            
            <h6>Website</h6>
            <ul>
                <li>
                    <a href="http://srainwater.com" title="Sarah Rainwater Design">Sarah Rainwater Design</a>
                </li>            
            </ul>
            
            <h6>Porto</h6>
            <ul>
                <li>Eduardo Souto de Moura</li>
                <li>Adriano Pimenta</li>
                <li>Joana Corr&ecirc;a</li>
                <li>Ant&oacute;nio Queir&oacute;z</li>
            </ul>
            
            <h6>Medell&iacute;n</h6>
            <ul>
                <li>Alcald&iacute;a de Medellin/Medell&iacute;n City Mayor</li>
                <li>Mayor Anibal Gaviria Correa</li>
            </ul>
            
            <ul>
                <li>EDU—Empresa de Desarro Urbno de Medell&iacute;n/Urban Development Enterprise of Medell&iacute;n</li>
                <li>EDU CEO—Margarita Mar&iacute;a Angel Bernal, General Manager</li>
                <li>Leison Roma&ntilde;a, Communication Director</li>
                <li>John Octavio Ortiz, Design Workshop Director</li>
                <li>Juan Andrés Mu&ntilde;oz Airey, New Businesses</li>
                <li>Julian Esteban G&oacute;mez C., Architect</li>
                <li>Oscar Montoya Gonzalez, Architect</li>
                <li>Giovanni Andrés Mar&iacute;n Silva, Architect</li>
                <li>Laura Mesa Tamayo, Publicist</li>
                <li>Collaboration:</li>
                <li>Urbam—Center for Urban and Environmental Studies, EAFIT University</li>
                <li>Alejandro Echeverri Restrepo, Architect</li>
                <li>Natalia Casta&ntilde;o C&aacute;rdenas, Architect</li>
                <li>Gabriel Duque Quintero, Architect</li>
                <li>Simon Abad Lombana, Architecture student</li>
            </ul>
            
            <h6>Photographers</h6>
            <ul>
                <li>Juli&aacute;n Esteban G&oacute;mez C.</li>
                <li>Ricardo Mej&iacute;a</li>
                <li>Courtesy EDU</li>
            </ul>
        </div>
        <figure class="col-6 pull-6 postfix-1">
            <img src="/images/logo-white.png" alt="The Veronica Rudge Green Prize in Urban Design" />
        </figure>
    </article>
</div>
<?php $template->footer(); ?>