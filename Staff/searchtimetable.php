<?php 
//$_SESSION['sess']= $_POST['session'];
//$_SESSION['lev']= $_POST['level'];
//$_SESSION['seme']= $_POST['semester'];
?>
<div class="x_panel">
                
             
                <div class="x_content">
	                <form method="get" class="form-horizontal"  action="Time_manage.php?view=l_t" enctype="multipart/form-data">
                    
                      
                      <span class="section">View Lecture Time Table<?php
                                          if($resi == 1)
{


					echo " 
		
			    <center><label class=\"control-label\" for=\"inputEmail\"><font color=\"red\">$res</font></label></center>
			 
			  ";
}
?></span>
<div class="alert alert-info alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">x</span>
                    </button>
          Please Select the appropriate information to view lecture Time table. 
                  </div>
                   <div class="col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                       
						  	  <label for="heard">Department</label>
                            <select name="depart" id="depart"  required="required" class="form-control">
  <option value="">Select Department</option>
<?php  
$resultdepalot = mysqli_query($condb,"select DISTINCT  dept from course_allottb where assigned ='$session_id' and session ='$default_session'  and semester='$default_semester'ORDER BY dept ASC ");
while($rssecallot = mysqli_fetch_array($resultdepalot))
{
echo "<option value='$rssecallot[dept]'>$rssecallot[dept]</option>";	
}
?>
</select>
                      </div>
     <div class="col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
                       
						  	  <label for="heard">Academic Session</label>
                            <select name="session" id="session"  required="required" class="form-control">
  <option value="">Select Session</option>
<?php  
$resultsec = mysqli_query($condb,"SELECT * FROM session_tb where action = '1' ORDER BY session_name ASC");
while($rssec = mysqli_fetch_array($resultsec))
{
echo "<option value='$rssec[session_name]'>$rssec[session_name]</option>";	
}
?>
</select>
                      </div>
                <div class="col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
					  <label for="heard">Level </label>
                      
                          <select name='level' id="level" class="form-control" required>
                      <option value="">Select level</option>
                               <?php 
//include('lib/dbcon.php'); 
//dbcon(); 
$resultsec2 = mysqli_query($condb,"SELECT * FROM level_db  ORDER BY level_order ASC");
while($rssec2 = mysqli_fetch_array($resultsec2))
{
echo "<option value='$rssec2[level_order]'>$rssec2[level_name]</option>";	
}
?>
                           </select> </div>
                      
                      <div class="col-md-3 col-sm-3 col-xs-12 form-group has-feedback">
					  <label for="heard">Semester </label>
                      
                          <select name='semester' id="semester" class="form-control" required>
                            <option value="">Select Semester</option>
                            <option value="First">First</option>
                            <option value="Second">Second</option>
                          
                          </select> </div>
                     
                    
             
                      <div  class="col-md-6 col-sm-6 col-xs-12 form-group has-feedback>
                        <div class="col-md-6 col-md-offset-3">
                         <button type="submit" name="Search"  id="save" data-placement="right" class="btn btn-primary col-md-4" title="Click To View Lecture Time table" ><i class="fa fa-clock"></i> View time table </button>
                        
                        <script type="text/javascript">
	                                            $(document).ready(function(){
	                                            $('#save').tooltip('show');
	                                            $('#save').tooltip('hide');
	                                            });
	                                            </script>
	                                            <div class='imgHolder2' id='imgHolder2'><img src='../admin/uploads/tabLoad.gif'></div>
                        </div>
                        
                      </div>
                    </form>
                  </div>
                  