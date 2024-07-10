#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printError, printHelp } from './services/log-service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage-service.js'
import { getWeather } from './services/api-service.js'

const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Token was saved');
    } catch (e) {
        printError(e.message);
    }
};

const getForcast = async () => {
    try{
    const weather = await getWeather(process.env.CITY);
    console.log(weather);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError('Invalid city');
        } else if(e?.response?.status === 401) {
            printError('Invalid token');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {
    }
    if (args.t) {
        return saveToken(args.t);
    }
};

initCLI();