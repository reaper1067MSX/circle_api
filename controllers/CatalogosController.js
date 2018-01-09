const models = require('../models/');
const conexionbd = require('../utils/conexionbd');

exports.getAll = function(req, res){

    let parametros = req.query;

    if(parametros){

        var param_query = {};
        var campos;

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Catalogos }  = conexion;

        if(parametros.tabla && parametros.estado){
            campos = [ ['codigo', 'Codigo'], ['descripcion', 'Descripcion'] ];
            param_query = {$and:[{tabla: parametros.tabla }, {estado:'A'}]};
        }

        Catalogos.findAll({attributes: campos, where: param_query  })
        .then((catalogos) => {
            return res.status(200).json(catalogos);
        })        
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}