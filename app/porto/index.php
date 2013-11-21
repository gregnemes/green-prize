<?php define( 'allowed', true ); require '../__base_template.php';

$template = new Template( 'Porto - Introduction' );

$template->nextSection( "/porto/timeline", "Timeline" );
$template->header();

include 'intro.php';

$template->footer();