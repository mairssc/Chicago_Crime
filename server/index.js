//Running home.html and favorite.html via port
//Ex: http://localhost:8080/home.html will run home.html

const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.js');


const dataCrime = data.dataCrime()
const dataWard = data.dataWard()
const items = data.analysis(dataWard, dataCrime)

wardColDic = items[0]
wardDemoDic = items[1]
crimeColDic = items[2]
wardCrimeDic = items[3]
sortedWardCount = items[4]

// const mongoose = require('mongoose');
// const { response } = require('express');
// const url = 'mongodb://127.0.0.1:27017/node-mongo-hw' // change this as needed

// mongoose.connect(url, { useNewUrlParser: true })

// const db = mongoose.connection
// db.once('open', _ => {
//   console.log('Database connected:', url)
// })

// db.on('error', err => {
//   console.error('connection error:', err)
// })

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;

//This is where we run CLIENTNNSNSNSNSNSN
app.use(express.static('../client'))


app.get("/get/sortedWardCount", (req, res) => {
    console.log('made it!!');
    console.log(sortedWardCount);

    res.send(items);
});

app.listen(port);
console.log('Server listening on port ' + port);