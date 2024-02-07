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
const urlApi = 'https://icanhazdadjoke.com';
const headers = new Headers();
headers.append('Accept', 'application/json');
//Fetch options
const fetchOptions = {
    method: 'GET',
    headers: headers,
};
var joke;
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
            // const nextClickHandler = () => {
            //     report.push({ joke: ramdomData.joke, date: new Date().toISOString() });
            //     console.log(report);
            //     btnNext.removeEventListener('click', nextClickHandler);     
            // }
            // btnNext.addEventListener('click', nextClickHandler, { once: true }); 
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
const randomFetch = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = Math.floor(Math.random() * 2);
    console.log(result);
    if (result === 0) {
        randomJoke();
    }
    else {
        randomChuck();
    }
});
function getScore(id) {
    report = report.filter(item => item.joke !== joke);
    const score = id;
    const date = new Date().toISOString();
    const scoredJoke = { joke, score, date };
    report.push(scoredJoke);
    console.log(report);
}
let report = [];
// const saveJokes = (data: any) => {
//     console.log(data);
// }
function nextJoke() {
    const exist = report.some(item => item.joke === joke);
    console.log(exist);
    if (!exist) {
        console.log(report);
        const date = new Date().toISOString();
        const notScoredJoke = { joke, date };
        report.push(notScoredJoke);
        console.log(report);
    }
    else {
        randomFetch();
    }
}
randomFetch();
