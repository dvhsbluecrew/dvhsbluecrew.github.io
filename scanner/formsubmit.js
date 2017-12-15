$(function() { //shorthand document.ready function
    $('#searchid').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        formsubmit()
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    });
});


/*$("#searchid").submit(function () {
	formsubmit()
 	return false;
});
*/
function formsubmit() {
	//Get values from form
	var idnumber = document.getElementById('search').value;
	var token = document.getElementById('token').value;

	var urlstring = "https://script.google.com/macros/s/AKfycbzxPD0XVTHnUWMctHFjPiEzwnSX2CrFhtOqQux_6mAFT4cmbdsh/exec?id=" + idnumber + "&token=" + token;

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": urlstring,
	  "method": "GET",
	  "headers": {
	    "cache-control": "no-cache"
	  }
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  var results = JSON.parse(response);
	});

	return false;
}