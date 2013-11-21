<?php define( 'allowed', true ); require '../__base_template.php'; ?>

<?php 
    $template = new Template( 'Medell&iacute;n - Introduction' ); 
    $template->nextSection( "/medellin/timeline", "Project Timeline" );
?>
<?php $template->header(); ?>
<?php include 'intro.php'; ?>

<?php $template->footer(); ?>