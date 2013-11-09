'use strict';
(function( window, App, undefined ){

    App.UI.HomeMap = (function( $, L, Utils, BaseModule ) {

        var defaults = {
            
            mbId: 'alettieri.map-t4p7rtsn',

            mb: {
                zoomControl: false,
                zoom: 4,
                trackResize: true,
                center: new L.LatLng(23, -40.0),
                scrollWheelZoom: false,
                dragging: false,
                touchZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                tap: false
            },

            classNames: {
                icon: 'map-icon'
            }

        };

        var HomeMap = function( el, opts ) {
            this.setOptions( opts, defaults );
            this.initElements( el );
        };

        // Inherits from BaseModule
        Utils.inherits( HomeMap, BaseModule );

        /**
         * Initialize elements and mapbox
         * @param {String|Object} el
         * @return HomeMap
         */
        HomeMap.prototype.initElements = function( el ) {
            this.el = el;
            this.map = L.mapbox.map( el, this.options.mbId, this.options.mb );
            this.markers = [];
            return this;
        };

        /**
         * Add Div Marker to map
         * @param {Array} latlon
         * @param {Object|null} customIcon
         * @return HomeMap
         */
        HomeMap.prototype.addMarker = function( latlon, customIcon ) {
            
            var opts = customIcon ? { icon: customIcon } : {};
            
            // Push the marker to the marker collection
            this.markers.push( L.marker( latlon, opts ).addTo( this.map ) );

            return this;
        };

        /**
         * Add Div Marker to map
         * @param {Array} latlon
         * @param {Object} opts
         * @return HomeMap
         */
        HomeMap.prototype.addDivMarker = function( latlon, opts ) {
            
            // Start with default marker options
            var options = { className: this._getClass( 'icon' ) };

            // Check to see if a size array was passed
            if( opts.size ) {
                options.iconSize = new L.Point( opts.size.pop(), opts.size.pop() );
                delete options.size;
            }

            // Check to see if html text was passed
            if( opts.html ) {
                options.html = opts.html;
            }

            // Check to see if a class name should be appended
            if( opts.className ) {
                options.className = [ options.className, opts.className ].join( ' ' );
            }

            // Add the divIcon marker
            this.addMarker( latlon, L.divIcon( options ) );
 
            return this;
        };

        return HomeMap;


    })( App.$, App.UI.L, App.Utils, App.UI.BaseModule );


})( window, window.App );