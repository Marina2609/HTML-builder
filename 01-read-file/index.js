let fileSystem = require('fs'),
  
reader = fileSystem.createReadStream('01-read-file/text.txt');
  
reader.on('data', function (text) {
    console.log(text.toString());
});