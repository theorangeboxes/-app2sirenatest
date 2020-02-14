const bodyParser = require('body-parser');
const Axios = require('axios');
const cron = require('node-cron');
const express = require('express');



const operations = require('./components/operations');


operations.deleteAllMovies();
operations.insertMovies();
//operations.movieListSort();



cron.schedule("*/1 * * * *", () => {
    let d = new Date();
   console.log('************** Every Minute update viwers ************** ');
   operations.updateMovieViewer();
   
   //operations.movieListSort();
})

cron.schedule("*/10 * * * *", () => {
    console.log('************** Every 10 Minute update viwers ************** ');
    //operations.deleteAllMovies();
    operations.movieListSort();
    

 })

 cron.schedule("*/30 * * * *", () => {
    console.log('************** Every 30 Minute update viwers ************** ');
    operations.deleteAllMovies();
    operations.insertMovies();
   
 })

const app = express()

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000)

