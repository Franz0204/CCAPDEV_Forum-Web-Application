const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

app.listen(8003);


app.get('/', function(req,res) {
    res.redirect('/home.html');
});

app.get('/home.html', function(req,res) {
    res.sendFile("/home.html");
});

app.post('/home.html', function(req,res) {
    res.send('debug');
    console.log('debug');
});