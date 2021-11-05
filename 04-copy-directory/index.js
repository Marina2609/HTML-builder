const fileSystem = require('fs');
const path = require('path');
const source = path.join(__dirname, 'files');

fileSystem.readdir(source, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error);
    }
    fileSystem.mkdir('04-copy-directory/files-copy', {recursive: true}, error => {
        if (error) {
            console.log(error);
        }
    });
    
    const destination = path.join(__dirname, 'files-copy');

    for (let file of files) {
        fileSystem.readFile(`${source}/${file.name}`, (error, data) => {
            if (error) {
                console.log(error);
            }
            fileSystem.writeFile(`${destination}/${file.name}`, data, error => {
                if (error) {
                    console.log(error);
                }
                console.log(`File ${file.name} recorded`);
            });
        });
    }
});