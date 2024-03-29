
 $(document).ready(function(){

            $(document).on('keydown', '.regno', function() {
                
                var id = this.id;
                var splitid = id.split('_');
                var index = splitid[1];
                $( '#'+id ).autocomplete({
                    source: function( request, response ) {
                        $.ajax({
                            url: "getcand.php",
                            type: 'post',
                            dataType: "json",
                            data: {
                                search: request.term,request:1
                            },
                            success: function( data ) {
                                response( data );
                            }});
                    },
                    select: function (event, ui) {
                        $(this).val(ui.item.label); // display the selected text
                        var userid = ui.item.value; // selected id to input

                        // AJAX
                        $.ajax({
                            url: 'getcand.php',
                            type: 'post',
                            data: {userid:userid,request:2},
                            dataType: 'json',
                            success:function(response){
                                
                                var len = response.length;
                                 var notif = "Candidate Not Found";
                                if(len > 0){
                                    var id = response[0]['id'];
                                    var fname = response[0]['fname'];
                                    var lname = response[0]['lname'];
                                    var fac = response[0]['fac'];
                                    var deptn = response[0]['dept1'];
                                    var cgpa = response[0]['cgpa'];
                                    var fac2 = response[0]['fac2'];
                                    var deptn2 = response[0]['dept2'];
                                    var gender = response[0]['sex'];

                                    document.getElementById('fname_'+index).value = fname;
                                    document.getElementById('lname_'+index).value = lname;
                                    document.getElementById('fac_'+index).value = fac;
                                    document.getElementById('dept1_'+index).value = deptn;
                                    document.getElementById('cgpa_'+index).value = cgpa;
                                        document.getElementById('fac2_'+index).value = fac2;
                                    document.getElementById('dept2_'+index).value = deptn2;
                                     document.getElementById('sex_'+index).value = gender;
                                    }else{ document.getElementById('alertn_').value = notif; }        } }); return false;
                    }
                });
            });
            
            //getstudentacademic status
            
         /*  $(document).on('keydown', '.matno', function() {
                
                var id = this.id;
                var splitid = id.split('_');
                var index = splitid[1];
                $( '#'+id ).autocomplete({
                    source: function( request, response ) {
                        $.ajax({
                            url: "getarec.php",
                            type: 'post',
                            dataType: "json",
                            data: {
                                search: request.term,request:1
                            },
                            success: function( data ) {
                                response( data );
                            }});
                    },
                    select: function (event, ui) {
                        $(this).val(ui.item.label); // display the selected text
                        var userid = ui.item.value; // selected id to input

                        // AJAX
                        $.ajax({
                            url: 'getarec.php',
                            type: 'post',
                            data: {userid:userid,request:2},
                            dataType: 'json',
                            success:function(response){
                                
                                var len = response.length;
                                 var notif = "Candidate Not Found";
                                if(len > 0){
                                    var id = response[0]['id'];
                                    var fname = response[0]['fname'];
                                    //var lname = response[0]['lname'];
                                    var fac = response[0]['fac'];
                                    var deptn = response[0]['dept1'];
                                    var fac2 = response[0]['fac2'];
                                    var deptn2 = response[0]['dept2'];
                                    var prog = response[0]['prog'];
                                    var progn = response[0]['progn'];
                                    var scgpa = response[0]['scgpa'];
                                    var dog = response[0]['dog'];
                                    var comm = response[0]['comm'];
                                    var sec = response[0]['sec'];
                                    var acs = response[0]['acs'];
                                    var acs2 = response[0]['acs2'];
                                    
                                    
                                    
                                    document.getElementById('fname_'+index).value = fname;
                                    //document.getElementById('lname_'+index).value = lname;
                                    document.getElementById('fac_'+index).value = fac;
                                    document.getElementById('dept1_'+index).value = deptn;
                                        document.getElementById('fac2_'+index).value = fac2;
                                    document.getElementById('dept2_'+index).value = deptn2;
                                     document.getElementById('prog_'+index).value = prog;
                                      document.getElementById('progn_'+index).value = progn;
                                      document.getElementById('scgpa_'+index).value = scgpa;
                                      document.getElementById('dog_'+index).value = dog;
                                      document.getElementById('comm_'+index).value = comm;
                                      document.getElementById('sec_'+index).value = sec;
                                      document.getElementById('acs_'+index).value = acs;
                                      document.getElementById('acs2_'+index).value = acs2;
                                      
                                      
                                      
                                    }else{ document.getElementById('alertn_').value = notif; }        } }); return false;
                    }
                });
            });
            // Add more
          */
        }); 
		
		
