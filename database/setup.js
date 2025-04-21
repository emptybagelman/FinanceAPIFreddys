require("dotenv").config();
const fs = require("fs");
const db = require("./connect");

const sql = fs.readFileSync(__dirname + "/data.sql").toString();

db.query(sql)
// console.log('line 9 setup')
    .then(data => {
        db.end();
        console.log("Setup complete.");
    })
    .catch(error => console.log(error));
