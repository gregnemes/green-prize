'use strict';

(function(window){
    
    var App = window.App = window.App || {};

    /** =jQuery Library */
    App.$ = window.jQuery;

    /** =UI Namespace */
    App.UI = {};

    /** =D3 Library */
    App.UI.D3 = window.d3;


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

        
        return exports;


    })( App.$ );

    

})(window);