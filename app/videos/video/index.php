<?php define( 'allowed', true ); require '../../templates/__base_template.php'; require 'vimeo.php'; ?>

<?php
    $id         = $_GET['v'];
    $details    = ( !empty( $id ) ) ? Vimeo::getDetails( $id ) : false;
    $isUser     = ( $details && $details['user_id'] === 6435327 ) ? true : false;
    $videoTitle = $isUser ? $details['title'] : 'Not Found';
?>

<?php get_header( "Video - $videoTitle" ); ?>

<div class='section'>
    <article class='content-area'>
        <?php if( $isUser ): ?>
        <figure>
            <?php echo Vimeo::getIframe( $id ); ?>
            <figcaption>
                <h2><?php echo $videoTitle; ?></h2>
            </figcaption>
        </figure>    
        <?php else: ?>
        <header>
            <h2>Video not found</h2>
        </header>
        <p>We couldn't find the video you are looking for, find more videos on our <a href="http://vimeo.com/harvardgsd/videos">Vimeo</a> page.</p>
        <?php endif; ?>
    </article>
</div>


<?php get_footer(); ?>