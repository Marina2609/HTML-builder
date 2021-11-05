const fileSystem = require('fs');
const readline = require('readline');

console.log("What is your name? ");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
fileSystem.writeFile('02-write-file/text.txt', '', error => {
    if (error) {
        console.log("Error occured when writing to file");
    }
});

rl.on('line', name => {
    console.log("What is your name? ");
    if (name === 'exit') {
        console.log(`Goodbye, ${name}.`);
        process.exit(0);
    }

    fileSystem.appendFile('02-write-file/text.txt', `Hello, ${name}!\n`, error => {
        if (error) {
            console.log("Error occured when writing to file");
        }
    });
}).on('close', () => {
    console.log("Goodbye :)");
    rl.close();
});