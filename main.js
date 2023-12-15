const submitButton = document.getElementById('submit').addEventListener('click', () =>
 {
    const textBox = document.getElementById('Name').value
    getWeather(textBox)
 })


const getWeather = (locationName) => {
    const div = document.querySelector('div')

    fetch('https://api.weatherapi.com/v1/current.json?key=302e8a0e7fec43a1b5a181824231312&q='+locationName, {mode: 'cors'})
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        const weather = response.current.temp_c;
        const location = response.location.name;
        const region = response.location.region;
        const country = response.location.country
        div.textContent = "It is " + weather + " degrees celsius in " + location + ', ' + region + ', ' + country
    })
}