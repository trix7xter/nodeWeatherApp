import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
    console.log(chalk.bgRed('ERROR') + ' ' + error);
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen('SUCCESS') + ' ' + message);
}

const printHelp = () => {
    console.log(
        dedent`
    ${chalk.bgCyan('HELP')}
    without params - get weather\n
    -s [CITY] - get weather for city\n
    -h - show this help\n
    -t [API_KEY] - set token\n
    `
    );
}

const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgBlue('WEATHER')}
        In city ${res.name}
        ${icon}  ${res.weather[0].description}
        ${res.main.temp}°C  feels like ${res.main.feels_like}°C
        humidity ${res.main.humidity}%
        wind speed ${res.wind.speed} m/s
        `);
}
export { printError, printSuccess, printHelp };