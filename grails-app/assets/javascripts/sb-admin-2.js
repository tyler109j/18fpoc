/**
 * Created by harjitsingh on 6/22/15.
 */

var FPOC = FPOC || {};

var map
FPOC.INIT = {
    init: function () {
        this.getGeoLocation()
        this.initWindow()
        this.initMap();

    },

    initWindow: function () {

        $(window).bind("load resize", function () {
            topOffset = 50;
            width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse')
                topOffset = 100; // 2-row-menu
            } else {
                $('div.navbar-collapse').removeClass('collapse')
            }

            height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
            if (map !== undefined) {
                map.resize()
            }

        })

    },

    initMap: function () {

        map = new Datamap({
            scope: 'usa',
            responsive: true,
            geographyConfig: {
                highlightOnHover:false
            },
            element: document.getElementById('map'),
            done: function (datamap) {


                FPOC.INIT.handleMapClick(datamap)

            }

        })

        map.labels()

    },


    handleMapClick: function (dataMap) {

        dataMap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
            console.log(geography);

            FPOC.INIT.revertCurrentState()
            FPOC.INIT.setCurrentState(geography.id)
            FPOC.INIT.updateCurrentState()
        });


    },
    getGeoLocation: function () {

        if (navigator.geolocation) {
            console.log("CP", navigator.geolocation.getCurrentPosition(getCoords))
        }

        function getCoords(position) {
            console.log(position)


            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json',
                {latlng: position.coords.latitude + "," + position.coords.longitude}, function (results) {

                    if (results.status === "OK") {
                        address = results.results[0]
                        console.log(address)
                        if (address.address_components.length == 9) {
                            FPOC.INIT.setCurrentState(address.address_components[5].short_name)
                            FPOC.INIT.updateCurrentState()

                        }

                    }


                })
        }
    },
    updateCurrentState: function (e) {
        var colors = d3.scale.category10();
        console.log("CurrentState", FPOC.INIT.getCurrentState())
        data = {}
        data[FPOC.INIT.getCurrentState()] = colors(Math.random() * 100)

        map.updateChoropleth(data)

    },

    revertCurrentState: function () {


        data = {}
        data[FPOC.INIT.getCurrentState()] = '#abdda4'

        map.updateChoropleth(data)

    },

    setCurrentState: function (e) {

        FPOC.STATE = e
    },
    getCurrentState: function () {
        return FPOC.STATE
    }
};


$(function () {

    FPOC.INIT.init()

});