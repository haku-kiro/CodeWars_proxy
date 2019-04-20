'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const router = express.Router();
router.get('/', cors(), (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));

router.get('/thing', cors(), (req, res, next) => {
  res.send({ name: 'Michael', surname: 'Da Costa' });
});

router.get('/codewars', cors(), (req, res, next) => {
  var that = res;

  axios
    .get('https://www.codewars.com/api/v1/users/haku_kiro')
    .then(response => {
      that.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
