const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const PORT = 8003;

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.engine('hbs',handlebars.engine({extname: 'hbs'}));
app.set("view engine","hbs");
app.set("views","./views");

app.listen(PORT);


app.get('/', function(req,res) {
    res.redirect('/home.html');
});

app.get('/home.html', function(req,res) {
    res.sendFile("/home.html");
});

app.post('/make-post', function(req,res) {
    console.log(req.body);
});