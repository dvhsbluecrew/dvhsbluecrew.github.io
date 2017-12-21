//Get parameters from URL function
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//Startup script
var username = document.getElementById('dropdown02');
var signinlink = document.getElementById('signinlink');
var modaltitle = document.getElementById('modalTitle');
var pagetitle = document.getElementById('title');
var valid = document.getElementById('valid');
var drinkpass = document.getElementById('drinkpass');
var guestpass = document.getElementById('guestpass');

var token = getParameterByName('token');
var tokenfield = document.getElementById('token');
tokenfield.value = token;

//Initial check to see if token is valid
var urlstring = "https://script.google.com/macros/s/AKfycbzxPD0XVTHnUWMctHFjPiEzwnSX2CrFhtOqQux_6mAFT4cmbdsh/exec?token=" + token;

var settings = {
  "async": true,
  "crossDomain": true,
  "url": urlstring,
  "method": "GET"
};

$.ajax(settings).done(function (response) {
  console.log(response);

  if(response.error == 1) {
	modaltitle.innerHTML = 'Invalid token';
  	pagetitle.innerHTML = 'Invalid Login';

  	valid.innerHTML = '<div class="d-inline bg-danger">Invalid login.</div>';
  	drinkpass.innerHTML = 'Please log in again. Note that each account can only be signed into one device at a time.';

  	$("#myModal").modal();
  }
  else {
  	username.innerHTML = response.checkinstaff;
  	signinlink.innerHTML = 'Log Out';

  	if(response.dashboard == 1) {
	  	var $node = null;
        $node = $('<a class="dropdown-item" href="#">Open Dashboard</a>');
        $("#userdropdown").prepend($node);
	}
  }
});

//Form submit
$(function() { //shorthand document.ready function
    $('#searchID').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        formsubmit();
    });
});

function formsubmit() {
	//Get values from form
	var idnumber = document.getElementById('search').value;
	var token = document.getElementById('token').value;

	var urlstring = "https://script.google.com/macros/s/AKfycbzxPD0XVTHnUWMctHFjPiEzwnSX2CrFhtOqQux_6mAFT4cmbdsh/exec?id=" + idnumber + "&token=" + token;

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": urlstring,
	  "method": "GET"
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  modaltitle.innerHTML = response.name + ' (' + response.idnum + ')';
	  pagetitle.innerHTML = response.name + ' (' + response.idnum + ')';

	  if(response.error == 0) {
	  	valid.innerHTML = '<div class="d-inline bg-success">Success! You checked the student in at ' + response.checkintime + '.</div>';

	  	if(response.drinkpass2 == 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass2 + ' drink pass.';
	  	}
	  	else if(response.drinkpass2 > 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass2 + ' drink passes.';
	  	}
	  	if(response.guestpass > 0) {
	  		guestpass.innerHTML = 'Student has a guest: ' + response.guestname + '. Please verify the guest\'s ID.';
	  	}
	  }
	  else if(response.error == 2) {
	  	valid.innerHTML = '<div class="d-inline bg-warning">This student was already checked in by ' + response.checkinstaff + ' at ' + response.checkintime + '.</div>';

	  	if(response.drinkpass2 == 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass2 + ' drink pass.';
	  	}
	  	else if(response.drinkpass2 > 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass2 + ' drink passes.';
	  	}
	  	if(response.guestpass > 0) {
	  		guestpass.innerHTML = 'Student has a guest: ' + response.guestname + '. Please verify the guest\'s ID.';
	  	}
	  }
	  else if(response.error == 3){
	  	valid.innerHTML = '<div class="d-inline bg-danger">We were unable to find a valid ticket with student ID #' + response.idnum + '.</div>';
	  	drinkpass.innerHTML = 'Try scanning the card again. If the problem persists, ask Ivy Wang for help.';
	  }
	  else {
	  	modaltitle.innerHTML = 'Invalid token';
	  	pagetitle.innerHTML = 'Invalid Login';
	  	valid.innerHTML = '<div class="d-inline bg-danger">Invalid login.</div>';
	  	drinkpass.innerHTML = 'Please log in again. Note that each account can only be signed into one device at a time.';
	  	username.innerHTML = 'Not Signed In';
	  	signinlink.innerHTML = 'Sign In';
	  }
	});

	$("#myModal").modal();

	modaltitle.innerHTML = 'Please Wait...';
	pagetitle.innerHTML = 'Please Wait...';
	valid.innerHTML = '';
	drinkpass.innerHTML = '';
	guestpass.innerHTML = '';

	return false;
}
