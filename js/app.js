"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const containerText = document.getElementById('container_text');
const btnNext = document.getElementById('btn_next');
const btn1 = document.getElementById('btn_score1');
const btn2 = document.getElementById('btn_score2');
const btn3 = document.getElementById('btn_score3');
const containerWeather = document.getElementById('weather');
const weatherIcon = document.getElementById('weather_icon');
const containerBg = document.getElementById('container_bg');
let report = [];
let joke;
const urlApi = 'https://icanhazdadjoke.com';
const headers = new Headers();
headers.append('Accept', 'application/json');
//Fetch options
const fetchOptions = {
    method: 'GET',
    headers: headers,
};
// this functions call the API randomJoke or Chuck depending in the random number result
const randomFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = Math.floor(Math.random() * 2);
    // console.log(result);
    if (result === 0) {
        randomJoke();
    }
    else {
        randomChuck();
    }
});
// this function call the ramdomJoke API
function randomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(urlApi, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const ramdomData = yield response.json();
            // console.log(ramdomData.joke);
            if (containerText) {
                containerText.innerHTML = `${ramdomData.joke}`;
                joke = ramdomData.joke;
            }
            randomBg();
        }
        catch (error) {
            console.error('Error', error);
        }
    });
}
const urlApiChuck = "https://api.chucknorris.io/jokes/random";
// this function call the Chuck API
const randomChuck = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(urlApiChuck);
        if (!res.ok) {
            throw new Error(`HTTP error!`);
        }
        const chuckData = yield res.json();
        joke = chuckData.value;
        if (containerText) {
            containerText.innerHTML = `${joke}`;
            // joke = ramdomData.joke;
        }
        randomBg();
    }
    catch (error) {
        console.error('Error', error);
    }
});
const optionsWeather = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};
// // this function call the Weather API
const weatherFetch = () => {
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition((success) => {
        latitude = success.coords.latitude;
        longitude = success.coords.longitude;
        const urlWeather = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitude}%2C${longitude}`;
        fetch(urlWeather, optionsWeather)
            .then(response => response.json())
            .then(data => {
            // console.log(data);
            // console.log(data.current.condition.icon);
            weatherIcon.src = data.current.condition.icon;
            containerWeather.innerHTML = `${data.current.temp_c}ºC`;
        });
    });
};
// addEventListners to the Score buttons and call the function GetScore with the params joke and score
if (btn1 && btn2 && btn3) {
    btn1.addEventListener('click', () => {
        getScore(joke, 1);
    });
    btn2.addEventListener('click', () => {
        getScore(joke, 2);
    });
    btn3.addEventListener('click', () => {
        getScore(joke, 3);
    });
}
// the function accepts the params joke and score
function getScore(joke, score) {
    // remove the joke thats is equal to item.joke to not duplicate
    report = report.filter(item => item.joke !== joke);
    console.log(report);
    const date = new Date().toISOString();
    const scoredJoke = { joke, score, date };
    // add the joke with the new score or updated score
    report.push(scoredJoke);
    console.log(report);
}
// this function calls the randomFetch() function
// if the client doesnt want to score the Joke, can click in the nextJoke button
// the function check first if the joke is already in the array and if doesnt exist
// push's it to array
function nextJoke() {
    const exist = report.some(item => item.joke === joke);
    // console.log(exist);
    if (!exist) {
        console.log(report);
        const date = new Date().toISOString();
        const notScoredJoke = { joke, date };
        report.push(notScoredJoke);
        randomFetch();
    }
    else {
        randomFetch();
    }
}
let numbers = [];
// this function changes the background
// first saves a randomNumber in a array
// remove and add class depending on the randomNumber 
const randomBg = () => {
    let randomSvg = Math.ceil(Math.random() * 9);
    let lastIndex = numbers.length - 1;
    if (lastIndex >= 0) {
        const lastValue = numbers[lastIndex];
        // console.log(lastValue + " " + "ultimo valor");
        containerBg.classList.remove(`svg${lastValue}`);
    }
    numbers.push(randomSvg);
    // console.log(randomSvg);
    // console.log(numbers);
    containerBg.classList.add(`svg${randomSvg}`);
};
randomFetch();
weatherFetch();
