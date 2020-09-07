(function() {
    var h, a, f;
    a = document.getElementsByTagName('link');
    for (h = 0; h < a.length; h++) {
      f = a[h];
      if (f.rel.toLowerCase().match(/stylesheet/) && f.href) {
        var g = f.href.replace(/(&|\?)rnd=\d+/, '');
        f.href = g + (g.match(/\?/) ? '&' : '?');
        f.href += 'rnd=' + (new Date().valueOf());
      }
    } // for
  })()

// var GoogleMapsRequest = new XMLHttpRequest();
// GoogleMapsRequest.open("GET", "https://api.weather.com/v2/pws/observations/current?stationId=IMELBO1590&format=json&units=m&apiKey=6ed36b598d7440a8936b598d74c0a891", false);
// GoogleMapsRequest.responseType = 'json';
// GoogleMapsRequest.send();

// API get JSON
myvar = new XMLHttpRequest();
myvar.open("GET","https://api.weather.com/v2/pws/observations/current?stationId=IMELBO1590&format=json&units=m&apiKey=6ed36b598d7440a8936b598d74c0a891");
myvar.responseType = 'json';
myvar.send()

// Data manipulation
// Calculates feels like temperature depending certian factors


// Enter data into table
myvar.onload = function() {
  document.getElementById("stationIDCell").innerHTML = myvar.response.observations[0].stationID;
  document.getElementById("tempCell").innerHTML = myvar.response.observations[0].metric.temp;
  document.getElementById("UVCell").innerHTML = myvar.response.observations[0].uv;
};
