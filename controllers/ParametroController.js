const models = require('../models/');
const conexionbd = require('../utils/conexionbd');

exports.getAll = function(req, res){

    let parametros = req.query;

    if (parametros){
        var param_query = {};

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Parametros }  = conexion;

        campos = [['id', 'Codigo'], ['descripcion', 'Descripcion'], 
                 ['tipo', 'Tipo'], ['fecha_creacion', 'Fecha'], ['estado', 'Estado']];

        if(req.query.estado){
            param_query = {estado: 'A'}
        }

        Parametros.findAll({attributes: campos, where: param_query  })
        .then((parametros) => {
            return res.status(200).json(parametros);
        })        
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}