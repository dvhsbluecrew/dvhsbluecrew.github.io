//Startup Script
google.charts.load('current', {'packages':['corechart']});

var token = getParameterByName('token');

var urlstring = "https://script.google.com/macros/s/AKfycbz1rWpe0rP-Dmr9FQUI3OPTsoBbICmAyjAWR40HEW7TplU-nSSt/exec?token=" + token + "&content=2";

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
    drawChart(response.checkedin, response.notcheckedin);
    editlinks(response.token, response.username);
  }
  else {
    notloggedin();
  }
});

//Populate Table
function addtotable(results) {
  document.getElementById("tableresults").deleteRow(1);

  for (var i = results.students - 1; i >= 0; i--) {
    var $node = null;
    $node = $('<tr><td class="id"></td><td class="name"></td><td class="dp"></td><td class="gp"></td><td class="checkedin"></td></tr>');
    $node.find("td.id").html(results.data[i][0]);
    $node.find("td.name").html(results.data[i][1]);
    if(results.data[i][3] !== '') {
      $node.find("td.dp").html("Yes, " + results.data[i][3]);
    }
    else {
      $node.find("td.dp").html("No");
    }
    if(results.data[i][4] == 1) {
      $node.find("td.gp").html("Yes, " + results.data[i][5]);
    }
    else {
      $node.find("td.gp").html("No");
    }
    $node.find("td.checkedin").html(results.data[i][6]);
    //$("tablebody").prepend($node);
    $node.prependTo("#tablebody");
  }
}

//Google Charts
function drawChart(checkedin, notcheckedin) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Group');
  data.addColumn('number', 'Number');
  data.addRows([
    ['Checked In', checkedin],
    ['Not Checked In', notcheckedin]
  ]);

  var options = {
    slices: [{color: 'green'}, {color: 'red'}],
    legend: 'none'
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
  chart.draw(data, options);
}

//Add Token To Links
function editlinks(token, username) {
  var usernametext = document.getElementById('usernametext');
  var tokenfield = document.getElementById('token');
  usernametext.innerHTML = "Hello, " + username;
  tokenfield.value = token;

  document.getElementById("link1").href = "https://dvhsbluecrew.github.io/dashboard/index.html?token=" + response.token;
  document.getElementById("link2").href = "https://dvhsbluecrew.github.io/scanner/scanner.html?token=" + response.token;
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

//Table Search Bar Function
function searchBar() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("tablesearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableresults");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } 
      else {
        tr[i].style.display = "none";
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