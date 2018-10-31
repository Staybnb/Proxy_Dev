const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4001;

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

app.get('/description', (req, res) => {
  axios.get(`http://localhost:4000${req.url}`)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      console.log(err);
      res.send();
  });
});


app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.listen(port, function() {
  console.log(`server running at: http://localhost:${port}`);
});