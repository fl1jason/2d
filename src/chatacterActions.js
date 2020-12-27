//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const char_name = 'gatsby';

const CharacterActions = (char_name) => {

    let regex = '[^([1-9)]*';
    let actions = [];

    //joining path of directory 
    const directoryPath = path.join(__dirname, 'src/' + char_name);

    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        let lastAction = '';
        
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file); 

            let thisAction = file.search(regex);
            if (thisAction !== lastAction){
                actions.push(thisAction);
                lastAction = thisAction;
            }
        });
    });

    return (actions);
}

export { CharacterActions }