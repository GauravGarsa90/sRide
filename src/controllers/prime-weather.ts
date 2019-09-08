import { writeAuditLogs } from '../utils/audit-logs';
const fetch = require('node-fetch');
export const primeWeather = async (req, res) => {
    const date = new Date();
    if(isPrime(date.getDate())){
        const weather = await getWeatherInfo();
        writeAuditLogs({
            time: date,
            response: JSON.stringify(weather),
            prime: 1
        });
        res.end(weather);
    }else{
        writeAuditLogs({
            time: date,
            response: "Date is not prime so no date",
            prime: 0
        });
        res.end("Date is not prime so no date");
    }
}

const isPrime = (n: number): boolean => {
    for(var i=2;i<n;i++){
        if(n%i==0){
            return false;
        }
    }
    return true;
}

const getWeatherInfo = async(): Promise<Object> => {
    try {
        const url = "https://samples.openweathermap.org/data/2.5/weather?q=Pune&appid=acf41d7e41e060bdbc54ccc4cc1f724f";
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
}