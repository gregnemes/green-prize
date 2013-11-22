<?php define( 'allowed', true ); require '../../__base_template.php';

$template = new Template( 'Porto - Timeline' );
$template->nextSection( "/porto/map", "Interactive Map" );
$template->header();
?>
<div class='section'>
    <div class="content-area push-bottom-10">
        <section>
            <header>
                <h1 class='page-title'>Porto Metro Timeline : <span id='timeline-year'>1989 &mdash; 2000</span></h1>
            </header>
            <div id='porto-timeline' class='timeline-wrap porto'>
                <div class='timeline __porto-2000' data-svg="/images/porto/timeline/porto-timeline-2000.svg" data-year="1989 &mdash; 2000">                
                </div>
                <div class='timeline __porto-2008' data-svg="/images/porto/timeline/porto-timeline-2008.svg" data-year="2001 &emdash; 2008">               
                </div>
            </div>
        </section>
    </div>
</div>

<?php $template->footer(); ?>