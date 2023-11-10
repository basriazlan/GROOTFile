const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

//BUTTON
var btnAppend = document.getElementById('btnCreate'); 
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');

let pathName = path.join(__dirname, 'Files');


// CREATE BUTTON
btnCreate.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);
  let contents = fileContents.value;

// APPEND TO FILE
  if (fs.existsSync(file)) {
    contents = '\n' + contents; 
    fs.appendFile(file, contents, function (err) {
      if (err) {
        return console.log(err);
      }
      var txtfile = document.getElementById('fileName').value;
      alert(txtfile + ' Word of The Day has been added! ');
      console.log('Word of The Day has been added!');
    });
  } else {
    alert('File does not exist.');
}
});