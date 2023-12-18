const submitButton = document.getElementById('submit').addEventListener('click', () => {
    const textBox = document.getElementById('Name').value;
    getWeather(textBox);
});

const getWeather = (locationName) => {
    const weatherArray = [];
    const dayOneDescription = document.getElementById('dayOneDescription');
    const dayTwoDescription = document.getElementById('dayTwoDescription');
    const dayThreeDescription = document.getElementById('dayThreeDescription');
    const dayFourDescription = document.getElementById('dayFourDescription');
    const dayFiveDescription = document.getElementById('dayFiveDescription');
    const dayOneImage = document.getElementById('dayOneImage');
    const dayTwoImage = document.getElementById('dayTwoImage');
    const dayThreeImage = document.getElementById('dayThreeImage');
    const dayFourImage = document.getElementById('dayFourImage');
    const dayFiveImage = document.getElementById('dayFiveImage');
    fetch('https://api.weatherapi.com/v1/forecast.json?key=302e8a0e7fec43a1b5a181824231312&q=' + locationName + '&days=5', { mode: 'cors' })
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        for (i = 0; i < 5; i++) {
            let weather = response.forecast.forecastday[i].day.avgtemp_c;
            let condition = response.forecast.forecastday[i].day.condition.text;
            weatherArray.push(weather);
            console.log(weatherArray)
            
            // Set temperature description for each day
            switch (i) {
                case 0:
                    dayOneDescription.textContent = `${weatherArray[0]}°C`;
                    break;
                case 1:
                    dayTwoDescription.textContent = `${weatherArray[1]}°C`;
                    break;
                case 2:
                    dayThreeDescription.textContent = `${weatherArray[2]}°C`;
                    break;
                case 3:
                    dayFourDescription.textContent = `${weatherArray[3]}°C`;
                    break;
                case 4:
                    dayFiveDescription.textContent = `${weatherArray[4]}°C`;
                    break;
                default:
                    break;
            }
             // Set weather images for each day based on conditions
        }
    })
    .catch(function (error) {
        console.log('Error fetching data:', error);
        // Handle error by displaying a message
        dayOneDescription.textContent = 'Error fetching data. Please try again.';
    });
};