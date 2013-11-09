'use strict';

(function(window){
    
    var App = window.App = window.App || {};

    /** =jQuery Library */
    App.$ = window.jQuery;

    /** Asign Modernizr */
    App.Mod = window.Modernizr;

    /** =UI Namespace */
    App.UI = {};

    /** =D3 Library */
    App.UI.D3 = window.d3;

    /** =Leaflet Library */
    App.UI.L = window.L;

    /** =Fotoram Library */
    App.UI.Fotorama = App.$.Fotorama;

    /** =Utilities */
    App.Utils = (function Utils($, Mod) {
            
        var exports = {};

        
        exports.pubSub = {

            o: $({}),

            sub: function() {
                this.o.on.apply( this.o, arguments );
                return this;
            },

            un: function() {
                this.o.off.apply( this.o, arguments );
                return this;
            },

            pub: function() {
                this.o.trigger.apply( this.o, arguments );
                return this;
            }

        };

        exports.isSmall = !Mod.mq( 'only screen and (min-width: 480px)' );

        exports.inherits = function( _obj, _super ) {
            $.extend( true, _obj.prototype, _super.prototype );
        };

        
        return exports;


    })( App.$, App.Mod );

})(window);


(function(window, App ){

    App.UI.BaseModule = (function( $ ) {
        
        var BaseModule = function() {};

        BaseModule.prototype.options = null;

        BaseModule.prototype.setOptions = function( opts, defaults ) {
            // Optional opts
            opts = opts || {};

            var options = this.options || $.extend( {}, defaults, opts );
            
            /* classNames requires a deep copy */
            options.classNames = $.extend( {}, options.classNames || {}, opts.classNames || {} );

            this.options = options;

            return this;
        };

        BaseModule.prototype._getClass = function( _id ) {

            return this.options.classNames[ _id ];

        };

        return BaseModule;

    })( App.$ );

})(window, window.App);