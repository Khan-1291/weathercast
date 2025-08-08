
// function for current weather data
async function cheakweather() {
   const input = document.getElementById('citySelect').value || "Pakistan";


   const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f737ad39e3fd4509bba94733250608&q=${input}&days=0`)
   if (!response.ok) {
      console.log("Ther is something rong" + response.status);
      return;
   }
   const weatherData = await response.json();
   const icon = "https:" + weatherData.current.condition.icon;
   console.log(weatherData.location.name);
   document.getElementById('city-name').innerHTML = weatherData.location.name;
   document.getElementById('date').innerHTML = weatherData.current.last_updated;
   document.getElementById('temperature').innerHTML = weatherData.current.temp_c + "°C";
   document.getElementById('condition').innerHTML = weatherData.current.condition.text;

   document.getElementById('icon').innerHTML = `<img src="${icon}" alt="Svg is loading">`
   document.getElementById('feels-like').innerHTML = "Feels like " + weatherData.current.feelslike_c + "°C";
   document.getElementById("wind").innerHTML = weatherData.current.wind_kph + " KP/H";
   document.getElementById('humidity').innerHTML = weatherData.current.humidity + " %";
   document.getElementById("visibility").innerHTML = weatherData.current.vis_km + " km";
   document.getElementById("pressure").innerHTML = weatherData.current.pressure_mb + " mb"

}
// hourly data fetching request



async function gethourdata() {
   const input = document.getElementById('citySelect').value || "Pakistan";

   const dayForecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f737ad39e3fd4509bba94733250608&q=${input}&days=1`)
   const eachHour = await dayForecast.json();
   const hour0 = eachHour.forecast.forecastday[0].hour;
   let outputforhour = "";
   hour0.forEach(hour => {
      const houricon = "https:" + hour.condition.icon;
      const hoursonly = new Date(hour.time).getHours() + 1;
      outputforhour += `<div class="hourly-item">
      <span class="hour"> ${hoursonly} o'clock </span>
      <div class="hourly-icon"><img src="${houricon}" alt="icon"></div>
      <div class="hourly-temp">${hour.temp_c}°C</div>
   </div>`

   });
   document.getElementById("hourly-forecast").innerHTML = outputforhour;
}


// weakly forcast 
async function weaklyforcast() {
   const input = document.getElementById('citySelect').value || "Pakistan";
   const weaklyforcast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f737ad39e3fd4509bba94733250608&q=${input}&days=7`)
   const weaklyforcastData = await weaklyforcast.json();
   const day = weaklyforcastData.forecast.forecastday;
   let outputforday = "";
   day.forEach(day => {
      const icon = "https:" + day.day.condition.icon;
      outputforday += `
 
   <div class="forecast-item">
                        <span class="day">${day.date}</span>
                        <div class="forecast-weather">
                            <span class="forecast-icon"><img src="${icon}" alt="icoon"></span>
                            <span class="forecast-desc">${day.day.condition.text}</span>
                        </div>
                        <div class="forecast-temps">
                            <span class="temp-high">${day.day.maxtemp_c}°C</span>
                            <span class="temp-low">${day.day.mintemp_c}°C</span>
                        </div>
                    </div>
   
   `
   });
   document.getElementById('forcastday').innerHTML = outputforday;

}



