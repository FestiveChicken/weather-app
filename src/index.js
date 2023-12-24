// eslint-disable-next-line no-unused-vars
import _ from "lodash";
import "./style.css";

// Create elements
const container = document.createElement("div");
container.className = "container";

const heading = document.createElement("h1");
heading.textContent = "Weather App";

const input = document.createElement("input");
input.type = "text";
input.id = "Name";
input.placeholder = "Enter Location";

const button = document.createElement("button");
button.id = "submit";
button.textContent = "Get Weather";

const weatherInfo = document.createElement("div");
weatherInfo.id = "weatherInfo";

const days = ["One", "Two", "Three", "Four", "Five"];

// Create elements for each day
for (let i = 0; i < days.length; i++) {
  const dayDiv = document.createElement("div");
  dayDiv.id = `day${days[i]}`;

  const date = document.createElement("p");
  date.id = `day${days[i]}Date`;

  const temperature = document.createElement("p");
  temperature.id = `day${days[i]}Temperature`;

  const image = document.createElement("img");
  image.id = `day${days[i]}Image`;

  const condition = document.createElement("p");
  condition.id = `day${days[i]}Condition`;

  dayDiv.appendChild(date);
  dayDiv.appendChild(temperature);
  dayDiv.appendChild(image);
  dayDiv.appendChild(condition);
  weatherInfo.appendChild(dayDiv);
}

// Append elements to the container
container.appendChild(heading);
container.appendChild(input);
container.appendChild(button);
container.appendChild(weatherInfo);

// Append container to the body of the HTML document
document.body.appendChild(container);
