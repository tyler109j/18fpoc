<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Welcome to Grails</title>
</head>

<body>
<div id="wrapper">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand navbar-inverse" href="index.html">18fPOC</a>
        </div>
        <!-- /.navbar-header -->

    </nav>

    <!-- Page Content -->
    <div id="page-wrapper">
        <div class="container-fluid">


            <div class="jumbotron" style="margin-bottom:5px; padding-bottom:5px;padding-top:5px">
                <p><h2>FDA's Food Recall Geolocator.</h2> The purpose of this application is to alert the general public with various food recalls in each state. To view recalls in this application do so by clicking on the map or selecting a state from the drop down menu. As a default your state is automatically selected when you enter the application. If you want to filter your search more, select from the Recall Status drop down. As a default, it is automatically set to display "ongoing" recalls in the selected area.</p>
                            </div>
            <div class="row">
                <div class="col-lg-12">
                </div>
                <!-- /.col-lg-12 -->
            </div>

            <div class="row">
                <div class="col-lg-6">
                    <form class="form-horizontal" role="form" method="POST" id="scopeForm">
                        <div class="row">
                            <div class="col-sm-4" style="margin-top:10px">
                                <div class="input-group"><span class="input-group-addon"
                                                               id="recallStatuslbcl">Recall Status</span>

                                    <select name="status" class="form-control">
                                        <option value="COMP">Completed</option>
                                        <option value="Terminated">Terminated</option>
                                        <option value="Pending">Pending</option>
                                        <option value="OnGoing" selected="true">On-Going</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-4" style="margin-top:10px">
                                <div class="input-group"><span class="input-group-addon" id="basic-addon2">Search</span>

                                    <input type="text" class="form-control" aria-describedby="basic-addon1" id="search"
                                           name="search">
                                </div>
                            </div>

                            <div class="col-sm-3" style="margin-top:10px">
                                <div class="input-group"><span class="input-group-addon" id="basic-addon3">State</span>

                                    <select name="state" class="form-control" id="state">
                                        <option value="NA"></option>
                                        <option value="AL">AL</option>
                                        <option value="AK">AK</option>
                                        <option value="AZ">AZ</option>
                                        <option value="AR">AR</option>
                                        <option value="CA">CA</option>
                                        <option value="CO">CO</option>
                                        <option value="CT">CT</option>
                                        <option value="DE">DE</option>
                                        <option value="DC">DC</option>
                                        <option value="FL">FL</option>
                                        <option value="GA">GA</option>
                                        <option value="HI">HI</option>
                                        <option value="ID">ID</option>
                                        <option value="IL">IL</option>
                                        <option value="IN">IN</option>
                                        <option value="IA">IA</option>
                                        <option value="KS">KS</option>
                                        <option value="KY">KY</option>
                                        <option value="LA">LA</option>
                                        <option value="ME">ME</option>
                                        <option value="MD">MD</option>
                                        <option value="MA">MA</option>
                                        <option value="MI">MI</option>
                                        <option value="MN">MN</option>
                                        <option value="MS">MS</option>
                                        <option value="MO">MO</option>
                                        <option value="MT">MT</option>
                                        <option value="NE">NE</option>
                                        <option value="NV">NV</option>
                                        <option value="NH">NH</option>
                                        <option value="NJ">NJ</option>
                                        <option value="NM">NM</option>
                                        <option value="NY">NY</option>
                                        <option value="NC">NC</option>
                                        <option value="ND">ND</option>
                                        <option value="OH">OH</option>
                                        <option value="OK">OK</option>
                                        <option value="OR">OR</option>
                                        <option value="PA">PA</option>
                                        <option value="RI">RI</option>
                                        <option value="SC">SC</option>
                                        <option value="SD">SD</option>
                                        <option value="TN">TN</option>
                                        <option value="TX">TX</option>
                                        <option value="UT">UT</option>
                                        <option value="VT">VT</option>
                                        <option value="VA">VA</option>
                                        <option value="WA">WA</option>
                                        <option value="WV">WV</option>
                                        <option value="WI">WI</option>
                                        <option value="WY">WY</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-1" style="margin-top:10px">

                                <button type="button" class="btn btn-success" id="searchSubmit">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>

                <div class="col-lg-6"></div>
            </div>

            <div class="row">
                <div class="col-lg-6 col-md-6 " style="position: relative;">
                    <div style=" position:relative;">
                        <div id="map" style="height: 500px;">
                        </div>
                    </div>
                    <div>
                    <h3>Classification</h3>

                        <p><strong>Class I:</strong>Dangerous or defective products that predictably could cause serious health problems or death. Examples include: food found to contain botulinum toxin, food with undeclared allergens, a label mix-up on a lifesaving drug, or a defective artificial heart valve.</p>
                        <p><strong>Class II:</strong>Products that might cause a temporary health problem, or pose only a slight threat of a serious nature. Example: a drug that is under-strength but that is not used to treat life-threatening situations.</p>
                        <p><strong>Class III:</strong>Products that are unlikely to cause any adverse health reaction, but that violate FDA labeling or manufacturing laws. Examples include: a minor container defect and lack of English labeling in a retail food.</p>

                    </div>
                </div>

                <div class="col-lg-6 col-md-6" id="tblData">
                </div>

            </div>


            <!-- /.row -->
        </div>
        <!-- /.container-fluid -->
    </div>
    <!-- /#page-wrapper -->

</div>



<div class="modal fade" role="dialog" aria-labelledby="gridSystemModalLabel" id="gridSystemModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="gridSystemModalLabel">Recall Details</h4>
      </div>
      <div class="modal-body">
        <div class="container-fluid">


        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<script id="detailTemplate" type="x-tmpl-mustache">
    <table>
<tr>
<td><h5>Recall Reason:</h5></td>
<td>{{reason_for_recall}}
</tr>
<tr>
<td><h5>Issue Date:</h5></td>
<td>{{formattedDate}}
</tr>
<tr>
<td><h5>Classification:</h5></td>
<td>{{classification}}
</tr>
<tr>

<td><h5>Recall Number:</h5></td>
<td>{{recall_number}}
</tr>
<tr>
<td><h5>Recalling Firm:<h5></td>
<td>{{recalling_firm}}
</tr>
</table>
</script>
</body>
</html>
