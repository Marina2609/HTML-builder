const fileSystem = require('fs');
const path = require('path');

const folder = path.join(__dirname, 'styles');
//const folder = path.join(__dirname, 'test-files/styles');
const bundle = path.join(__dirname, 'project-dist/bundle.css');

fileSystem.writeFile(bundle, '', error => {
    if (error) {
        console.log("Error occured when writing to file");
    }
});

fileSystem.readdir(folder, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error);
    }
    for (let file of files) {
        if (path.extname(file.name) === '.css') {
            fileSystem.readFile(`${folder}/${file.name}`, (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    fileSystem.appendFile(bundle, data, error => {
                        if (error) {
                            console.log(error);
                        }
                        console.log(`File ${file.name} is written to bundle.css`);
                    });
                }
            });
        }
    }
});