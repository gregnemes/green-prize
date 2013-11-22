<?php define( 'allowed', true ); require '../../__base_template.php'; ?>

<?php $template = new Template( 'Medell&iacute;n - Timeline' ); ?>
<?php 
$template->nextSection( "/medellin/map", "Interactive Map" );
$template->header(); 
?>
<div id="medellin-timeline-section" class='section'>
    <div class="content-area">
        <section>
            <header>
                <h1 class='page-title'>Medell&iacute;n Metro Timeline 1990 &mdash; 2015</h1>
            </header>
            <div id="medellin-timeline" class='section timeline timeline-medellin' data-svg="/images/medellin/timeline/medellin-timeline.svg" data-width="774.25" data-height="737.706" data-title=""></div>
        </section>
    </div>
    
</div>


<?php $template->footer(); ?>