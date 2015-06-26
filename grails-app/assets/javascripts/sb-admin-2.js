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
                map.resize()
            }

        })

    },

    initMap: function () {

        map = new Datamap({
            scope: 'usa',
            responsive: true,
            geographyConfig: {
                highlightOnHover: false,
                borderColor: 'orange'
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

            $('#scopeForm') [0].reset()

            FPOC.INIT.revertCurrentState()
            FPOC.INIT.setCurrentState(geography.id)
            FPOC.INIT.updateCurrentState()
            FPOC.INIT.updateStateControl()


            $(document).trigger('displayDefaultQuery')

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
                        if (address.address_components.length >= 8) {
                            FPOC.INIT.setCurrentState(address.address_components[5].short_name)
                            FPOC.INIT.updateCurrentState()
                            FPOC.INIT.updateStateControl()
                            $(document).trigger('displayDefaultQuery')
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
            spinner = new Spinner().spin(document.getElementById('map'));
            });
            $(document).on("ajaxStop", function (e, xhr, settings, exception) {
                spinner.stop()
            });

    FPOC.INIT.init()






});