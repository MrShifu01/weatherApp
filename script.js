const api = {
    key: "63b2d23bc2de38b4670f9725b0985bb5",
    base: "https://api.openweathermap.org/data/2.5/"
} 

const search = document.querySelector(".search")
const btn = document.querySelector(".btn")

btn.addEventListener('click', getInput);

function getInput (event) {
    event.preventDefault();
    if (event.type === "click") {
        getData(search.value);
    }
}

function getData () {
    fetch(`${api.base}weather?q=${search.value}&appid=${api.key}`)
    .then(response => {
        return response.json()
    }).then(displayData);
}

function displayData (response) {
    if (response.cod === "404") {
        const error = document.querySelector(".error")
        error.textContent = "Please Enter a Valid City"
        search.value = ""
    } else {
        const city = document.querySelector(".city")
        city.textContent = `${response.name}, ${response.sys.country}`

        const today = new Date()
        const date = document.querySelector('.date')
        date.textContent = dateFunction(today);

        const temp = document.querySelector(".temp")
        temp.textContent = `Temp: ${Math.round(response.main.temp - 273.15)} °C`
        
        const weather = document.querySelector(".weather")
        weather.textContent = `Weather: ${response.weather[0].main}`
        
        const tempRange = document.querySelector(".temp-range")
        tempRange.textContent = `Temp Range: ${Math.round(response.main.temp_min - 273.15)} °C / ${Math.round(response.main.temp_max - 273.15)} °C`

        const weatherIcon = document.querySelector(".weather-icon")
        const iconUrl = "http://openweathermap.org/img/w/"

        weatherIcon.src = iconUrl + response.weather[0].icon + ".png"

        search.value = "";
        
    }
}

function dateFunction (d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day}, ${date} ${month} ${year}`

}