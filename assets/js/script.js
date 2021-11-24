// url to get city longitude and latitude
const getLocUrl = 'https://api.openweathermap.org/geo/1.0/direct?appid=9094815cf69de4af2049665b33b7f363&'
// base url for forecast api
const baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?&appid=9094815cf69de4af2049665b33b7f363&units=imperial&include=current'
// target form 
const formEl = $('#city-form');
// target city name div
const cityNameEl = $('#cityName');
// target weather card element
let weatherCardsEl = $('#weatherCards');
// target h2 with id of currDay
let currDayEl = $('#currDay');
// target current conditions element
let currConditionsEl = $('#currConditions');
// target history element for previous cities
let historyEl = $('#history');
// create empty cities array
let cities = [];
// get stored cities from local storage
let storedCities = JSON.parse(localStorage.getItem("cities"));
let q = '';

loadCities();

function loadCities() {
  historyEl.text('');
  if (storedCities) {
    console.log(storedCities);
    for (let i = 0; i < storedCities.length; i++) {
      let cityBtn = $(
        `<button id="${i}" data-q="${storedCities[i]}" class="btn btn-primary city-btn my-2">${storedCities[i]}</button><br />`
      );
      historyEl.append(cityBtn);
    }
  }
}

historyEl.on('click', function(event) {
  let q = event.target.getAttribute('data-q');
  formEl.attr('data-q', q);
 formEl.submit();
})

function formHandler(event) {
  event.preventDefault();
  console.log(event);
  // clear any dta from weatherCardsEl
  currConditionsEl.text('');
  weatherCardsEl.text('');
  currConditionsEl.removeClass('border border-dark border-2')
  
  if (formEl.attr('data-q')) {
    //console.log(formEl.attr('data-q'));
    q = formEl.attr('data-q')
    console.log(q);
  } else {
    q = $('input[name="city-input"]').val().trim();
  }
  
  if (!q) {
    return;
  }

  console.log(q);
  
  let cityRequestUrl = `${getLocUrl}&q=${q}`;

  fetch(cityRequestUrl)
    .then(function (response) {
      // When this request is made, get the response and check to see if it went well
      // if so, take the data and decode it so that we humans can read it
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      
      if (storedCities !== null) {
        cities = storedCities;
        if (!cities.includes(q)) {
          cities.push(q);
        }
      } else {
        cities.push(q);
      }
      localStorage.setItem("cities", JSON.stringify(cities));
      loadCities();
      
      //build the url
      let requestUrl = `${baseUrl}&lon=${lon}&lat=${lat}`;
      fetch(requestUrl)
        .then(function (response) {
          // When this request is made, get the response and check to see if it went well
          // if so, take the data and decode it so that we humans can read it
          return response.json();
        })
        .then(function (data) {
           //console.log(data.daily);
           if (data.current.uvi <= 2) {
            uviColor = "green"
          } else if (data.current.uvi < 2 && data.current.uvi <= 5) {
            uviColor = "yellow"
          } else if (data.current.uvi < 5 && data.current.uvi <= 7) {
            uviColor ="orange"
          } else {
            uviColor = "red"
          };

            let currWeather = (
              `<b>Temp:</b> ${Math.round(data.current.temp)}&deg; F <br />
              <b>Wind:</b> ${Math.round(data.current.wind_speed)} mpg <br />
              <b>Humidity:</b> ${Math.round(data.current.humidity)} % <br />
              <b>UV Index:</b> <span class="${uviColor} text-white px-2">${data.current.uvi}</span>`
            );
           //console.log(currWeather);
           currConditionsEl.addClass('border border-dark border-2')
           // add city name to the page
           //cityNameEl.text('test');
          
           cityNameEl.text(`${q} (${moment().format("MM/D/YYYY")})`);
           currConditionsEl.append(currWeather);
           //weatherCardsEl.removeClass("hide");
           //weatherCardsEl.addClass("show");
           for (let i = 0; i < 5; i++) {
             //console.log(data.list[i].main.temp_max);
             let currDay = moment().add(i, 'days').format("MM/D/YYYY");
              console.log(data.daily[i].temp.max);
              let weatherBlock = $(
                `<div class="card text-white" style="width: 11rem;">
                    <div class="card-body">
                      <h5 class="card-title">${currDay}</h5>
                      <p class="card-text">
                        <img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png"/> <br />
                        <b>Hi:</b> ${Math.round(data.daily[i].temp.max)}&deg; F <br />
                        <b>Low:</b> ${Math.round(data.daily[i].temp.min)}&deg; F <br />
                      </p>
                    </div>
                  </div>` 
             );
             // clear input form
             $('input[name="city-input"]').val('');
             //append weatherBlock to Weather cards element
            weatherCardsEl.append(weatherBlock);
          };
        })
      })
}

// click handler for input
formEl.on('submit', formHandler);