$(document).ready(function() {
    var x_timer;    
    $("#f_typea").keyup(function (e){
        clearTimeout(x_timer);
        var user_name = $(this).val();
        x_timer = setTimeout(function(){
            check_username_ajax(user_name);
        }, 1000);
    });

function check_username_ajax(f_typea){
    $("#user-result").html('<img src="../assets/media/loading.gif" />');
    $.post('m_record.php', {'f_typea':f_typea}, function(data) {
      $("#user-result").html(data);
        $("#user-mm2").html(data);
    });
}
});

$(document).ready(function () {
 
window.setTimeout(function() {
    $(".alertm").fadeTo(1000, 0).slideUp(1000, function(){
        $(this).remove(); 
    });
}, 5000);
 
});


$(document).ready(function(){
 
    // Show Input element
    $('.edit').click(function(){
        $('.txtedit').hide();
        $(this).next('.txtedit').show().focus();
        $(this).hide();
    });

    // Save data
    $(".txtedit").on('focusout',function(){
        
        // Get edit id, field name and value
        var id = this.id;
        var split_id = id.split("_");
        var field_name = split_id[0];
        var edit_id = split_id[1];
        var value = $(this).val();
        
        // Hide Input element
        $(this).hide();

        // Hide and Change Text of the container with input elmeent
        $(this).prev('.edit').show();
        $(this).prev('.edit').text(value);

        // Sending AJAX request
        $.ajax({
            url: 'editmode.php',
            type: 'post',
            data: { field:field_name, value:value, id:edit_id },
            success:function(response){
                console.log('Save successfully'); 
            }
        });
    
    });

});
var xmlhttp

