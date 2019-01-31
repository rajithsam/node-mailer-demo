"use strict";

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var hbs = require('express-handlebars');

var routes = require('./routes');

var app = express();
    app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'index', layoutsDir: __dirname + '/views/'}));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', routes);

module.exports = app;