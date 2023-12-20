import _ from 'lodash';
import './style.css';

// Create elements
const container = document.createElement('div');
container.className = 'container';

const heading = document.createElement('h1');
heading.textContent = 'Weather App';

const input = document.createElement('input');
input.type = 'text';
input.id = 'Name';
input.placeholder = 'Enter Location';

const button = document.createElement('button');
button.id = 'submit';
button.textContent = 'Get Weather';

const weatherInfo = document.createElement('div');
weatherInfo.id = 'weatherInfo';

const days = ['One', 'Two', 'Three', 'Four', 'Five'];

// Create elements for each day
for (let i = 0; i < days.length; i++) {
  const dayDiv = document.createElement('div');
  dayDiv.id = `day${days[i]}`;

  const description = document.createElement('p');
  description.id = `day${days[i]}Description`;

  const image = document.createElement('img');
  image.id = `day${days[i]}Image`;

  dayDiv.appendChild(description);
  dayDiv.appendChild(image);
  weatherInfo.appendChild(dayDiv);
}

// Append elements to the container
container.appendChild(heading);
container.appendChild(input);
container.appendChild(button);
container.appendChild(weatherInfo);

// Append container to the body of the HTML document
document.body.appendChild(container);
