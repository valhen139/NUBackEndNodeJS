/*
* Dependencias
*/

var http = require('http')
var express = require('express')
var Storage = require('./Storage')


var port = 8082
var app = express()

app.use(express.static('public'))


var Server = http.createServer(app)

app.get("/API/properties", (req, res) => {
    Storage.getProperties(req)
        .then(function (properties){
            res.json(properties)
    }).catch(function(error){
        res.sendStatus(500).json(error)
    })
});

app.get("/API/cities", (req, res) => {
    Storage.getCities()
        .then(function (properties) {
            res.json(properties)
        }).catch(function (error) {
            res.sendStatus(500).json(error)
        })
});

app.get("/API/types", (req, res) => {
    Storage.getTypes()
        .then(function (properties) {
            res.json(properties)
        }).catch(function (error) {
            res.sendStatus(500).json(error)
        })
});

Server.listen(port, function () {
    console.log('Buscador on port: '+port)
})
