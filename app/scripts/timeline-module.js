'use strict';

(function(window, $, App, Utils, undefined ){


    App.UI.Timeline = (function($, Utils, d3){

        var Timeline = function( element ) {
                this._uniqueID = _uniqueID++;
                this.el = element;
                this.onProxy( 'load', this.initElements );
            },
        
            _uniqueID = 0 // Unique Identifier
        ;

        Timeline.prototype.initElements = function( e, xml ) {
            this.tl = d3.select( this.el );
            this.tl.node().appendChild( document.importNode( xml, true ) );
            return this;
        };


        Timeline.prototype.load = function() {

            var that = this;

            d3.xml( this.el.getAttribute( 'data-svg' ), 'image/xvg+xml', function( xml ) {
                that.trigger( that._uniqueID + ':timeline:load', xml.documentElement );
            });

            return this;
        };


        Timeline.prototype.trigger = function() {
            Utils.pubSub.pub.apply( Utils.pubSub, arguments );
            return this;
        };
        
        Timeline.prototype.off = function( evt, cb ) {
            Utils.pubSub.un( this._uniqueID + ':timeline:' + evt, cb );
            return this;
        };
        
        Timeline.prototype.on = function( evt, cb ) {
            Utils.pubSub.sub( this._uniqueID + ':timeline:' + evt, cb );
            return this;
        };

        Timeline.prototype.onProxy = function( evt, cb ) {
            this.on( evt, $.proxy( cb, this ) );
            return this;
        };

        Timeline.prototype.animate = function() {};



        return Timeline;

    })($, Utils, App.UI.D3 );

})(window, window.App.$, window.App, window.App.Utils );