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
function randomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(urlApi, fetchOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const ramdomData = yield response.json();
            console.log(ramdomData.joke);
            if (containerText) {
                containerText.innerHTML = `${ramdomData.joke}`;
                joke = ramdomData.joke;
            }
        }
        catch (error) {
            console.error('Error', error);
        }
    });
}
const urlApiChuck = "https://api.chucknorris.io/jokes/random";
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
    }
    catch (error) {
        console.error('Error', error);
    }
});
const optionsWeather = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '79bb27e588msh814253e73cb0541p16ba2bjsn43e56fa34d0b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};
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
function getScore(joke, score) {
    report = report.filter(item => item.joke !== joke);
    const date = new Date().toISOString();
    const scoredJoke = { joke, score, date };
    report.push(scoredJoke);
    console.log(report);
}
function nextJoke() {
    let randomSvg = Math.ceil(Math.random() * 10);
    console.log(randomSvg);
    // containerBg.classList.remove('svg1');
    const exist = report.some(item => item.joke === joke);
    // console.log(exist);
    if (!exist) {
        console.log(report);
        const date = new Date().toISOString();
        const notScoredJoke = { joke, date };
        report.push(notScoredJoke);
        randomFetch();
        // containerBg.classList.remove(`svg${randomSvg}`);
        // containerBg.classList.add(`svg${randomSvg}`);
        // console.log(report);
    }
    else {
        randomFetch();
        // containerBg.classList.add(`svg${randomSvg}`);
    }
}
randomFetch();
weatherFetch();