function loadDept(str)
{var a=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
//var a=document.getElementById(str)[document.getElementById(str).selectedIndex].innerHTML;
//document.getElementById("select_id").options[document.getElementById("select_id").selectedIndex].value;
if(a=='Select <?php echo $SCategory; ?>'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var d=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
var url="loadDept.php";
url=url+"?loadfac="+d;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
	populate('#time1');
	populate('#time2');
}

function stateChanged()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("dept1").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

function loadCourse(str1,str2)
{var a=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
if(a=='Select Department'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var p=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
//var p2 = str2.value;
var url="loadCourse.php";
url=url+"?loadcos="+p;
url=url+"&sid="+ str2; //Math.random();
xmlhttp.onreadystatechange=stateChanged2;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged2()
{ if (xmlhttp.readyState==4)
  {
  document.getElementById("cosload").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

//load faculty 2
function loadsDep(str)
{var a=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
if(a=='Select <?php echo $SCategory; ?>'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();
setTimeout(function(){if (xmlhttp==null)
  { alert ("Your browser does not support AJAX!");
  return;}

var d=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
var url="loadDept.php";
url=url+"?loadfac="+d;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChangedn;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}}



function stateChangedn()
{ if (xmlhttp.readyState==4){
  document.getElementById("dept_2").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';}}
  
function loadlga(str1)
{var a=document.getElementById(str1)[document.getElementById(str1).selectedIndex].innerHTML;
if(a=='- Select State -'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var d=document.getElementById(str1)[document.getElementById(str1).selectedIndex].innerHTML;
var url="../load_lga.php";
url=url+"?loadfac="+d;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged3;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}
function stateChanged3()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("lga").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

function accountDisplay(str)
{var a=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
if(a=='Select Hostel'){ return;}
else{
var e=document.getElementById('imgHolder');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var d=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
var url="loadRoom.php";
url=url+"?blockid="+d;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged5;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged5()
{
if (xmlhttp.readyState==4)
  {
  
  document.getElementById("account_info").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder');
  f.style.visibility='hidden';
  }
}


function loadroom2(str)
{var a=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
if(a=='Select Hostel'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var d=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
var url="../Student/loadRoom.php";
url=url+"?loadroom="+d;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged4;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged4()
{
if (xmlhttp.readyState==4)
  {
  
  document.getElementById("roomno").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

function loadhamt(str1)
{var a=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
if(a=='Select Room No'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var p=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
var url="../Student/loadhamt.php";
url=url+"?q="+p;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged7;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged7()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("txtamtid").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

//load courses table
function loadd(str)
{var a=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
//var a=document.getElementById(str)[document.getElementById(str).selectedIndex].innerHTML;
//document.getElementById("select_id").options[document.getElementById("select_id").selectedIndex].value;
if(a=='Select Faculty'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var d=document.getElementById(str)[document.getElementById(str).selectedIndex].value;
var url="loadtDept.php";
url=url+"?loadfac="+d;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged6;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged6()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("dept1").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

function loadctable(str1)
{var a=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
if(a=='Select Department'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var p=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
var url="loadcoursetable.php";
url=url+"?loadcos="+p;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged8;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged8()
{
if (xmlhttp.readyState==4)
  {
  document.getElementById("loadn1").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';
  }
}

function loadposition(str1)
{var a=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
if(a=='Select Election'){ return;}
else{
var e=document.getElementById('imgHolder2');
e.style.visibility='visible';
xmlhttp=GetXmlHttpObject();

setTimeout(function(){if (xmlhttp==null)
  {
  alert ("Your browser does not support AJAX!");
  return;
  }

var p=document.getElementById(str1)[document.getElementById(str1).selectedIndex].value;
var url="loadposition.php";
url=url+"?loadp="+p;
url=url+"&sid="+Math.random();
xmlhttp.onreadystatechange=stateChanged9;
xmlhttp.open("GET",url,true);
xmlhttp.send(null);},1000);
}
}

function stateChanged9()
{if (xmlhttp.readyState==4)
  {document.getElementById("position").innerHTML=xmlhttp.responseText;
  var f=document.getElementById('imgHolder2');
  f.style.visibility='hidden';}
}
function GetXmlHttpObject()
{
if (window.XMLHttpRequest)
  {
  // code for IE7+, Firefox, Chrome, Opera, Safari
  return new XMLHttpRequest();
  }
if (window.ActiveXObject)
  {
  // code for IE6, IE5
  return new ActiveXObject("Microsoft.XMLHTTP");
  }
return null;
}

function changeUserStatus(userId, status, dep, sec, cho)
{ 	
	var st = status == 'FALSE' ? 'Approve' : 'Cancel Approval'
	if (confirm('Your About to ' + st+' this Application Make Sure All Information are Correct?')) {
	//window.location.href = 'process.php?action=status&userId=' + userId + '&nst=' + st;
    window.location.href = 'process.php?action=status&userId=' + userId + '&dep=' + dep + '&sec='+ sec +'&cho='+ cho +'&nst=' + st;
	}
}
function changeUserStatus2(userId, status)
{ var st = status == 'FALSE' ? 'Verify' : 'Cancel Verification'
	if (confirm('Your About to ' + st+' this Student Record Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status2&userId=' + userId + '&nst=' + st;}}

function changeUserStatus20(userId, status, dep, sec, lev)
{ var st = status == 'FALSE' ? 'Verify' : 'Cancel'
	if (confirm('Your About to ' + st+' this Student Record Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status20&userId=' + userId + '&dep=' + dep + '&sec='+ sec +'&los='+ lev +'&nst=' + st;}}

	function changeUserAccess(userId, status)
{var st = status == '0' ? 'Enable' : 'Block user'
	if (confirm('Your About to ' + st+' Access, Make Sure you wish to do so ?')) {
	window.location.href = 'process.php?action=status21&userId=' + userId + '&nst=' + st;
	}}
function changeUserStatus3(userId, status)
{var st = status == 'FALSE' ? 'Show' : 'Hide'
	if (confirm('Your About to ' + st+' this Post Make Sure You really what to do so')) {
	window.location.href = 'process.php?action=status3&userId=' + userId + '&nst=' + st;
	}}
	
	function changeUserStatus4(userId, status)
{var st = status == '0' ? 'Approve' : 'Decline'
	if (confirm('Note this process will not be reverted \n Your About to ' + st+' this Student Room Request Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status4&userId=' + userId + '&nst=' + st;
	}}
	
	function changeUserStatus5(userId, status)
{var st = status == 'FALSE' ? 'Show' : 'Hide'
	if (confirm('Your About to ' + st+' this Staff on Our Term Scroller For Site visitors to See, Make Sure you wish to do so ?')) {
	window.location.href = 'process.php?action=status5&id2=' + userId + '&nst=' + st;
	}}
//for staff course approval
function changeUserStatus6(userId,couseid,oid,user,status)
{var st = status == '0' ? 'Approve' : 'Decline'
if(confirm('Your About to ' + st+' this Student Course Registration Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status6&userId=' + userId + '&cos=' + couseid +'&oid=' + oid + '&usr=' + user +'&nst=' + st;}}
	//for staff course approval
function changeUserStatus60(userId,los,deptn,sess,status)
{var st = status == '0' ? 'Approve' : 'Decline'
if (confirm('Your About to ' + st+' this Student Course Registration Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status60&userId=' + userId + '&slos=' + los + '&Schd='+ deptn +'&sec='+ sess +'&nst=' + st; }}
//for candidate  approval
function changeUserStatus7(userId, status)
{var st = status == '0' ? 'Approve' : 'Decline'
	if (confirm('Your About to ' + st+' this Candidate for election Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status7&userId=' + userId + '&nst=' + st;
	}
}
function changePayStatus2(userId, status,sess,dep,dop,dop2)
{var st = status == '0' ? 'Approve' : 'Decline'
	if (confirm('Your About to ' + st+' this Student Payment Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status10&userId=' + userId + '&dep='+ dep +'&ses='+ sess +'&dop='+ dop +'&dop2='+ dop2 +'&nst=' + st;
}}
//for candidate  result
function changeUserStatus8(userId, status)
{var st = status == '0' ? 'Approve' : 'Decline'
	if (confirm('Your About to ' + st+' this Candidate for election Result Publishing make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status8&userId=' + userId + '&nst=' + st;
	}
}
//for election activation
function changeUserStatus9(userId, status)
{var st = status == '1' ? 'Start' : 'Stop'
	if (confirm('Your About to ' + st+' Election Process, Please make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status9&userId=' + userId + '&nst=' + st;
	}
}
//student sign off from dept/course
function changeSignoff(userId, status, dept,staff)
{var st = status == '0' ? 'Signoff' : 'Decline'
	if (confirm('Your About to ' + st+' this Student Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status13&userId=' + userId + '&dep='+ dept + '&stf='+ staff + '&nst=' + st;
}}
//student accept to dept/course
function changeaccept(userId, status, dept,staff)
{var st = status == '0' ? 'Accept' : 'Decline'
	if (confirm('Your About to ' + st+' this Student Make Sure All Information are Correct?')) {
window.location.href = 'process.php?action=status14&userId=' + userId + '&dep='+ dept + '&stf='+ staff + '&nst=' + st;
}}
//enable application edit
function enableappedit(userId, status, dep, sec, cho)
{ 	
	var st = status == '0' ? 'Disable Edit' : 'Enable Edit'
	if (confirm('Your About to ' + st+' of this Application do you wish to Continue?')) {
	//window.location.href = 'process.php?action=status&userId=' + userId + '&nst=' + st;
    window.location.href = 'process.php?action=status15&userId=' + userId + '&dep=' + dep + '&sec='+ sec +'&cho='+ cho +'&nst=' + st;
	}
}
setTimeout(popup, 3000);// Setting time 3s to popup login form
            function popup() {
            $('#myModalat42').modal({
			backdrop: 'static'
		});
	 $('#myModalat42').draggable({
    handle: "#modal-header"
  });  
            } 
  //var timoutWarning = 840000; // Display warning in 14 Mins.
//var timoutNow = 900000; // Timeout in 15 mins.
  var timoutWarning = 840000; // Display warning in 14 Mins.
var timoutNow = 900000; // Timeout in 15 mins.
//var logoutUrl = 'http://domain.com/logout.aspx'; // URL to logout page.
var logoutUrl = 'logout.php'; // URL to logout page.
var warningTimer;
var timeoutTimer;

// Start timers.
function StartTimers() {
    warningTimer = setTimeout("IdleWarning()", timoutWarning);
    timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
}

// Reset timers.
function ResetTimers() {
    clearTimeout(warningTimer);
    clearTimeout(timeoutTimer);
    StartTimers();
    //$("#myModalat4").dialog('close');
     $("#myModalat5").modal('close');
}

// Show idle timeout warning dialog.
function IdleWarning() {
    //$("#timeout").dialog({
        //modal: true
    //});
    $('#myModalat5').modal('show');
}

// Logout the user.
function IdleTimeout() {
    window.location = logoutUrl;
} 

   
     function ShowHideDiv20() {
        var ddlPassport = document.getElementById("dura");
        var dvPassport = document.getElementById("other1");
        dvPassport.style.display = ddlPassport.value == "Others" ? "block" : "none";
    }

function validateFloatKeyPress(el) {
    var v = parseFloat(el.value);
    el.value = (isNaN(v)) ? '' : v.toFixed(2);
}


function populate(selector) {
    var select = $(selector);
    var hours, minutes, ampm;
    //for(var i = 480; i <= 1320; i += 30){
    for(var i = 480; i <= 1200; i += 30){
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10){
            minutes = '0' + minutes; // adding leading zero
        }
        ampm = hours % 24 < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        if (hours === 0){
            hours = 12;
        } 
		
        select.append($('<option></option>')
            .attr('value', hours + ':' + minutes + ' ' + ampm)
            .text(hours + ':' + minutes + ' ' + ampm)
		); 
    }
}
 $('.countn').each(function () {
    $(this).prop('Counter',0.00).animate({
        Counter: $(this).text()
    }, { duration: 4000,
        easing: 'swing',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});
 
 
function ShowHideDiv(chkPenalty){
            var penper = document.getElementById("penper");
            var pdate = document.getElementById("pdate");
            var pdaten = document.getElementById("pdate3");
            penper.style.display = chkPenalty.checked ? "block" : "none";
            pdate.style.display = chkPenalty.checked ? "block" : "none";
            pdaten.style.display = chkPenalty.checked ? "block" : "none"; }
            
    $(document).ready(function(){
    $('#show').click(function() {
      $('.menu').toggle("slide");
    });
});
function ShowHideDiv2(chkPenalty){
            var penper = document.getElementById("penper");
            var pdate = document.getElementById("changestatus");
            penper.style.display = chkPenalty.checked ? "none" : "block";
            pdate.style.display = chkPenalty.checked ? "block" : "none";
            penper.style.width = chkPenalty.checked ? "15%" : "15%";
            
             }
   

function check(e, value) {
      //Check Charater
      var unicode = e.charCode ? e.charCode : e.keyCode;
      if (value.indexOf(".") != -1)
        if (unicode == 46) return false;
      if (unicode != 8)
        if ((unicode < 48 || unicode > 57) && unicode != 46) return false;
    }
    
    function filltablen(str){
	var params = str;
	//console.log(params);
	if(params=="") {
		$('table tbody').empty();
		//console.log("emptied");
		return;
	}
	var request = new XMLHttpRequest();
	request.open("GET","lpermission.php?q="+params,true);
	request.onreadystatechange = function(){
		if(this.readyState==4 && this.status == 200){
			if(this.responseText != null){
				if(this.responseText=="No Data"){
					$('#error').html(this.responseText);
					$('table tbody').empty();
				}else{
					$('#error').html("");
					$('table  tbody').empty();
				    $('table  tbody').append(this.responseText);
                    
                    	$('#table').DataTable({
						destroy: true,
						searching: false,
                        ordering: false,
						data: data
					});
				}
			} //console.log("script didn't return a value");
		}
	}
	request.send();
}

 function getname2(val) {
            $.ajax({
                url: 'gettrans.php',
                type: 'POST',
                data: 'matno='+val,
                dataType: 'json',
                success:function(data){
                    var len = data.length;
                    if(len > 0){
                        var id = data[0]['RegNo'];
                          var fullname = data[0]['fullname'];
                        var name = data[0]['facn'];
                        var gdept = data[0]['dept'];
                        var yoe = data[0]['yoe'];
                        var acad = data[0]['acad'];
                        document.getElementById('fullname').value = fullname;
                        document.getElementById('facn').value = name;
                        document.getElementById('dept').value = gdept;
                        document.getElementById('yoe').value = yoe;
                        document.getElementById('acad').value = acad;     
                    }else{document.getElementById('fullname').value = "";
                        document.getElementById('facn').value = "";
                     document.getElementById('dept').value = "";
                        document.getElementById('yoe').value = "";
                        document.getElementById('acad').value = "";
                    }     //alert(name);
                } 
            });
        }
        
        function getemployee(val) {
            $.ajax({
                url: 'gettrans.php',
                type: 'POST',
                data: 'searchuser='+val,
                dataType: 'json',
                success:function(data){
                    var len = data.length;
                    if(len > 0){
                        var id = data[0]['staff_uid'];
                          var sname = data[0]['s_name'];
                        var fname = data[0]['f_name'];
                        var email = data[0]['s_email'];
                        var phone = data[0]['s_mobile'];
                        var post = data[0]['post'];
                        document.getElementById('staff_uid').value = id;
                        document.getElementById('s_name').value = sname;
                        document.getElementById('f_name').value = fname;
                        document.getElementById('s_email').value = email;
                        document.getElementById('s_mobile').value = phone;
                        document.getElementById('post').value = post;     
                    }else{document.getElementById('staff_uid').value = "";
                        document.getElementById('s_name').value = "";
                        document.getElementById('f_name').value = "";
                     document.getElementById('s_email').value = "";
                        document.getElementById('s_mobile').value = "";
                        document.getElementById('post').value = "";
                    }     //alert(sname);
                } 
            });
        }
        
        // get student Academic status for gragutation
        function getacastatus2(val) {
            $.ajax({
                url: 'gettrans.php',
                type: 'POST',
                data: 'matno1='+val, 
                dataType: 'json',
                success:function(data){
                    var len = data.length;
                    if(len > 0){
                        var id = data[0]['RegNo'];
                                    var fname = data[0]['fname'];
                                   var fac = data[0]['fac'];
                                  var deptn = data[0]['dept1'];
                                    var fac2 = data[0]['fac2'];
                                    var deptn2 = data[0]['dept2'];
                                      var prog = data[0]['prog'];
                                    var progn = data[0]['progn'];
                                    var scgpa = data[0]['scgpa'];
                                    var dog = data[0]['dog'];
                                    var comm = data[0]['comm'];
                                    var sec = data[0]['sec'];
                                    var acs = data[0]['acs'];
                                    var acs2 = data[0]['acs2'];
                                    //document.getElementById('RegNo').value = id;
                                    document.getElementById('fname').value = fname;
                                    
                                    document.getElementById('fac').value = fac;
                                  document.getElementById('dept1').value = deptn;
                                        document.getElementById('fac2').value = fac2;
                                    document.getElementById('dept2').value = deptn2;
                                     
                                       document.getElementById('prog').value = prog;
                                      document.getElementById('progn').value = progn;
                                      document.getElementById('scgpa').value = scgpa;
                                      document.getElementById('dog').value = dog;
                                      document.getElementById('comm').value = comm;
                                      document.getElementById('sec').value = sec;
                                      document.getElementById('acs').value = acs;
                                      document.getElementById('acs2').value = acs2;   
                    }else{
                        document.getElementById('fname').value = "";
                       document.getElementById('fac').value = "";
                                    document.getElementById('dept1').value = "";
                                        document.getElementById('fac2').value = "";
                                    document.getElementById('dept2').value = "";
                                     document.getElementById('prog').value = "";
                                      document.getElementById('progn').value = "";
                                      document.getElementById('scgpa').value = "";
                                      document.getElementById('dog').value = "";
                                      document.getElementById('comm').value = "";
                                      document.getElementById('sec').value = "";
                                      document.getElementById('acs').value = "";
                                      document.getElementById('acs2').value = "";   
                    }   //alert(fname);  
                } 
            });
        }
        //get lecturer / academic staff
        function getlecturer(val) {
            $.ajax({
                url: 'gettrans.php',
                type: 'POST',
                data: 'searchstaff='+val,
                dataType: 'json',
                success:function(data){
                    var len = data.length;
                    if(len > 0){
                        var id = data[0]['staff_uid'];
                          var Sid = data[0]['s_idno'];
                        var fname = data[0]['f_name'];
                        var cos = data[0]['cos'];
                        var heq = data[0]['heq']; 
                        var ccount = data[0]['ccount'];
                         var email = data[0]['email'];
                        var post = data[0]['post'];
                        document.getElementById('staff_uid').value = id;
                        document.getElementById('s_idno').value = Sid;
                        document.getElementById('f_name').value = fname;
                       document.getElementById('cos').value = cos;
                        document.getElementById('heq').value = heq;
                        document.getElementById('ccount').value = ccount;
                        document.getElementById('email').value = email;
                        document.getElementById('post').value = post;     
                    }else{document.getElementById('staff_uid').value = "";
                        document.getElementById('s_idno').value = "";
                        document.getElementById('f_name').value = "";
                        document.getElementById('cos').value = "";
                     document.getElementById('heq').value = "";
                        document.getElementById('ccount').value = "";
                        document.getElementById('email').value = "";
                        document.getElementById('post').value = "";
                    }     //alert(fname);
                } 
            });
        }
        $(document).ready(function() {   
$('#jdesc').change(function(){   
if($('#jdesc').val() === 'Others')   
   {   
   $('#addjob0').show(); 
      $('#addjob').show();    
   }   
else 
   {   
   $('#addjob0').hide(); 
      $('#addjob').hide();      
   }   
});   }); 
function showjobedit(str)
{
    if (str=="")
  { } 
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    { var e=document.getElementById('addjob0');
    e.style.visibility='visible';
    document.getElementById("addjob0").innerHTML=xmlhttp.responseText;
     xmlhttp=GetXmlHttpObject();
    }
  }
xmlhttp.open("GET","loadd_group.php?q="+str,true);
xmlhttp.send();
}  
function showcallot(str)
{
if (str=="")
  {
  //document.getElementById("txtroomno").innerHTML="Amount was Not Loaded Because Form Type was Not Selected";
 // return;
  } 
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();}
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status==200){
    document.getElementById("txtroomno").innerHTML=xmlhttp.responseText;}
  }
xmlhttp.open("GET","loadallot_details.php?q="+str,true);
xmlhttp.send();
}
function showreport(str)
{if (str==""){
  //document.getElementById("txtroomno").innerHTML="Amount was Not Loaded Because Form Type was Not Selected";
 // return;
  } if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();}else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xmlhttp.onreadystatechange=function(){
  if (xmlhttp.readyState==4 && xmlhttp.status==200){
    document.getElementById("txtrbutton").innerHTML=xmlhttp.responseText;}}
xmlhttp.open("GET","loadreport_button.php?q="+str,true);
xmlhttp.send();}



function showDiv(Div) { var x = document.getElementById(Div);
if(x.style.display=="none") { x.style.display = "block"; } else { x.style.display = "none"; } }
 


function ShowHideDiv3(chkPenalty){
            var cat = document.getElementById("cat"); 
            var comp = document.getElementById("comp");
            var txtrbut = document.getElementById("txtrbutton");
            cat.style.display = chkPenalty.checked ? "none" : "block";
            comp.style.display = chkPenalty.checked ? "block" : "none";
            txtrbut.style.display = chkPenalty.checked ? "none" : "block";
            //comp.style.width = chkPenalty.checked ? "15%" : "15%";
             }

 window.onload = function(){zoom(1)}
         function zoom(zm) {
             img=document.getElementById("zoom")
             wid=img.width
             ht=img.height
             img.style.width=(wid*zm)+"px"
             img.style.height=(ht*zm)+"px"
             img.style.marginLeft = -(img.width/2) + "px";
             img.style.marginTop = -(img.height/2) + "px";
         }
         
          //check availiability of Matno
        function checkMat(val) {
            $.ajax({
                url: 'gettrans.php',
                type: 'POST',
                data: 'sregNo='+val,
                dataType: 'json',
                success:function(data){
                    var len = data.length;
                    var sname = document.getElementById('sregNo');
var sname1 = sname.value;
var userID = document.getElementById('pass_word');
userID.value = sname1;
var txtrbut = document.getElementById("mstatus");
                    if(len > 0){
                     var id = data[0]['matid'];
                          var Sid = data[0]['mstatus'];
                      //document.getElementById('mstatus').value = Sid;
                        txtrbut.style.display = "block";
                       }else{
                        //document.getElementById('mstatus').value = "Mat No Avaliable";
                      txtrbut.style.display = "none";
                       
                    }     //alert(fname);
                } 
            });
        }
        
       		       