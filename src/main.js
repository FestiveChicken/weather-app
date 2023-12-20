import _ from 'lodash';
import './style.css';

const submitButton = document.getElementById('submit').addEventListener('click', () => {
    const textBox = document.getElementById('Name').value;
    setWeather(textBox);
});

//Gets temperature for the next five days
const getTemperature = async(locationName) => {
    return new Promise((resolve, reject) => {

    const temperatureArray = [];

    fetch('https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=' + locationName + '&days=5', { mode: 'cors' })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        for (let i = 0; i < 5; i++) {
            let temperature = response.forecast.forecastday[i].day.avgtemp_c;
            temperatureArray.push(temperature);
        }
        resolve(temperatureArray)
    })
    .catch(function (error) {
        // Handle error by displaying a message
        console.log('Error fetching data:', error);
    });
    
})
};

//Gets conditions for the next five days
const getCondition = async (locationName) => {
    return new Promise((resolve, reject) => {
        const conditionsArray = [];
        fetch('https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=' + locationName + '&days=5', { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            for (let i = 0; i < 5; i++) {
                let condition = response.forecast.forecastday[i].day.condition.text;
                conditionsArray.push(condition)
            }
            resolve(conditionsArray)
        })
        .catch(function (error) {
            // Handle error by displaying a message
            console.log('Error fetching data:', error);
        });
    })
};

//Sets the picture for each day
const setWeatherPictures = async (locationName) => {
    try {
        const conditionsArray = await getCondition(locationName)
        //const day1Image = document.getElementById('day1Image');
        //const day2Image = document.getElementById('day2Image');
        //const day3Image = document.getElementById('day3Image');
        //const day4Image = document.getElementById('day4Image');
        //const day5Image = document.getElementById('day5Image');
        //console.log(conditionsArray)
        for (let i = 0; i < conditionsArray.length; i++) {
            const iconNumber = getIconNumber(conditionsArray[i])
            const imageId = `day${i+1}Image`;
            const imagePath = `/images${iconNumber}.png`
            console.log('im doing the thing')
            document.getElementById(imageId).src = imagePath
        }
    }
    catch (error) {
    }
}

//fetches weather conditions
const fetchWeatherConditions = async () => {
    try {
        const response = await fetch('/weather_conditions.json');
        const weatherConditions = await response.json()
        return weatherConditions
    }
    catch (error) {
        console.log('error getting weather JSON')
    }
}

//gets icon number from weather_conditions.json
const getIconNumber = async (condition) => {
    const icon = [];
    if (typeof weatherConditions !== 'undefinded') {
        const weatherConditions = await fetchWeatherConditions();
    }
    const matchingCondition = weatherConditions.find(item => item.day === day)
    if (matchingCondition) {
        icon.push(matchingCondition.icon);
    }
    else console.log('getIconNumber')
    return icon
}

//Sets the description for each day
    const  setWeatherDescription = async (locationName) => {
        try {
            const temperature =  await getTemperature(locationName)            
            const dayOneDescription = document.getElementById('dayOneDescription');
            const dayTwoDescription = document.getElementById('dayTwoDescription');
            const dayThreeDescription = document.getElementById('dayThreeDescription');
            const dayFourDescription = document.getElementById('dayFourDescription');
            const dayFiveDescription = document.getElementById('dayFiveDescription');
        
            for (i = 0; i < 5; i++) {
                 // Set temperature description for each day
                 switch (i) {
                    case 0:
                        dayOneDescription.textContent = `${temperature[0]}°C`;
                        break;
                    case 1:
                        dayTwoDescription.textContent = `${temperature[1]}°C`;
                        break;
                    case 2:
                        dayThreeDescription.textContent = `${temperature[2]}°C`;
                        break;
                    case 3:
                        dayFourDescription.textContent = `${temperature[3]}°C`;
                        break;
                    case 4:
                        dayFiveDescription.textContent = `${temperature[4]}°C`;
                        break;
                    default:
                        break;
                };
            };
        }
        catch (error) {
        }
    };

//Calls all the functions
const setWeather = (locationName) => {
    setWeatherDescription(locationName)
    setWeatherPictures(locationName)
}