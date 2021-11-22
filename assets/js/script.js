// base url for forecast api
const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?cnt=7&units=imperial&appid=9094815cf69de4af2049665b33b7f363'
// target form 
const formEl = $('#city-form');
// target city name div
const cityNameEl = $('#cityName');
// target weather table element
let weatherTableEl = $('#weatherTable');
// target weatherTableBoty element
let weatherTableBodyEl = $('#weatherTableBody'); 

function formHandler(event) {
  event.preventDefault()

  let q = $('input[name="city-input"]').val().trim();
  console.log(q);
  // add city name to the page
  cityNameEl.text(q)
  // build the url
  let requestUrl = `${baseUrl}&q=${q}`;
  
  fetch(requestUrl)
    .then(function (response) {
      // When this request is made, get the response and check to see if it went well
      // if so, take the data and decode it so that we humans can read it
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      weatherTableEl.removeClass("hide");
      weatherTableEl.addClass("show");
      for (let i = 0; i < 7; i++){
        console.log(data.list[i].main.temp_max);
        let currDay = moment().add(i, 'days').format("dddd, MMMM Do YYYY");
        console.log(currDay);
        let weatherBlock = $(
          `<tr>
            <th scope="row">${currDay}</th>
            <td>${Math.round(data.list[i].main.temp_max)}&deg; F</td>
            <td>${Math.round(data.list[i].main.temp_min)}&deg; F</td>
            <td>${data.list[i].weather[0].description}</td>
          </tr>`
        );
        //addend weatherBlock to table body element
        weatherTableBodyEl.append(weatherBlock);
      }
    });

    
 

}

  // click handler for input
  formEl.on('submit', formHandler);