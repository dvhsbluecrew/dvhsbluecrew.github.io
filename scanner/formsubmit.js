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

	  	if(response.drinkpass = 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass + ' drink pass.';
	  	}
	  	else if(response.drinkpass > 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass + ' drink passes.';
	  	}
	  	if(response.guestpass > 0) {
	  		guestpass.innerHTML = 'Student has a guest: ' + response.guestname + '. Please verify the guest\'s ID.';
	  	}
	  }
	  else if(response.error == 2) {
	  	valid.innerHTML = '<div class="d-inline bg-warning">This student was already checked in by ' + response.checkinstaff + ' at ' + response.checkintime + '.</div>';

	  	if(response.drinkpass = 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass + ' drink pass.';
	  	}
	  	else if(response.drinkpass > 1) {
	  		drinkpass.innerHTML = 'Student has ' + response.drinkpass + ' drink passes.';
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
	  	valid.innerHTML = '<div class="d-inline bg-danger">The authentication token you provided was invalid.</div>';
	  	drinkpass.innerHTML = 'Try logging out and logging in again. Note that each account can only be signed into one device at a time.';
	  }
	});

	$("#myModal").modal();

	var modaltitle = document.getElementById('modalTitle');
	var pagetitle = document.getElementById('title');
	var valid = document.getElementById('valid');
	var drinkpass = document.getElementById('drinkpass');
	var guestpass = document.getElementById('guestpass');

	modaltitle.innerHTML = 'Please Wait...';
	pagetitle.innerHTML = 'Please Wait...';
	valid.innerHTML = '';
	drinkpass.innerHTML = '';
	guestpass.innerHTML = '';

	return false;
}