const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const gen_fechas = require('../utils/gen_fechas');


exports.getAll = function(req, res){
    let parametros = req.query;

    if (parametros){

        var param_query = {};

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Beneficiario }  = conexion;

        campos = [['cedula', 'Codigo'], ['nombre', 'Nombre'], ['apellido', 'Apellido'],
                 ['fecha_nac', 'Edad'], ['estado', 'Estado']];

        if(req.query.estado){
            param_query = {estado: 'A'}
        }

        Beneficiario.findAll({attributes: campos, where: param_query  })
        .then((beneficiario) => {
            
            beneficiario.forEach((DATA)=> {
                var edad, anio , actual, anio_actual;
                edad =  (DATA.dataValues.Edad)? new Date(DATA.dataValues.Edad).toISOString().substring(0,4): undefined;
                actual = new Date(gen_fechas.gen_FechaSistema()).toISOString().substring(0,4)
                DATA.dataValues.Edad = parseInt(actual) - parseInt(edad);
            });

            return res.status(200).json(beneficiario);
        })        
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}