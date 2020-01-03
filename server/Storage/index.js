var fs = require('fs'),
    path=require('path')


module.exports = {

    getProperties: function(req){
        console.log(req.query)
        let response = [];
        let response2 = [];
        let response3 = [];
        let flagCiudad = false
        let flagTipo = false
        let flagRango = false
        var datapath = __dirname + path.join('/data/data.json')
        return new Promise(function (resolve, reject){
            fs.readFile(datapath, 'utf8', function(err, readData){
                auxReadData = JSON.parse(readData)
                if(err) {reject(err)}
                else{
                if (Object.keys(req.query).length === 0) {
                    response = auxReadData;
                }
                
                if (typeof req.query.Min != 'undefined') {
                
                    auxReadData.filter(function (item) {
                        if (parseInt(item.Precio) >= parseInt(req.query.Min) &&
                            parseInt(item.Precio) <= parseInt(req.query.Max)) {
                            response.push(item);
                        }

                    });
                    auxReadData = response
                }

                if (typeof req.query.Ciudad != 'undefined') {
                    flagCiudad = true
                    console.log("Ciudad")
                    auxReadData.filter(function (item) {
                        if (item.Ciudad.toString() == req.query.Ciudad) {
                            response2.push(item);
                            }
                        
                        });
                        response = response2
                    }
                    
                    if (typeof req.query.Tipo != 'undefined') {
                        flagTipo = true
                        if (!flagCiudad) response2 = auxReadData
                        response2.filter(function (item) {
                            if (item.Tipo.toString() == req.query.Tipo) {
                                response3.push(item);
                            }
                        });
                        response = response3
                    }
                resolve(response)
                }
            })
        })
    },

    getCities: function () {
        var datapath = __dirname + path.join('/data/data.json')
        return new Promise(function (resolve, reject) {
            fs.readFile(datapath, 'utf8', function (err, readData) {
                if (err) reject(err)
                //console.log(JSON.parse(readData).map(it=>it.Ciudad))
                resolve((JSON.parse(readData).map(it => it.Ciudad).filter(function(value, index, self) {
                    return self.indexOf(value) === index;
                })))
            })
        })
    },

    getTypes: function () {
        var datapath = __dirname + path.join('/data/data.json')
        return new Promise(function (resolve, reject) {
            fs.readFile(datapath, 'utf8', function (err, readData) {
                if (err) reject(err)
                //console.log(JSON.parse(readData).map(it=>it.Ciudad))
                resolve((JSON.parse(readData).map(it => it.Tipo).filter(function (value, index, self) {
                    return self.indexOf(value) === index;
                })))
            })
        })
    }
}