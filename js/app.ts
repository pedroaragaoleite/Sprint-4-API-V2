const containerText = document.getElementById('container_text') as HTMLParagraphElement;
const btnNext = document.getElementById('btn_next') as HTMLButtonElement;


const btn1 = document.getElementById('btn_score1') as HTMLButtonElement;
const btn2 = document.getElementById('btn_score2') as HTMLButtonElement;
const btn3 = document.getElementById('btn_score3') as HTMLButtonElement;



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
    console.log(result);
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

    } catch (error) {
        console.error('Error', error);
    }
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
    console.log(exist);
    if (!exist) {
        console.log(report);
        const date: string = new Date().toISOString();
        const notScoredJoke: ReportAcudits = { joke, date };

        report.push(notScoredJoke);
        randomFetch();
        console.log(report);
    } else {
        randomFetch();
    }
}

randomFetch();