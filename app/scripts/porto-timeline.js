'use strict';

(function( window, $, Utils, d3, Timeline, undefined) {

    window.PortoTimeline = {

        el: {
            element: null,
            $el: null,
            $button: null,
            $yearLabel: null,
            tl2000: null,
            tl2008: null
        },

        buttonLabel: {
            '2000': '1989 &mdash; 2000',
            '2008': '2001 &mdash; 2008'
        },

        trigger: function() {
            Utils.pubSub.pub.apply( Utils.pubSub, arguments );
            return this;
        },

        on: function( evt, cb ) {
            // Cubscribe to event
            Utils.pubSub.sub( 'porto:timeline:' + evt, cb );
            return this;
        },

        /**
         * Make sure to proxy the call internally, to MedellinTimeline
         */
        onProxy: function( evt, cb ) {
            // Use jQuery proxy method to proxy, the callback to MedellinTimeline
            return this.on( evt, $.proxy( cb, this ) );
        },

        events: {

            clickHandler: function() {
                
                var el = this.el,
                    $button = el.$button,
                    year =  $button.data( 'year' ),
                    label = year === '2000' ? this.buttonLabel['2000'] : this.buttonLabel['2008']
                ;

                $button.html( label ).data( 'year', year === '2008' ? '2000' : '2008' );

                el.$el.toggleClass( 'show-2008' );

            },

            updateYear: function() {
                
                var year = this.el.$button.data( 'year' ),
                    label = this.buttonLabel[year]
                ;
                
                this.el.$yearLabel.html( label );

            }


        },


        bind: function() {
            this.onProxy( 'loaded', this.setupElements )
                .onProxy( 'button:clicked', this.events.clickHandler )
                .onProxy( 'button:clicked', this.events.updateYear )
            ;
        },

        setupElements: function() {

            var el = this.el,

                $el = el.$el = $( el.element ).addClass( 'timeline-ready' ),
                
                // Create the button
                $button = el.$button = $( '<a />', { 'href': '#', 'class': 'button timeline-button'} ).text( '2001 - 2008' ).data('year', '2000' ),
                
                that = this
            ;
            
            el.$yearLabel = $( '#timeline-year' );
            
            // Register element click event
            $el.on( 'click', '.timeline-button', function( e ) {
                e.preventDefault();
                that.trigger( 'porto:timeline:button:clicked', this );
            }).append( $button );
            
           

            
        },

        loadTimelines: function( element ) {

            var timelines = element.getElementsByClassName( 'timeline' ),
                tOne = timelines.item(0),
                tTwo = timelines.item(1),
                el = this.el
            ;

            el.element = element;
            el.tl2000 = new Timeline( tOne );
            el.tl2008 = new Timeline( tTwo );

            el.tl2008.on( 'load', function(){
                Utils.pubSub.pub( 'porto:timeline:loaded' );
            });

            // First load the 2000 timeline.
            el.tl2000.on( 'load', function() {
                // When that is done loading, load the 2008 timeline.
                el.tl2008.load();
            
            }).load();

            
            return this;

        },

        init: function( element ) {


            // We need to load both timelines
            this.bind();
            this.loadTimelines( element );
            // Then setup each timeline
            // There should be events presented for both timelines.

            return this;

        }

    };

})(window, window.App.$, window.App.Utils, window.App.UI.D3, window.App.UI.Timeline );