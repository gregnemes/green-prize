<?php if( !defined('allowed') ) die( 'Direct access not allowed' ); ?>
<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><?php echo $title; ?></title>
        <meta name="description" content="<?php echo $description; ?>">
        <meta name="viewport" content="width=1040">
        <?php include '__header_assets.html'; ?>
    </head>
    <body<?php echo ($class) ? " class='$class'" : ""; ?>>
        <div id="skrollr-body" class="wrap">
            <?php include '__nav.php'; ?>