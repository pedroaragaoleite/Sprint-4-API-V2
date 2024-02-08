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

const randomFetch = async () => {
    let result = Math.floor(Math.random() * 2);
    // console.log(result);
    if (result === 0) {
        randomJoke();

    } else {
        randomChuck();
    }
}


async function randomJoke() {
    try {
        const response = await fetch(urlApi, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const ramdomData: RandomJoke = await response.json();

        console.log(ramdomData.joke);

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
        'X-RapidAPI-Key': '79bb27e588msh814253e73cb0541p16ba2bjsn43e56fa34d0b',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

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

function getScore(joke: string, score: number): void {
    report = report.filter(item => item.joke !== joke);

    const date: string = new Date().toISOString();
    const scoredJoke: ReportAcudits = { joke, score, date };

    report.push(scoredJoke);
    console.log(report);
}




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

const randomBg = () => {
    let randomSvg: number = Math.ceil(Math.random() * 9);
    let lastIndex = numbers.length -1;
    if(lastIndex >= 0 ) {
        const lastValue = numbers[lastIndex];
        console.log(lastValue + " " + "ultimo valor");
        containerBg.classList.remove(`svg${lastValue}`);
        
    }
    numbers.push(randomSvg);
    console.log(randomSvg);
    // console.log(numbers);
    containerBg.classList.add(`svg${randomSvg}`);
}

randomFetch();
weatherFetch();