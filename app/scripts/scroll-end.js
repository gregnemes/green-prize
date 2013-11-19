'use strict';

(function( window, document, $, undefined ) {

    window.scrollEnd = {

        $body: $( 'body' ),
        
        $win: $( window ),

        $doc: $( document ),

        doc: document,

        events: {

            scrolled: function() {
                this.$body.toggleClass( 'bottom', this.__isBottom() );
                return this;
            }

        },

        __isBottom: function() {
            return ( this.doc.documentElement.clientHeight + this.$doc.scrollTop() ) >= this.doc.body.offsetHeight;
        },

        bind: function() {

            var $doc = this.$doc,
                $win = this.$win
            ;
            
            $doc.on( 'scrollend:scrolled', $.proxy( this.events.scrolled, this ) );

            $win.on( 'scroll', function(){
                $doc.trigger( 'scrollend:scrolled' );
            });

            return this;

        },


        init: function() {
            this.bind();
            return this;
        }

    };

})(window, document, window.jQuery);