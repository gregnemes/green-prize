'use strict';

(function( window, App, undefined ) {


    App.UI.GalleryFrame = (function( $, BaseModule, Utils ){

        var defaults = {

            classNames: {
                'frame' : 'gallery-frame',
                'close' : 'gallery-close',
                'hidden': 'hidden'
            }

        };

        var GalleryFrame = function GalleryFrameModule( element, opts ){

            this.setOptions( opts || {}, defaults );
            this.initElements( element );
            this._bindEvents();

            return this;
        
        };

        // Inherit from Base
        Utils.inherits( GalleryFrame, BaseModule );


        GalleryFrame.prototype.initElements = function( element ) {

            var frameClass = this._getClass( 'frame' ),
                hiddenClass = this._getClass( 'hidden' ),
                closeClass = this._getClass( 'close' )
            ;

            this.galleries  = $([]);
            
            this.scroll     = {
                left: null,
                top: null
            };

            this.el         = element || document.createElement( 'div' );

            this.$el        = this.el ? $( this.el ).addClass( frameClass + ' ' + hiddenClass ) : $( '<div />', { 'class': frameClass + ' ' + hiddenClass } );

            this.$closeBtn  = $( '<a />', { href: '#', 'class': closeClass } ).html( '&times;' );
            
            this.$win       = $( window );

            this.$body      = $( 'body' );
            this.$html      = $( 'html' );
            
            this.$el.append( this.$closeBtn );
            this.$body.append( this.$el );

            return this;

        };

        GalleryFrame.prototype._bindEvents = function() {

            var $closeBtn   = this.$closeBtn,
                that        = this
            ;
            
            $closeBtn.on( 'click.frameClose', function(e){
                    
                if( e ){ e.preventDefault(); }
                
                that.hide();
                
            });

            return this;
        };

        GalleryFrame.prototype.appendGallery = function( gallery ) {
            
            this.galleries.push( gallery );
            this.$el.append( gallery.$gallery );

            return this;
        };


        GalleryFrame.prototype.setScroll = function() {
            
            this.scroll.left    = this.$win.scrollLeft();
            this.scroll.top     = this.$win.scrollTop();

            return this;
        };

        GalleryFrame.prototype.resetScroll = function( left, top ) {
            
            this.$win.scrollLeft( left || this.scroll.left );
            this.$win.scrollTop( top || this.scroll.top );

            return this;
        };

        GalleryFrame.prototype.hide = function() {
            
            this.$html.removeClass( 'fullscreen' );
            this.$body.removeClass( 'fullscreen' );
            this.$el.addClass( this._getClass( 'hidden' ) );
            
            this.resetScroll();

            return this;
        };

        GalleryFrame.prototype.show = function( currentGallery ) {
            
            this.setScroll();
            
            this.$el.removeClass( this._getClass( 'hidden' ) );
            
            this.$body.addClass( 'fullscreen' );
            this.$html.addClass( 'fullscreen' );
            

            this.galleries.each(function( idx, gallery ){
                gallery.hide();
            });

            if( currentGallery ) {
                currentGallery.show();
            }

            this.resetScroll( 0, 0 );

            this.$win.resize();


            return this;
        };


        return GalleryFrame;


    })( App.$, App.UI.BaseModule, App.Utils );


})( window, window.App );


