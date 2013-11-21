(function( window, App) {
    'use strict';

    App.UI.Gallery = (function( $, Utils, BaseModule ) {

        var defaults = {
                
                classNames: {
                    'images' : 'gallery-images'
                },

                data: {
                    allowfullscreen: true,
                    nav: 'thumbs',
                    width: '100%',
                    fit: 'scaledown',
                    // maxheight: 400,
                    ratio: '800/600',
                    arrows: true,
                    swipe: true,
                    click: true,
                    shadows: false
                }
            }
        ;

        var Gallery = function GalleryModule( element, opts ) {

            this.setOptions( opts, defaults );
            this.initElements( element );
            this.initGallery();
        
        };

        // Gallery Inherits from BaseModule
        Utils.inherits( Gallery, BaseModule );


        Gallery.prototype.initElements = function( element ) {

            this.el = element;
            
            this.$el = $( element );

            this.$images = this.$el.find( '.' + this._getClass( 'images' ) ).remove().find( 'a' );

            // Create the actual gallery element
            this.$gallery = $( '<div />', { 'class': 'fotorama' } );

            // Append the gallery element
            this.$el.append( this.$gallery );

            // Add the removed images to the gallery wrap
            this.$gallery.append( this.$images );

        };

        Gallery.prototype.initGallery = function() {

            // First detect to see if we're dealing with large screens
            // If we are, let's swap out the images for @2x values.
            // They should all be alongside the original images.
            if( !Utils.isSmall ) {
                // Update the href attribute with the 2x value
                this.$images.attr( 'href', function replaceHref(idx, hrefValue){
                    return hrefValue.replace( '.jpg', '@2x.jpg' );
                });
            }

            // Invoke the fotorama plugin on the gallery wrap
            this.$gallery.fotorama( this.options.data );

            this.$el.addClass( 'gallery-initialized' );
        };

        return Gallery;

    })( App.$, App.Utils, App.UI.BaseModule );

})( window, window.App );


(function( $, Gallery ){
    'use strict';

    $.fn.gallery = function(options){

        var initOptions = $.extend({}, $.fn.gallery.defaults, options );

        this.each(function(){

            var gallery = this._gallery;

            if( !gallery ) {
                gallery = new Gallery( this, initOptions );
            }

            this._gallery = gallery;

        });

        return this;
    };

    $.fn.gallery.defaults = {};

    return $.fn.gallery;

})( window.App.$, window.App.UI.Gallery );

