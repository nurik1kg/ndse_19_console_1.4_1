#!/usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');
const {hideBin } = require('yargs/helpers');
const readline = require('node:readline');

const max = 2;
const min = 1;

const argv = yargs(hideBin(process.argv)).argv;
const fileName = argv._[0];

if (fileName == undefined) {
    console.log('Не указано имя файла для логирования результатов');
    process.exit(0);
}

fs.open(fileName, 'w', (err) => {
    if (err) {
        console.error('Ошибка - файл не создан');
    }
});

const writerStream = fs.createWriteStream(fileName);

console.log('«Орёл или решка» Загадано случайное число (1 или 2).');
console.log('Для выхода введите - exit');

const input = readline.createInterface( process.stdin );

input.on('line', (data) => {
    if (data == "exit") {
        process.exit(0);
    }
    check(data);
})

function randomNumber() {
    const number = Math.round(Math.random() * (max - min)) + min;
    return number;
}

function check(number) {
    const rNumber = randomNumber();
    let result = number == rNumber;
    result ? console.log("Угадал") : console.log("Не угадал");

    const content = {
        "datetime": new Date(),
        "result": result ? "Выигрыш" : "Проигрыш",
        "Загаданное число": rNumber,
        "Ответ": number 
    };

    writerStream.write(JSON.stringify(content) + '\n', 'UTF8');
}