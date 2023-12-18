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
        for (i = 0; i < 5; i++) {
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
const getCondition = (locationName) => {
    const conditonsArray = [];

    fetch('https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=' + locationName + '&days=5', { mode: 'cors' })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        for (i = 0; i < 5; i++) {
            let condition = response.forecast.forecastday[i].day.condition.text;
            conditonsArray.push(condition)
            console.log(conditonsArray)
        }
    })
    .catch(function (error) {
        // Handle error by displaying a message
        console.log('Error fetching data:', error);
    });
    return conditonsArray
};

//Sets the picture for each day
const setWeatherPictures = (locationName) => {
    const dayOneImage = document.getElementById('dayOneImage');
    const dayTwoImage = document.getElementById('dayTwoImage');
    const dayThreeImage = document.getElementById('dayThreeImage');
    const dayFourImage = document.getElementById('dayFourImage');
    const dayFiveImage = document.getElementById('dayFiveImage');
}

//Sets the description for each day
    const  setWeatherDescription = async (locationName) => {
        try {
            const temperature =  await getTemperature(locationName)
            console.log(temperature)
            
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
            console.log('get fucked')
        }
    };

//Calls all the functions
const setWeather = (locationName) => {
    setWeatherDescription(locationName)
    setWeatherPictures(locationName)
}