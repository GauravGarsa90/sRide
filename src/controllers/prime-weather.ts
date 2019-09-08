// import * as request from 'request';
const fetch = require('node-fetch');
export const primeWeather = async (req, res) => {
    try {
        const url = "https://samples.openweathermap.org/data/2.5/weather?q=Pune&appid=acf41d7e41e060bdbc54ccc4cc1f724f";
        const response = await fetch(url);
        const json = await response.json();
        console.log(json)
        res.end(JSON.stringify(json));
    } catch (error) {
        console.error(error);
    }

}