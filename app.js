var express = require('express'),
    app = express(),
    load = require('express-load'),
    server = require('http').createServer(app),
    fs = require('fs'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    multiparty = require('multiparty'),
    async = require('async'),
    mercadopago = require('mercadopago');

// set port
server.listen(5000, function(){

    console.log("------------------------");
    console.log("Server is running...");
    console.log("------------------------");
    
});

//set diretorio de view
app.set('views', __dirname + '/views');

//seta o tipo de view
app.set('view engine', 'ejs');

//seta statica publica
app.use(express.static(__dirname + '/public'));


//Setta os modulos em app para uso
app.use(cookieParser());
app.use(session({keys: ["cockpit"]}));
app.use(bodyParser());

//multiparty for upload file
app.multiparty = multiparty;

//async
app.async = async;

//use moment in app
app.moment = moment;

app.mercadopago = mercadopago;

load('models')
    .then('controllers')
    .then('routes')
    .then('helpers')
    .into(app);



