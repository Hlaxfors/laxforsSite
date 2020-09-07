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

function getWeather() {
  // API get JSON
  weatherAPI = new XMLHttpRequest();
  weatherAPI.open("GET","https://api.weather.com/v2/pws/observations/current?stationId=IMELBO1590&format=json&units=m&apiKey=6ed36b598d7440a8936b598d74c0a891");
  weatherAPI.responseType = 'json';
  weatherAPI.send()

  // Wait for server response
  weatherAPI.onload = function() {
    
    // Data manipulation
    // Calculates feels like temperature depending certian factors

    // Calculates human-readable wind directions from degrees
    var windDeg = weatherAPI.response.observations[0].winddir;
    var windCompass;
    if (windDeg <= 45 && windDeg >= 0 || windDeg > 315) {
      windCompass = "N";
    } else if (windDeg <= 135 && windDeg > 45) {
      windCompass = "W";
    } else if (windDeg <= 225 && windDeg > 135) {
      windCompass = "S";
    } else if (windDeg <= 315 && windDeg > 225) {
      windCompass = "E";
    }

    // Enter data into table
    document.getElementById("stationIDCell").innerHTML = weatherAPI.response.observations[0].stationID;
    document.getElementById("tempCell").innerHTML = weatherAPI.response.observations[0].metric.temp;
    document.getElementById("UVCell").innerHTML = weatherAPI.response.observations[0].uv;
    document.getElementById("windSpeedCell").innerHTML = weatherAPI.response.observations[0].metric.windSpeed;
    document.getElementById("windDirCell").innerHTML = windCompass + "(" + weatherAPI.response.observations[0].winddir + "°)";
  };
};
getWeather();
setInterval(getWeather(),300000);