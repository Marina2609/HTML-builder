const fileSystem = require('fs');
const path = require('path');

const index = path.join(__dirname, 'project-dist/index.html');

const folderStyles = path.join(__dirname, 'styles');
const styles = path.join(__dirname, 'project-dist/style.css');

const sourceFonts = path.join(__dirname, 'assets/fonts');
const sourceImage = path.join(__dirname, 'assets/img');
const sourceSvg = path.join(__dirname, 'assets/svg');

//Заменяет шаблонные теги
fileSystem.createReadStream('06-build-page/template.html', 'utf8').pipe(fileSystem.createWriteStream('06-build-page/project-dist/index.html'));

fileSystem.readFile(index, 'utf8', (error, data) => {
    if (error) {
        console.log(error);
    }
    fileSystem.readFile('06-build-page/components/header.html', 'utf8', (error, data1) => {
        data = data.replace('{{header}}', data1);
        fileSystem.writeFile(index, data, 'utf8', error => {
            if (error) {
                console.log(error);
            }
        });
        fileSystem.readFile('06-build-page/components/articles.html', 'utf8', (error, data2) => {
            data = data.replace('{{articles}}', data2);
            fileSystem.writeFile(index, data, 'utf8', error => {
                if (error) {
                    console.log(error);
                }
            });
            fileSystem.readFile('06-build-page/components/footer.html', 'utf8', (error, data3) => {
                data = data.replace('{{footer}}', data3);
                fileSystem.writeFile(index, data, 'utf8', error => {
                    if (error) {
                        console.log(error);
                    }
                });
            });
        });
    });
});

//Собирает в единый файл стили из папки styles
fileSystem.writeFile(styles, '', error => {
    if (error) {
        console.log("Error occured when writing to file");
    }
});

fileSystem.readdir(folderStyles, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error);
    }
    for (let file of files) {
        if (path.extname(file.name) === '.css') {
            fileSystem.readFile(`${folderStyles}/${file.name}`, (error, data) => {
                if (error) {
                    console.log(error);
                } else {
                    fileSystem.appendFile(styles, data, error => {
                        if (error) {
                            console.log(error);
                        }
                        console.log(`File ${file.name} is written to style.css`);
                    });
                }
            });
        }
    }
});

//Копирование fonts в папку project-dist
fileSystem.readdir(sourceFonts, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error);
    }

    fileSystem.mkdir('06-build-page/project-dist/assets/fonts', {recursive: true}, error => {
        if (error) {
            console.log(error);
        }
    });
    
    const destinationFonts = path.join(__dirname, 'project-dist/assets/fonts');

    for (let file of files) {
        fileSystem.readFile(`${sourceFonts}/${file.name}`, (error, data) => {
            if (error) {
                console.log(error);
            }
            fileSystem.writeFile(`${destinationFonts}/${file.name}`, data, error => {
                if (error) {
                    console.log(error);
                }
                console.log(`File ${file.name} recorded`);
            });
        });
    }
});

//Копирование img в папку project-dist
fileSystem.readdir(sourceImage, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error);
    }

    fileSystem.mkdir('06-build-page/project-dist/assets/img', {recursive: true}, error => {
        if (error) {
            console.log(error);
        }
    });
    
    const destinationImage = path.join(__dirname, 'project-dist/assets/img');

    for (let file of files) {
        fileSystem.readFile(`${sourceImage}/${file.name}`, (error, data) => {
            if (error) {
                console.log(error);
            }
            fileSystem.writeFile(`${destinationImage}/${file.name}`, data, error => {
                if (error) {
                    console.log(error);
                }
                console.log(`File ${file.name} recorded`);
            });
        });
    }
});

//Копирование svg в папку project-dist
fileSystem.readdir(sourceSvg, {withFileTypes: true}, (error, files) => {
    if (error) {
        console.log(error);
    }

    fileSystem.mkdir('06-build-page/project-dist/assets/svg', {recursive: true}, error => {
        if (error) {
            console.log(error);
        }
    });
    
    const destinationFonts = path.join(__dirname, 'project-dist/assets/svg');

    for (let file of files) {
        fileSystem.readFile(`${sourceSvg}/${file.name}`, (error, data) => {
            if (error) {
                console.log(error);
            }
            fileSystem.writeFile(`${destinationFonts}/${file.name}`, data, error => {
                if (error) {
                    console.log(error);
                }
                console.log(`File ${file.name} recorded`);
            });
        });
    }
});