/* 
All JSON operations will be done over here,
means creating, updating or deleting any JSON file.
*/

var fs = require('fs');

function createJSONFile(fileName) {
  /* 
JSON File creation should be done over here, only JSON file name should be provided.
As, .json at the end will be embeded. 
Also json files will be created at 'cypress/fixtures' folder only.
*/
  const file = "cypress/fixtures/" + fileName + ".json";
  if (fs.existsSync(file) == false) {
    fs.createWriteStream(file, {
      flags: "a",
    });
  }
}

function updateJSONFile(fileName, propertyName, propertyValue) {
  /* 
Update any created JSON file by using fileName, propertyName and propertyValue parameters.
Need to provide filename only as .json at the end will be embeded. 
Also json files will be created at 'cypress/fixtures' folder only.
*/
  const file = "cypress/fixtures/" + fileName + ".json";
  const fileData = fs.readFileSync(file, "utf8");
  const jsonData = JSON.parse(fileData);
  jsonData[propertyName] = propertyValue;
  fs.writeFileSync(file, JSON.stringify(jsonData));
}

module.exports = { createJSONFile, updateJSONFile };
