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
        this.initClickHandlerForState()
        this.handleSearchSubmission()
        this.defaultQueryForState()


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
                //map.resize()
            }

        })

    },

    initMap: function () {


        var data = [
            {
                "value": 438,
                "code": "nj"
            },
            {
                "value": 387.35,
                "code": "ri"
            },
            {
                "value": 312.68,
                "code": "ma"
            },
            {
                "value": 271.4,
                "code": "ct"
            },
            {
                "value": 209.23,
                "code": "md"
            },
            {
                "value": 195.18,
                "code": "ny"
            },
            {
                "value": 154.87,
                "code": "de"
            },
            {
                "value": 114.43,
                "code": "fl"
            },
            {
                "value": 107.05,
                "code": "oh"
            },
            {
                "value": 105.8,
                "code": "pa"
            },
            {
                "value": 86.27,
                "code": "il"
            },
            {
                "value": 83.85,
                "code": "ca"
            },
            {
                "value": 72.83,
                "code": "hi"
            },
            {
                "value": 69.03,
                "code": "va"
            },
            {
                "value": 67.55,
                "code": "mi"
            },
            {
                "value": 65.46,
                "code": "in"
            },
            {
                "value": 63.8,
                "code": "nc"
            },
            {
                "value": 54.59,
                "code": "ga"
            },
            {
                "value": 53.29,
                "code": "tn"
            },
            {
                "value": 53.2,
                "code": "nh"
            },
            {
                "value": 51.45,
                "code": "sc"
            },
            {
                "value": 39.61,
                "code": "la"
            },
            {
                "value": 39.28,
                "code": "ky"
            },
            {
                "value": 38.13,
                "code": "wi"
            },
            {
                "value": 34.2,
                "code": "wa"
            },
            {
                "value": 33.84,
                "code": "al"
            },
            {
                "value": 31.36,
                "code": "mo"
            },
            {
                "value": 30.75,
                "code": "tx"
            },
            {
                "value": 29,
                "code": "wv"
            },
            {
                "value": 25.41,
                "code": "vt"
            },
            {
                "value": 23.86,
                "code": "mn"
            },
            {
                "value": 23.42,
                "code": "ms"
            },
            {
                "value": 20.22,
                "code": "ia"
            },
            {
                "value": 19.82,
                "code": "ar"
            },
            {
                "value": 19.4,
                "code": "ok"
            },
            {
                "value": 17.43,
                "code": "az"
            },
            {
                "value": 16.01,
                "code": "co"
            },
            {
                "value": 15.95,
                "code": "me"
            },
            {
                "value": 13.76,
                "code": "or"
            },
            {
                "value": 12.69,
                "code": "ks"
            },
            {
                "value": 10.5,
                "code": "ut"
            },
            {
                "value": 8.6,
                "code": "ne"
            },
            {
                "value": 7.03,
                "code": "nv"
            },
            {
                "value": 6.04,
                "code": "id"
            },
            {
                "value": 5.79,
                "code": "nm"
            },
            {
                "value": 3.84,
                "code": "sd"
            },
            {
                "value": 3.59,
                "code": "nd"
            },
            {
                "value": 2.39,
                "code": "mt"
            },
            {
                "value": 1.96,
                "code": "wy"
            },
            {
                "value": 0.42,
                "code": "ak"
            }
        ];


        $.each(data, function (i, v) {
            this.value = this.code
            this.code = this.code.toUpperCase()
        });

        // Initiate the chart
        map = $('#map').highcharts('Map', {
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },

            mapNavigation: {
                enabled: false,
                enableDoubleClickZoomTo: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },


            series: [
                {
                    data: data,
                    mapData: Highcharts.maps['countries/us/us-all'],
                    joinBy: ['postal-code', 'code'],
                    name: 'US Map',
                    cursor: 'pointer',
                    allowPointSelect: true,
                    point: {
                        events: {
                            click: function (e) {
                                console.log('Category: ', e.currentTarget.options);
                                FPOC.INIT.handleMapClick(e.currentTarget.options)
                            }
                        }
                    },
                    states: {
                        select: {
                            color: '#a4edba',
                            borderColor: 'black',
                            dashStyle: 'shortdot'
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            if (this.point.value) {
                                return this.point.code;
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '',
                        pointFormat: '{point.name}'
                    }
                },
                {
                    name: 'Separators',
                    type: 'mapline',
                    data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
                    color: 'white',
                    showInLegend: false,
                    enableMouseTracking: false
                }
            ]
        }).highcharts();


        var utils = {};
        // Could create a utility function to do this
        utils.inArray = function (searchFor, property) {
            var retVal = -1;
            var self = this;
            for (var index = 0; index < self.length; index++) {
                var item = self[index];
                if (item.hasOwnProperty(property)) {
                    if (item[property].toLowerCase() === searchFor.toLowerCase()) {
                        retVal = index;
                        return retVal;
                    }
                }
            }
            ;
            return retVal;
        };


        Array.prototype.inArray = utils.inArray;

        console.log(map.series[0].data)


    },


    handleMapClick: function (dataMap) {

        /*dataMap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
         console.log(geography);

         $('#scopeForm') [0].reset()

         FPOC.INIT.revertCurrentState()
         FPOC.INIT.setCurrentState(geography.id)
         FPOC.INIT.updateCurrentState()
         FPOC.INIT.updateStateControl()


         $(document).trigger('displayDefaultQuery')

         });*/


        $('#scopeForm') [0].reset()

        FPOC.INIT.setCurrentState(dataMap.value.toUpperCase())
        FPOC.INIT.updateCurrentState()
        FPOC.INIT.updateStateControl()


        $(document).trigger('displayDefaultQuery')


    },
    getGeoLocation: function () {

        if (navigator.geolocation) {
            console.log("CP", navigator.geolocation.getCurrentPosition(getCoords, handleErrors))

            function handleErrors(error) {

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert("user did not share geolocation data");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        alert("could not detect current position");
                        break;

                    case error.TIMEOUT:
                        alert("retrieving position timed out");
                        break;

                    default:
                        alert("unknown error");
                        break;
                }

            }
        }

        function getCoords(position) {
            console.log(position)


            $.getJSON('https://maps.googleapis.com/maps/api/geocode/json',
                {latlng: position.coords.latitude + "," + position.coords.longitude}, function (results) {
                    if (results.status === "OK") {
                        address = results.results[0]
                        console.log(address)
                        if (address.address_components.length >= 8) {
                            FPOC.INIT.setCurrentState(address.address_components[5].short_name)
                            FPOC.INIT.updateCurrentState()
                            FPOC.INIT.updateStateControl()
                            $(document).trigger('displayDefaultQuery')

                            index = map.series[0].data.inArray(FPOC.INIT.getCurrentState(), "code")
                            console.log("selectIndex", index)
                            if (index > 0) {
                                map.series[0].data[index].select()
                            }
                        }

                    }


                })
        }
    },
    updateCurrentState: function (e) {
        var colors = d3.scale.category10();
        console.log("CurrentState", FPOC.INIT.getCurrentState())
        data = {}
        data[FPOC.INIT.getCurrentState()] = 'yellow'

        //map.updateChoropleth(data)


    },

    revertCurrentState: function () {


        data = {}
        data[FPOC.INIT.getCurrentState()] = '#abdda4'

        //map.updateChoropleth(data)

    },

    setCurrentState: function (e) {

        FPOC.STATE = e
    },
    getCurrentState: function () {
        return FPOC.STATE
    },
    setCurrentData: function (e) {
        FPOC.DATASET = e
    },
    getCurrentData: function (e) {
        return FPOC.DATASET
    },

    updateStateControl: function (e) {
        $('#state').val(FPOC.STATE)
    },
    initClickHandlerForState: function () {


        $('#state').on('change', function (e) {


            console.log("currentState", $(this).val())
            FPOC.INIT.revertCurrentState()
            FPOC.INIT.setCurrentState($(this).val())
            FPOC.INIT.updateCurrentState()
            $(document).trigger('displayDefaultQuery')


        })

    },

    handleSearchSubmission: function () {

        $('#searchSubmit').on('click', function (e) {


            $.ajax({
                url: "ajaxGetFDAData",
                method: 'post',
                data: $('#scopeForm').serialize()
            }).done(function (data) {

                console.log(data)


                if (data.results === undefined) {

                    FPOC.INIT.createTable()

                    $('#fdaData').DataTable({
                        "columnDefs": [
                            {
                                "targets": [ 3 ],
                                "visible": false
                            }
                        ], language: {
                            "emptyTable": "No data available in table",
                            "search": 'Filter By:'
                        }

                    })

                    return
                }


                index = map.series[0].data.inArray(FPOC.INIT.getCurrentState(), "code")
                console.log("selectIndex", index)
                if (index > 0) {
                    if (map.series[0].data[index].selected === false || map.series[0].data[index].selected === undefined) {
                        map.series[0].data[index].select()
                    }
                }


                FPOC.INIT.createTable()
                tbody = $('#fdaData tbody')
                tbody.empty()


                $.each(data.results, function (index, value) {

                    tr = $('<tr>')
                    $.each(value, function (index, value) {

                        if (index === 'recalling_firm' || index === 'classification' || index == '@id' || index === 'product_description')

                            var column = $('<td>')
                        $(column).text(value)
                        tr.append(column)
                    })
                    tbody.append(tr)


                })


                FPOC.INIT.initTable()


            });

        })

    },

    createTable: function (e) {


        tab = '<table id="fdaData" class="display" cellspacing="0" width="100%"><thead><tr><th class="fdaColor">Product Description</th><th class="fdaColor">Recalling Firm</th>' +
            '<th class="fdaColor">Classification</th><th>Id</th></tr></thead><tbody></tbody></table>'

        $('#tblData').empty().append(tab)
    },
    defaultQueryForState: function (e) {


        $(document).on('displayDefaultQuery', function () {

            var jqxhr = $.ajax({
                url: "ajaxGetFDAData",
                method: 'post',
                data: {state: FPOC.INIT.getCurrentState(), status: 'OnGoing'}
            })
            jqxhr.done(function (data) {

                console.log("data from the call", data)


                index = map.series[0].data.inArray(FPOC.INIT.getCurrentState(), "code")
                console.log("selectIndex", index)
                if (index > 0) {
                    if (map.series[0].data[index].selected === false || map.series[0].data[index].selected === undefined) {
                        map.series[0].data[index].select()
                    }
                }


                if (data.results === undefined) {

                    FPOC.INIT.createTable()

                    $('#fdaData').DataTable({
                        "columnDefs": [
                            {
                                "targets": [ 3 ],
                                "visible": false
                            }
                        ], language: {
                            "emptyTable": "No data available in table",
                            "search": 'Filter By:'
                        }

                    })

                    return
                } else {
                    FPOC.INIT.createTable()
                    tbody = $('#fdaData tbody')
                }


                FPOC.INIT.setCurrentData(data.results)

                $.each(data.results, function (index, value) {

                    tr = $('<tr>')
                    $.each(value, function (index, value) {

                        if (index === 'recalling_firm' || index === 'classification' || index == '@id' || index === 'product_description')

                            var column = $('<td>')
                        $(column).text(value)
                        tr.append(column)
                    })
                    tbody.append(tr)


                })

                FPOC.INIT.initTable()


            })
            jqxhr.fail(function (data) {
                FPOC.INIT.createTable()

                $('#fdaData').DataTable({
                    "columnDefs": [
                        {
                            "targets": [ 3 ],
                            "visible": false
                        }
                    ], language: {
                        "emptyTable": "No data available in table",
                        "search": 'Filter By:'
                    }

                })

                return
            })


        })


    },
    initTable: function (e) {


        $('#fdaData').DataTable({
            "columnDefs": [
                {
                    "targets": [ 3 ],
                    "visible": false
                }
            ], language: {
                "emptyTable": "No data available in table",
                "search": 'Filter By:'
            }

        })

        $('#fdaData tbody').on('click', 'tr', function () {


            var table = $('#fdaData').DataTable();


            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }

            console.log(table.row('.selected').data())

            FPOC.INIT.displayDetails(table.row('.selected').data()[3])
        });
    },
    displayDetails: function (e) {


        data = FPOC.INIT.getCurrentData()

        id = e

        $.each(data, function (index, value) {

            $.each(value, function (index, val) {

                if (index == '@id' && val === e) {
                    FPOC.INIT.displayModal(value)
                    return


                }

            })

        })


    },
    displayModal: function (data) {


        container = $('#gridSystemModal .container-fluid')


        data.formattedDate = moment(data.recall_initiation_date, "YYYYMMDD").format("MM-DD-YYYY")

        template = $('#detailTemplate').html()
        returnString = Mustache.to_html(template, data);
        console.log(returnString)
        container.empty().html(returnString)

        $('#gridSystemModal').modal('show')


    }

};


$(function () {
    var spinner

    $(document).on("ajaxStart", function (e, xhr, settings, exception) {
        spinner = new Spinner().spin(document.getElementById('wrapper'));
    });
    $(document).on("ajaxStop", function (e, xhr, settings, exception) {
        spinner.stop()
    });

    FPOC.INIT.init()


});