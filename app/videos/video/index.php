<?php require realpath('../../header.php' ); require './vimeo.php'; ?>

<?php
    $id = $_GET['v'];
    $details = ( !empty( $id ) ) ? Vimeo::getDetails( $id ) : false;
?>

<div class='section'>
    <article class='content-area'>
        <?php if( !$details || $details[ 'user_id' ] !== 6435327 ): ?>
            <p>We couldn't find the video you were looking for, please find more videos on <a href="http://vimeo.com/harvardgsd/videos">Vimeo</a></p>
        <?php else: ?>
        <figure>
            <?php echo Vimeo::getIframe( $id ); ?>
            <figcaption>
                <h2><?php echo $details['title']; ?></h2>
            </figcaption>
        </figure>
        <?php endif; ?>
    </article>
</div>


<?php require realpath( '../../footer.php' ); ?>