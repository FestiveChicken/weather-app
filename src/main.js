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
        };
        resolve(temperatureArray);
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
        const conditionsIconArray = [];
        const conditionsArray = [];
        const dateArray = [];

        fetch('https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=' + locationName + '&days=5', { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.forecast.forecastday[0].date)
            for (let i = 0; i < 5; i++) {
                let conditionIcon = response.forecast.forecastday[i].day.condition.icon;
                let condition = response.forecast.forecastday[i].day.condition.text;
                let date = response.forecast.forecastday[i].date
                
                conditionsIconArray.push(conditionIcon)
                conditionsArray.push(condition)
                dateArray.push(date)
            };
            resolve([conditionsIconArray, conditionsArray, dateArray])
        })
        .catch(function (error) {
            // Handle error by displaying a message
            console.log('Error fetching data:', error);
        });
    });
};

//Sets the picture for each day
const setWeatherPictures = async (locationName) => {
    try {
        const [conditionsIconArray, ] = await getCondition(locationName);
        const days = ['One', 'Two', 'Three', 'Four', 'Five'];
        for (let i = 0; i < 5; i++) {
            document.getElementById(`day${days[i]}Image`).src = `https:` + conditionsIconArray[i];
        };
    }
    catch (error) {
    };
};

//fetches weather conditions
const setWeatherCondition = async () => {
}

//Sets the description for each day
    const  setWeatherDescription = async (locationName) => {

        try {
            const temperature =  await getTemperature(locationName)            
            const days = ['One', 'Two', 'Three', 'Four', 'Five'];
        
            for (let i = 0; i < 5; i++) {
                document.getElementById(`day${days[i]}Temperature`).textContent = temperature[i] + '\u00B0 C';
                };
        }
        catch (error) {
        };
    };

//Calls all the functions
const setWeather = (locationName) => {
    setWeatherDescription(locationName)
    setWeatherPictures(locationName)
};