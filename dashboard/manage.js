//Initial Token Check
var token = getParameterByName('token');

var urlstring = "https://script.google.com/macros/s/AKfycbz1rWpe0rP-Dmr9FQUI3OPTsoBbICmAyjAWR40HEW7TplU-nSSt/exec?token=" + token + "&content=1";

var settings = {
  "async": true,
  "crossDomain": true,
  "url": urlstring,
  "method": "GET"
};

$.ajax(settings).done(function (response) {
  if(response.error == 0) {
    editlinks(token, response.username);
    gettabledata(token);
  }
  else {
    notloggedin();
  }
});

//Get table data
function gettabledata(token) {
  var urlstring = "https://script.google.com/macros/s/AKfycbz1rWpe0rP-Dmr9FQUI3OPTsoBbICmAyjAWR40HEW7TplU-nSSt/exec?token=" + token + "&content=8";

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlstring,
    "method": "GET"
  };

  $.ajax(settings).done(function (response) {
    //console.log(response);

    if(response.error == 0) {
      addtotable(response);
    }
    else {
      notloggedin();
    }
  });
}

//Populate Table
function addtotable(results) {
  document.getElementById("tableresults").deleteRow(1);
  var token = document.getElementById('token').value;

  for (var i = results.data.length - 1; i >= 0; i--) {
    var $node = null;
    $node = $('<tr><td class="name"></td><td class="username"></td><td class="active"></td><td class="delete"></td></tr>');
    $node.find("td.name").html(results.data[i][0]);
    $node.find("td.username").html(results.data[i][1]);
    if(results.data[i][2] == 1) {
      $node.find("td.active").html("Yes");
    }
    else {
      node.find("td.active").html("No");
    }
    if(results.data[i][3] == token) {
      $node.find("td.delete").html("You can\'t delete your own account");
    }
    else {
      $node.find("td.delete").html("<a style="color: rgb(255,0,0)" onclick=\"deleteaccount(\'" + results.data[i][1] + "\') \" href=\"javascript:void(0);\">Click to Delete Account</a>");
    }
    $node.prependTo("#tablebody");
  }
}

//Create New Token Function
$(function() { //shorthand document.ready function
    $('#addaccount').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        createaccount();
    });
});

function createaccount() {
  var modaltitle = document.getElementById('modalTitle');
  var valid = document.getElementById('valid');
  var drinkpass = document.getElementById('drinkpass');
  var guestpass = document.getElementById('guestpass');

  $("#myModal").modal();

  modaltitle.innerHTML = 'Please Wait...';
  valid.innerHTML = 'We are creating your new account...';
  drinkpass.innerHTML = '';
  guestpass.innerHTML = '';

  //Get values from form
  var newname = document.getElementById('name').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  var urlstring = "https://script.google.com/macros/s/AKfycbz1rWpe0rP-Dmr9FQUI3OPTsoBbICmAyjAWR40HEW7TplU-nSSt/exec?token=" + token + "&newname=" + newname + "&username=" + username + "&password=" + password + "&content=10";

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlstring,
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    var newnamefield = document.getElementById('name');
    var usernamefield = document.getElementById('username');
    var passwordfield = document.getElementById('password');
    newnamefield.value = "";
    usernamefield.value = "";
    passwordfield.value = "";

    modaltitle.innerHTML = 'Success!';
    valid.innerHTML = 'Your new username is: ' + response.data[0];
    drinkpass.innerHTML = 'This account belongs to: ' + response.data[1];
    guestpass.innerHTML = '';

    refreshtable();
  });
}

//Delete Token Function
function deleteaccount(username) {
  var token = document.getElementById('token').value;
  var urlstring = "https://script.google.com/macros/s/AKfycbz1rWpe0rP-Dmr9FQUI3OPTsoBbICmAyjAWR40HEW7TplU-nSSt/exec?token=" + token + "&username=" + username + "&content=9";

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlstring,
    "method": "GET"
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    if(response.error == 0) {
      refreshtable();
    }
    else {
      notloggedin();
    }
  });
}

//Add Token To Links
function editlinks(token, username) {
  var usernametext = document.getElementById('usernametext');
  var tokenfield = document.getElementById('token');
  usernametext.innerHTML = "Hello, " + username + "!";
  tokenfield.value = token;

  document.getElementById("link0").href = "https://dvhsbluecrew.github.io/dashboard/index.html?token=" + token;
  document.getElementById("link1").href = "https://dvhsbluecrew.github.io/dashboard/index.html?token=" + token;
  document.getElementById("link2").href = "https://dvhsbluecrew.github.io/scanner/scanner.html?token=" + token;
  document.getElementById("link3").href = "https://dvhsbluecrew.github.io/dashboard/accesscode.html?token=" + token;
  document.getElementById("link4").href = "https://dvhsbluecrew.github.io/dashboard/manage.html?token=" + token;
  document.getElementById("link5").href = "https://dvhsbluecrew.github.io/dashboard/checkedin.html?token=" + token;
  document.getElementById("link6").href = "https://dvhsbluecrew.github.io/dashboard/notcheckedin.html?token=" + token;
  document.getElementById("link7").href = "https://dvhsbluecrew.github.io/dashboard/allstudents.html?token=" + token;
}

//Not Logged In Redirect
function notloggedin() {
  var redirectlink = "https://dvhsbluecrew.github.io/signin.html";
  window.location.replace(redirectlink);
}

//Sign Out Function
function signout() {
  var signoutbutton = document.getElementById('signoutbutton');
  signoutbutton.innerHTML = "Please Wait...";

  var urlstring = "https://script.google.com/macros/s/AKfycbwtlwqCUJLyfo54Kqb3kSUN1Sc3B-QUVk6hAjl1FfCcEKZsABQ/exec?token=" + token;

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": urlstring,
    "method": "GET"
  };

  $.ajax(settings).done(function (response) {
    var redirectlink = "https://dvhsbluecrew.github.io/";
    window.location.replace(redirectlink);
  });
}

//Refresh Table
function refreshtable() {
  $("#tableresults tbody tr").remove();
  var $node = null;
  $node = $('<tr><td></td><td>Data is loading, please wait...</td><td></td><td></td><td></td></tr>');
  $node.prependTo("#tablebody");
  var token = getParameterByName('token');
  gettabledata(token);
}

//Click to Check In
function clicktocheckin(number) {
  document.getElementById("search").value = number;
  formsubmit();
}

//Form submit
$(function() { //shorthand document.ready function
    $('#searchID').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        formsubmit();
    });
});

function formsubmit() {
  var modaltitle = document.getElementById('modalTitle');
  var valid = document.getElementById('valid');
  var drinkpass = document.getElementById('drinkpass');
  var guestpass = document.getElementById('guestpass');

  $("#myModal").modal();

  modaltitle.innerHTML = 'Please Wait...';
  valid.innerHTML = '';
  drinkpass.innerHTML = '';
  guestpass.innerHTML = '';

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
    modaltitle.innerHTML = response.name + ' (' + response.idnum + ')';

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
      valid.innerHTML = '<div class="d-inline bg-warning">This student was checked in by ' + response.checkinstaff + ' at ' + response.checkintime + '.</div>';

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
      drinkpass.innerHTML = 'Try scanning the card again.';
    }
    else {
      notloggedin();
    }
  });

  return false;
}

//Table Sort Function
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableresults");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

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