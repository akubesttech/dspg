<?php
/**
 * Created by PhpStorm.
 * User: Habib
 * Date: 7/15/2019
 * Time: 1:36 PM
 */
//include_once "header.php";
?>

<link rel="stylesheet" href="../assets/css/base.css" type="text/css">
<script src="../assets/js/jquery.js"></script>
<style>
main {
        margin-top: 50px;
    }
    .table-no-border{
        vertical-align: bottom;
        border-collapse: collapse;
    }
  /*  #result-table th,#result-table td {
        border: solid;
        /*border:1px solid #434340; 
    } */

  /*  td:first-child, th:first-child {
        border: dotted;
    } */
     #result-table th {
        border: solid;
    }
    #result-table td {
        border: none;
       
    }

    .test h4{
        display: inline-flex;
        height: 16em;
        writing-mode: vertical-rl;
        margin-bottom: 15px;
        margin-top: 8px;
       word-break: keep-all !important;
        font-size: small !important;
        transform: rotate(180deg);
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
        padding-left: 10px;
       
    }
       table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    p {
        text-align: center;
        font-size: large;
    }
    
</style>
 <style type="text/css" media="print"> @media print { a[href]:after {content: none !important;}} @page {size: auto;margin: 0;}
.row1 {background-color: #EFEFEF;border: 1px solid #98C1D1; height: 30px;	font-family:Verdana, Geneva, sans-serif; 
	font-size:12px; }
.row2 {background-color: #DEDEDE; border: 1px solid #98C1D1; height: 30px; font-family:Verdana, Geneva, sans-serif; 
	font-size:12px; }</style>
<?php
include('lib/dbcon.php'); 
dbcon();
$query3 = mysqli_query($condb,"select * from schoolsetuptd ")or die(mysqli_error($condb));$rowdd = mysqli_fetch_array($query3);
$title = $rowdd['SchoolName'];$motto = $rowdd['Motto'];$logoback = $rowdd['Logo'];$exists = imgExists($logoback);
$saddress = $rowdd['Address']; $state = $rowdd['State'];$city = $rowdd['City'];
					if ($exists > 0 ){ $logob =  $rowdd['Logo'];}else{ $logob = "uploads/NO-IMAGE-AVAILABLE.jpg";}
