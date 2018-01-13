const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');

exports.getAll = function(req, res){

    let parametros = req.query;

    if (parametros){
        var param_query = {};
        var campos;
        
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Club }  = conexion;

        if(req.query.estado){
            param_query = {estado: 'A'}
            campos = [['id', 'Codigo'], ['fecha_creacion', 'Fecha'], ['nombre', 'Nombre'], 
            ['estado', 'Estado'], ['objetivo_Estrategico', 'Objetivo'], ['programa', 'Programa'],
            ['observacion', 'Observacion'] ];
        }

        Club.findAll({attributes: campos, where: param_query  })
        .then((club) => {
            var fecha_creacion;

            club.forEach((club) => {
                fecha_creacion = (club.dataValues.Fecha)? new Date(club.dataValues.Fecha).toISOString().substring(0,10): undefined;
                club.dataValues.Fecha = formats.convertirFecha(fecha_creacion, 'yyyy-mm-dd', 'dd/mm/yyyy');
            });
            
            return res.status(200).json(club);
        })        
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}