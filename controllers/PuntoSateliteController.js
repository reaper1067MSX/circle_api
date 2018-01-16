const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const gen_fechas = require('../utils/gen_fechas');
const formats = require('../utils/formats');

exports.getAll = function(req, res){

    let parametros = req.query;

    if (parametros){
        var param_query = {};
        var campos
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { PuntoSatelite }  = conexion;

        console.log('PARAMS: ', req.query)

        if(req.query.estado){
            param_query = {estado: {$in: [req.query.estado[0],req.query.estado[1]]}}
            campos = [['id', 'Codigo'], ['nombre', 'Nombre'],['direccion', 'Direccion'],
                     ['longitud', 'Longitud'],['latitud', 'Latitud'], ['estado', 'Estado'], 
                     ['tipo', 'Tipo'], ['capacidad', 'Capacidad'],['responsable', 'Responsable']];
        }

        PuntoSatelite.findAll({attributes: campos, where: param_query  })
            .then((puntosatelite) => {
                return res.status(200).json(puntosatelite);
            })        
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
    
        }else{
            return res.status(400).json({ msg: 'Request inválido' });
        }
    }

