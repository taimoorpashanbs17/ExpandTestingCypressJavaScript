// const { resolve, reject } = require("cypress/types/bluebird");
var unirest = require("unirest");

// function getAllNoteIDs() {
//   let notes_ids = [];
//   unirest
//     .get("https://practice.expandtesting.com/notes/api/notes")
//     .headers({
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "x-auth-token":
//         "5ac49ca481b643e1a4007f7ed2c3559afc30467a16ff42889169ae1aadcd218a",
//     })
//     .then((response) => {
//       let results = response.body.data;
//       for (let i of results) {
//         notes_ids.push(i.id);
//       }
//       console.log("This is Test")
//       return notes_ids;
//     });
// }

return new Promise((resolve, reject) => {
    let notes_ids = [];
    unirest
    .get("https://practice.expandtesting.com/notes/api/notes")
    .headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-auth-token":
        "5ac49ca481b643e1a4007f7ed2c3559afc30467a16ff42889169ae1aadcd218a",
    })
        .then(function (response) {
            if(!response.error) {
                resolve(response)
            } else {
                reject(response)
            }
        })
        return notes_ids
 });
    

console.log(getAllNoteIDs())
