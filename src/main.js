// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import "./style.css";

// eslint-disable-next-line no-unused-vars
const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
  const textBox = document.getElementById("Name").value;
  if (!textBox.trim()) {
    alert("Please enter a location.");
    return;
  }
  setWeather(textBox);
});

// Gets temperature for the next five days
const getTemperature = async (locationName) => {
  return new Promise((resolve) => {
    const temperatureArray = [];

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9cae779d806ab550191f667e3bda78bc&q=${locationName}&days=5`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("API response (temperature):", response);
        for (let i = 0; i < 5; i++) {
          const dayData = response.forecast?.forecastday?.[i];
          if (dayData && dayData.day) {
            temperatureArray.push(dayData.day.avgtemp_c);
          } else {
            console.warn("Missing day data at index", i);
            temperatureArray.push("N/A");
          }
        }
        resolve(temperatureArray);
      })
      .catch((error) => {
        console.error("Error fetching temperature data:", error);
      });
  });
};

// Gets condition, dates, and images for the next five days
const getCondition = async (locationName) => {
  return new Promise((resolve) => {
    const conditionsIconArray = [];
    const conditionsArray = [];
    const dateArray = [];

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9cae779d806ab550191f667e3bda78bc&q=${locationName}&days=5`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("API response (condition):", response);
        for (let i = 0; i < 5; i++) {
          const dayData = response.forecast?.forecastday?.[i];
          if (dayData && dayData.day && dayData.day.condition) {
            let conditionIcon = dayData.day.condition.icon;
            let condition = dayData.day.condition.text;
            let date = dayData.date;

            conditionsIconArray.push(conditionIcon);
            conditionsArray.push(condition);
            dateArray.push(date);
          } else {
            console.warn("Missing condition data at index", i);
            conditionsIconArray.push("");
            conditionsArray.push("N/A");
            dateArray.push("N/A");
          }
        }
        resolve([conditionsIconArray, conditionsArray, dateArray]);
      })
      .catch((error) => {
        console.error("Error fetching condition data:", error);
      });
  });
};

// Sets the temperature for each day
const setWeatherTemperature = async (locationName) => {
  try {
    const temperature = await getTemperature(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];

    for (let i = 0; i < 5; i++) {
      document.getElementById(`day${days[i]}Temperature`).textContent =
        temperature[i] !== "N/A" ? temperature[i] + "\u00B0 C" : "N/A";
    }
  } catch (error) {
    console.error("Error setting temperature:", error);
  }
};

// Sets the picture for each day
const setWeatherPictures = async (locationName) => {
  try {
    const [conditionsIconArray] = await getCondition(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];
    for (let i = 0; i < 5; i++) {
      document.getElementById(`day${days[i]}Image`).src =
        conditionsIconArray[i] ? `https:${conditionsIconArray[i]}` : "";
    }
  } catch (error) {
    console.error("Error setting pictures:", error);
  }
};

// Describes the weather conditions
const setWeatherCondition = async (locationName) => {
  try {
    const [, conditionsArray] = await getCondition(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];
    for (let i = 0; i < 5; i++) {
      document.getElementById(`day${days[i]}Condition`).textContent =
        conditionsArray[i];
    }
  } catch (error) {
    console.error("Error setting condition:", error);
  }
};

// Sets the weekday for each day
const setWeatherDate = async (locationName) => {
  try {
    const [, , dateArray] = await getCondition(locationName);
    const days = ["One", "Two", "Three", "Four", "Five"];
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let i = 0; i < 5; i++) {
      const d = new Date(dateArray[i]);
      const dayName = isNaN(d.getDay()) ? "N/A" : weekdays[d.getDay()];
      document.getElementById(`day${days[i]}Date`).textContent = dayName;
    }
  } catch (error) {
    console.error("Error setting date:", error);
  }
};

// Calls all the functions
const setWeather = (locationName) => {
  setWeatherTemperature(locationName);
  setWeatherPictures(locationName);
  setWeatherCondition(locationName);
  setWeatherDate(locationName);
};
