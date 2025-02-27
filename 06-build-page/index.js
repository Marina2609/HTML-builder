const fileSystem = require('fs');
const promises = fileSystem.promises;
const path = require('path');

const folderStyles = path.join(__dirname, 'styles');
const styles = path.join(__dirname, 'project-dist/style.css');

const sourceFonts = path.join(__dirname, 'assets/fonts');
const sourceImage = path.join(__dirname, 'assets/img');
const sourceSvg = path.join(__dirname, 'assets/svg');

const components = path.join(__dirname, 'components');

fileSystem.mkdir('06-build-page/project-dist', {recursive: true}, error => {
    if (error) {
        console.log(error);
    }
});
    
//Заменяет шаблонные теги

setTimeout(function () {
    const inp = fileSystem.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
    const out = fileSystem.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
    
    let element = '';
    
    inp.on('data', data => {
        element = data.toString();

        function map(el) {
            return `{{${el}}}`;
        }
        fileSystem.readdir(components, { withFileTypes: true }, (error, data) => {
                if (error) {
                    console.log(error);
                }

                const array = [];

                data.forEach(arr => {
                    const fName = arr.name.match(/([\w]*\.)*/)[0].replace('.', '');
                    
                    array.push(map(fName));
                });

                promises.readdir(path.join(__dirname, 'components')).then(res => {
                    res.forEach((component, ind) => {
                        const readableStream = fileSystem.createReadStream(path.join(__dirname, 'components', component), 'utf-8');
                        
                        readableStream.on('data', data => {
                            element = element.replace(array[ind], data);

                            if (!array.find(arr => element.includes(arr))) {
                                out.write(element);
                            }
                        });
                    });
                });
            }
        );
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
}, 0);