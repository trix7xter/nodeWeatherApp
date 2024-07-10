#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printError, printHelp, printWeather } from './services/log-service.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage-service.js'
import { getWeather, getIcon } from './services/api-service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is empty');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token was saved');
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('City is empty');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('City was saved');
    } catch (e) {
        printError(e.message);
    }
};

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Invalid city');
        } else if (e?.response?.status === 401) {
            printError('Invalid token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
};

initCLI();