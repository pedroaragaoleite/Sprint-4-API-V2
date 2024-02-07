const containerText = document.getElementById('container_text') as HTMLParagraphElement;
const btnNext = document.getElementById('btn_next') as HTMLButtonElement;


interface RandomJoke {
    id: string,
    joke: string,
    status: number
}


const urlApi: string = 'https://icanhazdadjoke.com';

const headers = new Headers();
headers.append('Accept', 'application/json');

//Fetch options
const fetchOptions: RequestInit = {
    method: 'GET',
    headers: headers,
};

var joke:string;

async function randomJoke() {
    try {
        const response = await fetch(urlApi, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const ramdomData: RandomJoke = await response.json();
        
        console.log(ramdomData.joke);
        
        if(containerText) {
            containerText.innerHTML = `${ramdomData.joke}`;
            joke = ramdomData.joke;
        }

        // const nextClickHandler = () => {
        //     report.push({ joke: ramdomData.joke, date: new Date().toISOString() });
        //     console.log(report);
        //     btnNext.removeEventListener('click', nextClickHandler);     
        // }
    
        // btnNext.addEventListener('click', nextClickHandler, { once: true }); 


    } catch (error) {
        console.error('Error', error);
    }
}



interface ChuckData {
    id: string,
    value: string
}

const urlApiChuck:string = "https://api.chucknorris.io/jokes/random";

const randomChuck = async() => {
    try {
        const res = await fetch(urlApiChuck);

        if(!res.ok) {
            throw new Error(`HTTP error!`);
            
        }
        const chuckData: ChuckData = await res.json();      
        joke = chuckData.value;

        
        if(containerText) {
            containerText.innerHTML = `${joke}`;
            // joke = ramdomData.joke;
        }

    }catch (error) {
        console.error('Error', error);
    }
}

const randomFetch = async () => {
    let result = Math.floor(Math.random() * 2);
    console.log(result);
    if(result === 0) {
        randomJoke();
        
    }  else {
        randomChuck();
    }
}



function getScore(id:any): void {
    report = report.filter(item => item.joke !== joke);

    const score:number = id;    
    const date: string = new Date().toISOString();
    const scoredJoke: ReportAcudits = { joke, score, date };

    report.push(scoredJoke);
    console.log(report);
    
}

interface ReportAcudits {
    joke: string,
    score?: number,
    date: string
}

let report: ReportAcudits[] = [];

// const saveJokes = (data: any) => {
//     console.log(data);
    
// }
function nextJoke() {
    
    const exist = report.some( item => item.joke === joke );
    console.log(exist);
    if(!exist) {
        console.log(report);
        const date: string = new Date().toISOString();
        const notScoredJoke: ReportAcudits = { joke, date };

        report.push(notScoredJoke);
        console.log(report);    
    } else {
        randomFetch();
    }
    
    
    
}
randomFetch();