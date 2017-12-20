//Form submit
$(function() { //shorthand document.ready function
    $('#tokensignin').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        tokensignin();
    });
});

function tokensignin() {
	var accesstoken = document.getElementById('accesstoken').value;

	var urlstring = "https://script.google.com/macros/s/AKfycbzxPD0XVTHnUWMctHFjPiEzwnSX2CrFhtOqQux_6mAFT4cmbdsh/exec?&token=" + accesstoken;

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": urlstring,
	  "method": "GET"
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  
	  if(response.error == 1) {
	  	$("#myModal").modal();
	  	document.getElementById("accesstoken").value = "";
	  }
	  else if(response.error == 3){
	  	var redirectlink = "https://dvhsbluecrew.github.io/scanner/scanner.html?token=" + accesstoken;
	  	window.location.replace(redirectlink);
	  }
	});

	return false;
}