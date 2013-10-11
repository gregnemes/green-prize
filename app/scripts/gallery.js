'use strict';

(function( window, App) {

    App.UI.Gallery = (function( $, Utils, GalleryFrame, BaseModule ) {

        var defaults = {
                
                classNames: {
                    'images' : 'gallery-images',
                    'trigger' : 'gallery-trigger'
                }

            },

            galleryFrameInstance
        ;

        var Gallery = function GalleryModule( element, opts ) {

            this.setOptions( opts, defaults );
            this.initFrame();
            this.initElements( element );
            this.bindEvents();
        
        };

        // Gallery Inherits from BaseModule
        Utils.inherits( Gallery, BaseModule );


        Gallery.prototype.initFrame = function() {

            if( !galleryFrameInstance ) {
                galleryFrameInstance = new GalleryFrame();
            }

            this.galleryFrame = galleryFrameInstance;

        };

        Gallery.prototype.initElements = function( element ) {

            var imageClass = '.' + this._getClass( 'images' ),
                triggerClass = '.' + this._getClass( 'trigger' )
            ;

            this.el = element;
            
            this.$el = $( element );

            this.$images = this.$el.find( imageClass ).remove().find( 'a' );

            // Create the trigger, and append to originating element
            this.$trigger = $( '<a />', { 'href': '#show-gallery', 'class': triggerClass } ).text('Show Gallery');

            this.$el.prepend( this.$trigger );

            // Create the actual gallery element
            this.$gallery = $( '<div />', { 'class': 'fotorama' } );

            // Add the removed images to the gallery wrap
            this.$gallery.append( this.$images );

            // Invoke the fotorama plugin on the gallery wrap
            this.$gallery.fotorama({ nav: 'thumbs', width: '100%', height: '100%' });


            // Append this gallery object to the gallery frame
            // Gallery frame will know to pull $gallery element and append it to the dom
            this.galleryFrame.appendGallery( this );
            
        };

        Gallery.prototype.bindEvents = function() {

            var $trigger    = this.$trigger,
                that        = this
            ;

            $trigger.on( 'click.gallery', function(e){
                
                if( e ) { e.preventDefault(); }

                that.galleryFrame.show( that );

            });

        };

        Gallery.prototype.show = function() {
            // GalleryFrame invoked this.    
            this.$gallery.show();
        };

        Gallery.prototype.hide = function() {
            // Hide the element
            this.$gallery.hide();
        };

        return Gallery;


    })( App.$, App.Utils, App.UI.GalleryFrame, App.UI.BaseModule );

})( window, window.App );


(function( $, Gallery ){

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

