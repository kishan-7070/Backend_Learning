document.addEventListener('DOMContentLoaded',()=>{
    const cityInput=document.getElementById("city-input");
    const GetButton=document.getElementById("get-weather-btn");
    const weatherInfo=document.getElementById("weather-info");
    const cityName=document.getElementById("city-name");
    const Temperature=document.getElementById("temperature");
    const Description=document.getElementById("description");
    const errorMessage = document.getElementById("error-message");
    
    const API_KEY="e5072a09ec40a19f609dfec1f8033b47";  

    GetButton.addEventListener('click',async()=>{
        const city=cityInput.value.trim();
        if(!city)return;

        try{
            const weatherData=await fetchWeatherData(city);
            displayWeatherData(weatherData);
        }catch(error){
            showError();
        }

    });

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response=await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);
        if(!response.ok){
            throw new Error("City not Found");
        }

        const data=await response.json();
        return data

    }

    function displayWeatherData(data){
        console.log(data);
        const{name,main,weather}=data;
        cityName.textContent=name;
    Temperature.textContent=`Temperature : ${main.temp}`;
    Description.textContent=`Weather : ${weather[0].description}`;

    //unlock display
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add("hidden");
    }

    function showError(){
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
})