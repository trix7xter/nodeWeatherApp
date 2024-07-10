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

export { printError, printSuccess, printHelp };