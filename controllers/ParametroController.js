const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');

exports.getAll = function(req, res){

    let parametros = req.query;

    if (parametros){
        var param_query = {};
        var campos
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Parametros }  = conexion;

        

        if(req.query.estado){
            param_query = {estado: 'A'}
            campos = [['id', 'Codigo'], ['descripcion', 'Descripcion'], 
                 ['tipo', 'Tipo'], ['fecha_creacion', 'Fecha'], ['estado', 'Estado']];
        }

        if(req.query.tipo){
            param_query = {$and:[{tipo: parametros.tipo} ,{estado: 'A'} ]};
            campos = [['id', 'Codigo'], ['descripcion', 'Descripcion']];
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

exports.create = function(req, res){
    const body = req.body;

    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Parametros, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Parametros.create({
                id: body.codigo,
                descripcion: body.descripcion,
                tipo: body.options_tipo_sel,
                fecha_creacion: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                estado: body.options_estado_sel,
                dependencia: (body.options_depen!==null || body.options_depen!==undefined?body.options_depen:null)
            })

        }).then(function () {
            return res.status(200).json({msg: 'Proceso OK'})
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}