include('session.php');
$bs_dept=$_GET['Schd'];
$bs_sec=$_GET['sec'];
$bs_lev =$_GET['lev'];
$bs_sem =$_GET['sem'];
$sql_gradeset = mysqli_query($condb,"select * from grade_tb where prog ='".safee($condb,$class_ID)."' and grade_group ='01' Order by b_max ASC limit 1 ")or die(mysqli_error($condb)); $getmg = mysqli_fetch_array($sql_gradeset); $getpass = $getmg['b_max'];
$viewcourse1 = mysqli_query(Database::$conn,"SELECT DISTINCT course_code FROM results  WHERE  level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."' Order by course_code ASC ")or die(mysqli_error($condb)); $numofcos = mysqli_num_rows($viewcourse1);

$viewcourseunit = mysqli_query(Database::$conn,"SELECT DISTINCT course_code,c_unit FROM results  WHERE  level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."'  Order by course_code ASC ")or die(mysqli_error($condb)); $all_property = array();

$viewprintco = mysqli_query(Database::$conn,"SELECT DISTINCT student_id FROM  results  WHERE session='".safee($condb,$bs_sec)."' and level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and dept ='".safee($condb,$bs_dept)."' ")or die(mysqli_error($condb));
	 $serial = 1 ;
?>
<center>

<div>
    <div class="container">
    <section id="result-table">

<div class="container-fluid">
<br><br>
    <div class="row">
       <!-- <div class="m-b-3"> --!>
       <div class="col-lg-12">
        <div class="col-lg-1">
            <img class="img-circle" src="<?php echo $logob; ?>" width="100" />
        </div>
        <div class="col-lg-2"></div>
          <div class="col-lg-5">
            <p><strong><font size="4" color="blue"><?php echo $title; ?></font></strong><br />
                <?php echo $motto;//$saddress." .".$city." ".$state." State ."; ?></p>
            <p><strong><?php echo strtoupper($bs_sem); ?> SEMESTER EXAMINATION RESULTS </strong></p>
        </div>
        <div class="col-lg-4">
            <table>
                <thead>
                <tr>
                    <th><?php echo $SCategory; ?>:&nbsp; </th>
                    <th><?php echo getfacultyc($_SESSION['bfac']) ; ?></th>
                    
                </tr>
                <tr>
                    <th><?php echo $SGdept1; ?>:&nbsp; </th>
                    <th><?php echo getdeptc($bs_dept); ?></th>
                    
                </tr>
                <tr>
                    <th>YEAR: </th>
                    <th><?php echo ($bs_sec); ?></th>
                    
                </tr>
                <tr>
                    <th>LEVEL: </th>
                    <th><?php echo getlevel($bs_lev,$class_ID); ?></th>
                    
                </tr>
                </thead>
             <!--   <tbody>
                <tr>
                    <td>SUBJECT_COMB:</td>
                    <td>YEAR:</td>
                </tr>
                  <tr>
                    <td>PART:</td>
                    <td>Three</td>
                </tr>
                 <tr>
                    <td>YEAR:</td>
                    <td>Three</td>
                </tr>
                </tbody> --!>
            </table>
        </div>
        </div>
        </div>
        <hr>
    </div>
            <div class="row">
                <div class="col-lg-12"> <!--width="1040" --!>
                    <table class="table"   >
                   
                        <thead>
                        <tr class="test" >
                            <th colspan="3" style="border:0;"></th>
                            <?php while($get_proc = mysqli_fetch_array($viewcourse1)){ 
  $headersubject = $get_proc['c_unit']; $coursecode = $get_proc['course_code']; $coursetitle = getcourse($get_proc['course_code']);
  array_push($all_property, $get_proc->course_code);
        		//$contents .= '	<td width="5%" class="test"><div>'.$headersubject." ".$coursecode.'</div></td>';
        			?> <th><h4><?php echo $coursecode." : ".$coursetitle; ?></h4></th>
                          <?php }  ?>
                            <th><h4></h4></th>
                            <th><h4>CREDITS REGISTERED</h4></th>
                            <th><h4>CREDITS PASSED</h4></th>
                            <th><h4>CREDIT FAILED</h4></th>
                            <th><h4>TOTAL GRADE POINT</h4></th>
                            <th><h4>GRADE POINT AVERAGE</h4></th>
                            <th><h4>FAILED COURSES</h4></th>
                            <th><h4>REMARK</h4></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="test" style="font-size:4px;" >
                            <td><h3>S/N</h3></td>
                            <td class="table-no-border"><h3>MATRIC. NO.</h3></td>
                            <td class="table-no-border"><h3>NAMES (SURNAME FIRST)</h3></td>
                            <?php while($get_unit = mysqli_fetch_array($viewcourseunit)){ 
  $headerunit = $get_unit['c_unit']; ?>
                            <td><h3><?php echo $headerunit; ?></h3></td>
                            <?php }  ?>
                            <td > </td>
                            <td colspan="7"> </td>
                            
                        </tr>
                      <?php //and course_code = '".safee($condb,$coursecode)."' 
					  while($row = mysqli_fetch_array($viewprintco)){
					  if ($i%2) {$classo = 'row1';} else {$classo = 'row2';}$i += 1;
					   $sregno = $row['student_id']; 
$viewgetotal = mysqli_query(Database::$conn,"SELECT total,course_code,student_id FROM results  WHERE student_id ='".safee($condb,$sregno)."' and level='".safee($condb,$bs_lev)."' and semester = '".safee($condb,$bs_sem)."' and session = '".safee($condb,$bs_sec)."' and dept = '".safee($condb,$bs_dept)."'   Order by course_code ASC ")or die(mysqli_error($condb)); //$numtotal = mysqli_num_rows($viewgetotal);

$viewtregcourese = mysqli_query(Database::$conn,"SELECT SUM(c_unit) as cregu FROM results  WHERE  student_id ='".safee($condb,$sregno)."' and level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."'  Order by course_code ASC ")or die(mysqli_error($condb)); $creditreg = mysqli_fetch_array($viewtregcourese);

$viewtcousepass = mysqli_query(Database::$conn,"SELECT SUM(c_unit) as cregu FROM results  WHERE  student_id ='".safee($condb,$sregno)."' and level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."' and total > '".safee($condb,$getpass)."' Order by course_code ASC ")or die(mysqli_error($condb)); $creditpass = mysqli_fetch_array($viewtcousepass);

$viewtcousefail = mysqli_query(Database::$conn,"SELECT SUM(c_unit) as cregu FROM results  WHERE  student_id ='".safee($condb,$sregno)."' and level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."' and total <= '".safee($condb,$getpass)."' Order by course_code ASC ")or die(mysqli_error($condb)); $creditfail = mysqli_fetch_array($viewtcousefail);

$viewtcousefail2 = mysqli_query(Database::$conn,"SELECT course_code FROM results  WHERE  student_id ='".safee($condb,$sregno)."' and level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."' and total <= '".safee($condb,$getpass)."' Order by course_code ASC ")or die(mysqli_error($condb)); $countfail = mysqli_num_rows($viewtcousefail2);

$viewtcousegrade = mysqli_query(Database::$conn,"SELECT SUM(gpoint * c_unit) as totalgpoint FROM results  WHERE  student_id ='".safee($condb,$sregno)."' and level='".safee($condb,$bs_lev)."' and semester='".safee($condb,$bs_sem)."' and session='".safee($condb,$bs_sec)."' and dept ='".safee($condb,$bs_dept)."'  Order by course_code ASC ")or die(mysqli_error($condb)); $tgpoint = mysqli_fetch_array($viewtcousegrade);
					   ?>
                        <tr class="<?php echo $classo; ?>">
                            <td><?php echo $serial ++ ;?></td>
                            <td><?php echo $sregno; ?></td>
                            <td><?php echo getsname($sregno); ?></td>
                       <?php   $numtotal = mysqli_num_rows($viewgetotal);   $rowdif  = $numofcos - $numtotal;  //while($get_proc2 = mysqli_fetch_assoc($viewcourse2)){ 
 	
                      while($get_subt = mysqli_fetch_assoc($viewgetotal)){ $sg2 = $get_subt['total']; $ccode2 = $get_subt['course_code']; 
$sg = $get_subt['total']." ".grading($get_subt['total'],$class_ID);    
//" ".$numtotal." ".$numofcos." ".$rowdif
?>
                            <?php  //$s = $rowdif;
	//while($s>0){
	//echo	"<td> o </td>";
		//$s-=1;} ?><td> <?php echo $sg; ?></td>
        <?php //echo $cell2; ?>
                           <?php } $s= $rowdif;
	while($s>0){ echo $cell2 = "<td>  </td>"; $s-=1;} ?>
						  
                            <td width="25px;"> </td>
                          
                            <td><?php echo $creditreg['cregu']; ?></td>
                            <td><?php echo $creditpass['cregu']; ?></td>
                            <td><?php echo $creditfail['cregu']; ?></td>
                            <td><?php echo $tgpoint['totalgpoint']; ?></td>
     <?php if($tgpoint['totalgpoint'] > 0){ $gpa = $tgpoint['totalgpoint'] / $creditreg['cregu'];}else{ $gpa = "0"; } ?>
                            <td><?php echo  round($gpa,2); ?></td>
                           <td> <?php while($get_failc = mysqli_fetch_array($viewtcousefail2)){ $coursefailed = $get_failc['course_code']; ?>
                            <?php echo $coursefailed." "; ?><?php }  ?><?php if($countfail < 1 ){ ?><?php echo " - "; } ?></td>
                           <td></td>
                        </tr><?php }  ?>
                        </tbody>
                    </table>
<table > <tr ><br>
				<td colspan="20" class="table-no-border" style="border:0;"> <div id="ccc2"> <button data-placement="right" title="Click to Print " id="reset" name="B2" class="btn btn-info" onClick="myFunction()" type="reset"><i class="icon-file icon-large"></i> Print </button>&nbsp;
<a href="javascript:void(0);" onclick="window.open('Result_am.php?view=rbs','_self')" class="btn btn-info"  id="delete2" data-placement="right" title="Click to Go back" ><i class="fa fa-backward icon-large"></i> Close </a>
				</div></td>
				</tr></table>
                </div>
            </div>
            <hr>
        </div>

    <script>       function myFunction() {document.all.ccc2.style.visibility = 'hidden';
window.print();
    document.all.ccc2.style.visibility = 'visible';}
        $(document).ready(function () { setTimeout(border,50);});
        function border() { $('#result-table td').css('border','solid');}
 </script>
    </section>
    </div>
</main>
</center>