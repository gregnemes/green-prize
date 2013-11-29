<?php if( !defined('allowed') ) die( 'Direct access not allowed' ); ?>
</div><!-- /div.wrap -->
<footer class='ft<?php echo ($sectionTitle && $sectionUrl) ? " with-link" : "" ?>' role="contentinfo">
    <div class='row'>
        <div class="col-3">
            <a href="#gsdlink" class='gsd-logo'>Harvard University <br />Graduate School of Design</a>
        </div>
        <div class='col-5'>
             <p class='copyright'>Copyright &copy <?php echo date("Y"); ?> The President and Fellows of Harvard College</p>
        </div>
        <div class='col-3'>
        <?php if( $sectionTitle && $sectionUrl ): ?>
            <a href="<?php echo $sectionUrl; ?>" class='section-link'><?php echo $sectionTitle; ?></a>
        <?php endif; ?>
        </div>
    </div>
</footer>

        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <?php include '__footer_assets.html'; ?>
</body>
</html>
