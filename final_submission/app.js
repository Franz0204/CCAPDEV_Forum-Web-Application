const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname,'public')));

app.listen(8003);


app.get('/', function(req,res) {
    res.redirect('/home.html');
})

app.get('/home.html', function(req,res) {
    res.sendFile("/home.html");
})