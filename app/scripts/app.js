'use strict';

(function(window){
    
    var App = window.App = window.App || {};

    /** =jQuery Library */
    App.$ = window.jQuery;

    /** =UI Namespace */
    App.UI = {};

    /** =D3 Library */
    App.UI.D3 = window.d3;

    /** =Fotoram Library */
    App.UI.Fotorama = App.$.Fotorama;

    /** =Utilities */
    App.Utils = (function Utils($) {
            
        var exports = {};

        
        exports.pubSub = {

            o: $({}),

            sub: function() {
                this.o.on.apply( this.o, arguments );
            },

            un: function() {
                this.o.off.apply( this.o, arguments );
            },

            pub: function() {
                this.o.trigger.apply( this.o, arguments );
            }

        };

        exports.inherits = function( _obj, _super ) {
            $.extend( true, _obj.prototype, _super.prototype );
        };

        
        return exports;


    })( App.$ );

})(window);


(function(window, App ){

    App.UI.BaseModule = (function( $ ) {
        
        var BaseModule = function() {};

        BaseModule.prototype.options = null;

        BaseModule.prototype.setOptions = function( opts, defaults ) {

            var options = this.options || $.extend( {}, defaults, opts );
            
            /* classNames requires a deep copy */
            options.classNames = $.extend( {}, options.classNames, opts.classNames || {} );

            this.options = options;

            return this;
        };

        BaseModule.prototype._getClass = function( _id ) {

            return this.options.classNames[ _id ];

        };

        return BaseModule;

    })( App.$ );

})(window, window.App);