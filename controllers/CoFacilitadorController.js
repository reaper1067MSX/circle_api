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
        const { Co_Facilitador }  = conexion;

        console.log('PARAMS: ', req.query)

        if(parametros.cadena_busq=== undefined){

        if(req.query.estado){
            param_query = {estado: {$in: [req.query.estado[0],req.query.estado[1]]}}
            campos = [['cedula', 'Codigo'], ['nombre', 'Nombre'], ['apellido', 'Apellido'],
                 ['fecha_nacimiento', 'Edad'], ['estado', 'Estado'], ['observaciones', 'Observacion'],
                 ['motivo', 'Motivo']];
        }

            Co_Facilitador.findAll({attributes: campos, where: param_query  })
            .then((cofacilitadores) => {
                
                cofacilitadores.forEach((DATA)=> {
                    var edad, anio , actual;
                    console.log('Fecha NAC:',DATA.dataValues.Edad)
                    edad =  (DATA.dataValues.Edad)? new Date(DATA.dataValues.Edad).toISOString().substring(0,4): undefined;
                    actual = new Date(gen_fechas.gen_FechaSistema()).toISOString().substring(0,4)
                    DATA.dataValues.Edad = parseInt(actual) - parseInt(edad);
                });
                

            return res.status(200).json(cofacilitadores);
        })        
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
                
        param_query.$or = [ {cedula: {$like: `%${parametros.cadena_busq}%`}}, { apellido: {$like: `%${parametros.cadena_busq}%`}}];
        campos = [['cedula', 'Codigo'], ['apellido', 'Descripcion']];    
        nrocampos = 20; 

        Co_Facilitador.findAll({attributes: campos, where: param_query, limit: nrocampos})
        .then((cofacilitadores) => res.status(200).json(cofacilitadores))
        .catch((err) =>{
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        }); 
    }


    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}


exports.deleteById = function(req, res){

    const parametro = req.params.id;

    if(parametro){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Co_Facilitador, sequelize }  = conexion;

        return sequelize.transaction(function (t) {

            return Co_Facilitador.update({    
                estado: 'D',
                },{ 
                    where: {cedula: req.params.id}
                }, {transaction: t})

        }).then(function () {
            return res.status(200).json({msg: 'Co_Facilitador #:'+req.params.id+" eliminado con exito"})
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
        const { Co_Facilitador, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Co_Facilitador.create({

                cedula: body.cedula,
                cod_apadrinado: body.codigo,
                localidad: body.localidad,
                nombre: body.nombres,
                apellido: body.apellidos,
                fecha_nacimiento: formats.convertirFecha(body.fecha_nacimiento, "dd/mm/yyyy", "yyyy-mm-dd") ,
                estado: body.options_estado_sel,
                observaciones: body.observacion,
                motivo: body.motivo,
                fecha_inscripcion: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                
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
        const { Co_Facilitador, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Co_Facilitador.update({
                //cedula: body.cedula,
                cod_apadrinado: body.codigo,
                localidad: body.localidad,
                nombre: body.nombres,
                apellido: body.apellidos,
                fecha_nacimiento: formats.convertirFecha(body.fecha_nacimiento, "dd/mm/yyyy", "yyyy-mm-dd") ,
                estado: body.options_estado_sel,
                observaciones: body.observacion,
                motivo: body.motivo,
                fecha_inscripcion: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                
                },{ 
                    where: {cedula: body.cedula}
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
        const { Co_Facilitador }  = conexion;

        var fecha = "";
        var fecha2 = "";

        Co_Facilitador.findOne({where:{cedula: req.params.id} })
        .then((cofacilitadores) =>{
                
                fecha = (cofacilitadores.dataValues.fecha_nacimiento)? new Date(cofacilitadores.dataValues.fecha_nacimiento).toISOString().substring(0,10): undefined;
                cofacilitadores.dataValues.fecha_nacimiento = formats.convertirFecha(fecha, 'yyyy-mm-dd', 'dd/mm/yyyy');

                fecha2 = (cofacilitadores.dataValues.fecha_inscripcion)? new Date(cofacilitadores.dataValues.fecha_inscripcion).toISOString().substring(0,10): undefined;
                cofacilitadores.dataValues.fecha_inscripcion = formats.convertirFecha(fecha2, 'yyyy-mm-dd', 'dd/mm/yyyy');
                
                cofacilitadores.dataValues.nombre = (cofacilitadores.dataValues.nombre)?cofacilitadores.dataValues.nombre:'';
            return res.status(200).json(cofacilitadores)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}