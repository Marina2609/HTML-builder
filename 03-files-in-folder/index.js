const fileSystem = require('fs');
const path = require('path');

let files = path.join(__dirname, 'secret-folder');

fileSystem.readdir(files, (error, file) => {
    if (error) {
        console.log(error);
    }
    
    let result = '';
   
    for (let i = 0; i < file.length; i++){
        fileSystem.stat(files + "/" + file[i], (error, stats) => {
            if (error) {
                console.log(error);
            }
            if (stats.isFile()) {
                result = file[i].replace(".", " - ") + " - " + Math.ceil(stats.size / 1024) + " kb";         
                console.log(result);
            }
        });
    }
});