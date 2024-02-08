const containerText = document.getElementById('container_text') as HTMLParagraphElement;
const btnNext = document.getElementById('btn_next') as HTMLButtonElement;
const btn1 = document.getElementById('btn_score1') as HTMLButtonElement;
const btn2 = document.getElementById('btn_score2') as HTMLButtonElement;
const btn3 = document.getElementById('btn_score3') as HTMLButtonElement;
const containerWeather = document.getElementById('weather') as HTMLUListElement;
const weatherIcon = document.getElementById('weather_icon') as HTMLImageElement;
const containerBg = document.getElementById('container_bg') as HTMLDivElement;



interface RandomJoke {
    id: string,
    joke: string,
    status: number
}

interface ChuckData {
    id: string,
    value: string
}

interface ReportAcudits {
    joke: string,
    score?: number,
    date: string
}

let report: ReportAcudits[] = [];
let joke: string;


const urlApi: string = 'https://icanhazdadjoke.com';

const headers = new Headers();
headers.append('Accept', 'application/json');

//Fetch options
const fetchOptions: RequestInit = {
    method: 'GET',
    headers: headers,
};


// this functions call the API randomJoke or Chuck depending in the random number result
const randomFetch = async () => {
    let result = Math.floor(Math.random() * 2);
    // console.log(result);
    if (result === 0) {
        randomJoke();

    } else {
        randomChuck();
    }
}

// this function call the ramdomJoke API
async function randomJoke() {
    try {
        const response = await fetch(urlApi, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const ramdomData: RandomJoke = await response.json();

        // console.log(ramdomData.joke);

        if (containerText) {
            containerText.innerHTML = `${ramdomData.joke}`;
            joke = ramdomData.joke;
        }
        randomBg();

    } catch (error) {
        console.error('Error', error);
    }
}


const urlApiChuck: string = "https://api.chucknorris.io/jokes/random";

// this function call the Chuck API
const randomChuck = async () => {
    try {
        const res = await fetch(urlApiChuck);

        if (!res.ok) {
            throw new Error(`HTTP error!`);

        }
        const chuckData: ChuckData = await res.json();
        joke = chuckData.value;


        if (containerText) {
            containerText.innerHTML = `${joke}`;
            // joke = ramdomData.joke;
        }
        randomBg();

    } catch (error) {
        console.error('Error', error);
    }
}


const optionsWeather = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

// // this function call the Weather API
const weatherFetch = () => {
    let latitude: number;
    let longitude: number;
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
            })

    });
}


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
function getScore(joke: string, score: number): void {
    // remove the joke thats is equal to item.joke to not duplicate
    report = report.filter(item => item.joke !== joke);
    console.log(report);
    

    const date: string = new Date().toISOString();
    const scoredJoke: ReportAcudits = { joke, score, date };
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
        const date: string = new Date().toISOString();
        const notScoredJoke: ReportAcudits = { joke, date };

        report.push(notScoredJoke);
        randomFetch();

    } else {
        randomFetch();
    }
}


let numbers: number[] = [];
// this function changes the background
// first saves a randomNumber in a array
// remove and add class depending on the randomNumber 
const randomBg = () => {
    let randomSvg: number = Math.ceil(Math.random() * 9);
    let lastIndex = numbers.length -1;
    if(lastIndex >= 0 ) {
        const lastValue = numbers[lastIndex];
        // console.log(lastValue + " " + "ultimo valor");
        containerBg.classList.remove(`svg${lastValue}`);
        
    }
    numbers.push(randomSvg);
    // console.log(randomSvg);
    // console.log(numbers);
    containerBg.classList.add(`svg${randomSvg}`);
}

randomFetch();
weatherFetch();