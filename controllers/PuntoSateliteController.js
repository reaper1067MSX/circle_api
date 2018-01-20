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

exports.deleteById = function(req, res){

        const body = req.params.id;
    
        if(req.params !== "" || req.params!==undefined){
    
            const conexion = conexionbd.getConexion(models, 'Children');    
            const { PuntoSatelite, sequelize }  = conexion;
    
            return sequelize.transaction(function (t) {
    
                return PuntoSatelite.update({    
                    estado: 'I',
                    },{ 
                        where: {id: req.params.id}
                    }, {transaction: t})
    
            }).then(function () {
                return res.status(200).json({msg: 'PuntoSatelite #:'+req.params.id+" eliminado con exito"})
            }).catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
    
        }else{
            return res.status(400).json({ msg: 'Request inválido' });
    }
}
    

exports.create = function(req, res){
    console.log('ENTRO POST')
    const body = req.body;

    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { PuntoSatelite, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return PuntoSatelite.create({

                id: body.codigo,
                localidad: body.localidad,
                nombre: body.nombre,
                tipo: body.option_tipo_sel,
                longitud: body.longitud,
                latitud: body.latitud,
                telefono: body.telefono,
                capacidad: body.capacidad,
                estado: body.options_estado_sel,
                fecha_registro: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                direccion: body.direccion,
                responsable: body.responsable,
 
            })
            console.log('ENTRO POST')
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


exports.update = function(req, res){
    const body = req.body;

    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { PuntoSatelite, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return PuntoSatelite.update({
                //id: body.codigo,
                localidad: body.localidad,
                nombre: body.nombre,
                tipo: body.option_tipo_sel,
                longitud: body.longitud,
                latitud: body.latitud,
                telefono: body.telefono,
                capacidad: body.capacidad,
                estado: body.options_estado_sel,
                fecha_registro: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                direccion: body.direccion,
                responsable: body.responsable,
            },{ 
                where: {id: body.codigo}
            }, {transaction: t})


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

exports.getById = function(req, res){

    let params = req.query;
    console.log(req.params)
    if(params){
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { PuntoSatelite }  = conexion;

        var fecha = "";
        var fecha2 = "";

        PuntoSatelite.findOne({where:{id: req.params.id} })
        .then((puntosatelite) =>{
                
                fecha2 = (puntosatelite.dataValues.fecha_registro)? new Date(puntosatelite.dataValues.fecha_registro).toISOString().substring(0,10): undefined;
                puntosatelite.dataValues.fecha_registro = formats.convertirFecha(fecha2, 'yyyy-mm-dd', 'dd/mm/yyyy');
                
                puntosatelite.dataValues.nombre = (puntosatelite.dataValues.nombre)?puntosatelite.dataValues.nombre:'';
            return res.status(200).json(puntosatelite)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}

