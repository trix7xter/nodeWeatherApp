import https from 'https';
import { getKeyValue, TOKEN_DICTIONARY } from "./storage-service";
import axios from 'axios';

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    if(!token) {
        throw new Error('Token not found, send token with -t [API_KEY]');
    }

    const {} = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
            q: city,
            appid: token,
            lang: 'ru',
            units: 'metric'
        }
    });


}