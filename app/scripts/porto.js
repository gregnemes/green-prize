'use strict';
(function(window, $, App, Utils){

    var Porto = window.Porto = {

        id: 'porto',

        dMap: null,

        d3: App.UI.D3,

        el: {
            locations: null,
            tooltip: null,
            locationContent: null
        },

        tips: {
            'estadio-dragao': 'Estad&iacute;o do Dragão',
            'campanha': 'Campanhã',
            'heroismo': 'Heroísmo',
            'campo-agosto': 'Campo 24 Agosto',
            'bolhao': 'Bolhão',
            'hospital-sao-joao': 'I.P.O. - Hospital São João',
            'salgueiros': 'Salgueiros',
            'combatentes': 'Combatentes',
            'marques': 'Marquês',
            'joao-de-deus': 'João de Deus',
            'vila-nova': 'Vila Nova de Gaia',
            'sao-bento': 'São Bento',
            'aliados': 'Aliados',
            'trindade': 'Trindade',
            'casa-musica': 'Casa da Música',
            'matosinhos': 'Matosinhos',
            'aeroporto': 'Aeroporto',
            'araujo': 'Ara&uacute;jo',
            'maia': 'Maia',
            'modivas-sul': 'Modivas Sul',
            'vila-do-conde': 'Vila do Conde'
        },

        events: {
            
            findLocation: function(d, locationIndex) {
                 
                 var el = Porto.el,
                    location = el.locations.select(function( d, idx ){ return idx === locationIndex ? this : null; }),
                    content = el.locationContent.filter( '[data-location="' + location.attr('id') + '"]' )
                ;

                Utils.pubSub.pub( 'location:found', [location, content, locationIndex]);

            },

            hideTip: function(d, idx) {
                Porto.el.tooltip.classed('show', false).style({top:'auto',left:'auto'});
            },

            showTip: function(d, idx) {
                var that        = this,
                    location    = Porto.el.locations.filter(function(){ return this === that; } ),
                    data        = location.datum(),
                    d3          = Porto.d3,
                    mouse       = d3.mouse( that ),
                    id          = location.property('id'),
                    text        = data ? data.text : Porto.tips[id],
                    tooltip     = Porto.el.tooltip.html(text).classed('show',true),
                    height      = data ? data.height : parseInt( tooltip.style('height'), 10) + 10,
                    width       = data ? data.width : parseInt( tooltip.style('width'), 10 ),
                    coords      = {
                        left: parseInt( mouse[0], 10 ) + (width / 2) + 'px',
                        top: parseInt( mouse[1], 10 ) - ( height / 2 ) + 'px'
                    }
                ;

                tooltip.style(coords);

                if( !data ) {
                    location.datum({
                        height: height,
                        width: width,
                        text: text
                    });
                }
                
            },

            bindEvents: function() {

                Porto.el.locations
                    .on( 'click', this.findLocation )
                    .on( 'mouseover', this.showTip )
                    .on( 'mouseout', this.hideTip )
                ;


                Utils.pubSub.sub( 'location:found', Porto.showLocation );

            }

        },

        showLocation: function( e, location, content ) {
            
            var el = Porto.el,
                locationContent = el.locationContent,
                locations = el.locations,
                isActive = location.classed( 'active' ) ? false : true
            ;


            locations.classed('active', false );
            location.classed( 'active', isActive );
            locationContent.hide();
            
            if( !isActive ) {

                Utils.pubSub.pub( 'locations:hidden' );
            
            } else {
                content.fadeIn();
            }

            return this;

        },

        on: function( evt, cb ) {
            
            Utils.pubSub.sub( evt, cb );

            return this;

        },

        initElements: function() {
            
            var el = this.el,
                dMap = this.dMap
            ;


            el.locations = dMap.select( '#locations' ).selectAll( 'circle' );
            el.tooltip = dMap.append( 'div' ).attr( 'class', 'tooltip left smaller' );
            el.locationContent = $( '#location-content' ).find( '[data-location]' );

            return this;
        },

        init: function( dMap ) {
            this.dMap = dMap;
            this.initElements();
            this.events.bindEvents();

            // Set timeout so that events can trigger async
            setTimeout(function(){
                Utils.pubSub.pub( 'locations:ready', this );
            });

            return this;
        }

    };



    




})(window, window.App.$, window.App, window.App.Utils );
