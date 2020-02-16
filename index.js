const bodyParser = require('body-parser');
const Axios = require('axios');
const cron = require('node-cron');
const express = require('express');
const operations = require('./components/operations');

require('dotenv').config({ path: 'variables.env' });

operations.deleteAllMovies();
operations.insertMovies();

cron.schedule('*/1 * * * *', () => {
  console.log('************** Every Minute update viwers ************** ');
  operations.updateMovieViewer();
});

cron.schedule('*/10 * * * *', () => {
  console.log('************** Every 10 Minute update viwers ************** ');

  operations.movieListSort();
});

cron.schedule('*/30 * * * *', () => {
  console.log('************** Every 30 Minute update viwers ************** ');
  let fecha = new Date();
  let isWeekend = fecha.getDay() % 6 == 0;
  if (!isWeekend) {
    operations.deleteAllMovies();
    operations.insertMovies();
  } else {
    console.log('Es fin de semana!! >> NO ELIMINAR NADA');
  }
});

const app = express();

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 6000;

app.listen(port, host, () => {
  console.log('el servidor esta funcionando');
});
