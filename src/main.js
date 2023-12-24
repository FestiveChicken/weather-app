// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import "./style.css";

// eslint-disable-next-line no-unused-vars
const submitButton = document.getElementById("submit") 

submitButton.addEventListener("click", () => {
    const textBox = document.getElementById("Name").value;
    setWeather(textBox);
  });

//Gets temperature for the next five days
const getTemperature = async (locationName) => {
  return new Promise((resolve) => {
    const temperatureArray = [];

    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=" +
        locationName +
        "&days=5",
      { mode: "cors" },
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        for (let i = 0; i < 5; i++) {
          let temperature = response.forecast.forecastday[i].day.avgtemp_c;
          temperatureArray.push(temperature);
        }
        resolve(temperatureArray);
      })
      .catch(function (error) {
        // Handle error by displaying a message
        console.log("Error fetching data:", error);
      });
  });
};

//Gets condition, dates, and images for the next five days
const getCondition = async (locationName) => {
  return new Promise((resolve) => {
    const conditionsIconArray = [];
    const conditionsArray = [];
    const dateArray = [];

    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=" +
        locationName +
        "&days=5",
      { mode: "cors" },
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        for (let i = 0; i < 5; i++) {
          let conditionIcon =
            response.forecast.forecastday[i].day.condition.icon;
          let condition = response.forecast.forecastday[i].day.condition.text;
          let date = response.forecast.forecastday[i].date;

          conditionsIconArray.push(conditionIcon);
          conditionsArray.push(condition);
          dateArray.push(date);
        }
        resolve([conditionsIconArray, conditionsArray, dateArray]);
      })
      .catch(function (error) {
        // Handle error by displaying a message
        console.log("Error fetching data:", error);
      });
  });
};

//Sets the temperature for each day
const setWeatherTemperature = async (locationName) => {
  try {
    const temperature = await getTemperature(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];

    for (let i = 0; i < 5; i++) {
      document.getElementById(`day${days[i]}Temperature`).textContent =
        temperature[i] + "\u00B0 C";
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

//Sets the picture for each day
const setWeatherPictures = async (locationName) => {
  try {
    const [conditionsIconArray] = await getCondition(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];
    for (let i = 0; i < 5; i++) {
      document.getElementById(`day${days[i]}Image`).src =
        `https:` + conditionsIconArray[i];
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

//Describes the weather conditions
const setWeatherCondition = async (locationName) => {
  try {
    const [, conditionsArray] = await getCondition(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];
    for (let i = 0; i < 5; i++) {
      document.getElementById(`day${days[i]}Condition`).textContent =
        conditionsArray[i];
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

//Describes the weather conditions
const setWeatherDate = async (locationName) => {
  try {
    const [, , dateArray] = await getCondition(locationName);

    const days = ["One", "Two", "Three", "Four", "Five"];
    const weekdays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    for (let i = 0; i < 5; i++) {
      const d = new Date(dateArray[i]);
      let day = weekdays[d.getDay()];
      document.getElementById(`day${days[i]}Date`).textContent = day;
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

//Calls all the functions
const setWeather = (locationName) => {
  setWeatherTemperature(locationName);
  setWeatherPictures(locationName);
  setWeatherCondition(locationName);
  setWeatherDate(locationName);
};
