<div id="top"></div>

  <h3 align="center">The Weather Dashboard</h3>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
## Descripton
This repository contains the code for a deployed web app that fetches current and 5-day forecasts from the OpenWeatherMap api 


## Table of Contents
* [About](#about)
* [Technologies Used](#technologies-used)
* [Contact](#contact)


## About
[![Product Name Screen Shot][product-screenshot]](https://judo2000.github.io/week6_weather_dashboard/)

The Weather Dashboard app fetches data from the OpenWeatherMap api.  The user enteres a city and the app fetches the data and displays the current weather, including current temperatur, wind speed, humidity and UV index.  The UV index has a colored background color of green for 0-2, yellow for uvi of 2.1-5, orange for uvi of 5.1-7, red for a uvi of 7.1-10 and purple for 10.1 and above.

The app also displayes the selected cities' 5-day forcaset with hi and low temperatures, and an icon for weather conditions.

Another feature of the app is that it stores selected cities in local storage and displays them as button under the search form. If you click on a city's button it will disply the information just as if the city were entered into the search field.

I also used the Moments.js api to format and display the current day as well as to display the dates for the 5-day forecast.

If a user searches for a city that is not in the database or enters anything other than a city name, the app will display an error with a red background informing the user that the information entered is invalid.
![error-screenshot]

<p align="right">(<a href="#top">back to top</a>)</p>

## Technologies Used
* HTML
* CSS
* [Bootstrap]
* [jQuery]
* [Moments.js]
* [OpenWeatherMap]

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact
<a href="https://linktr.ee/stephensmoore" target="_blank"></a>Stephen Moore</a>

Project Link: [The Day Planner Page](https://judo2000.github.io/week6_weather_dashboard/)

Github Repo Link: [Github repository ](https://github.com/judo2000/week6_weather_dashboard)

<p align="right">(<a href="#top">back to top</a>)</p>

[product-name]: The-Weather-Dashboard
[product-screenshot]: assets/images/weather_dashboard_screenshot.png
[error-screenshot]: assets/images/weather_dashboard_error_screenshot.png
[Bootstrap]: https://getbootstrap.com/
[jQuery]: https://jquery.com/
[Moments.js]: https://momentjs.com/
[OpenWeatherMap]: https://openweathermap.org/api