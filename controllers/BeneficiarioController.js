const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');
const gen_fechas = require('../utils/gen_fechas');


exports.getAll = function(req, res){
    let parametros = req.query;

    if (parametros){

        var param_query = {};

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Beneficiario }  = conexion;

        if(parametros.cadena_busq=== undefined){

        campos = [['cedula', 'Cedula'], ['nombre', 'Nombre'], ['apellido', 'Apellido'],
                 ['fecha_nac', 'Edad'], ['estado', 'Estado']];

        if(req.query.estado){
            param_query = {estado: 'A'}
        }
        
        Beneficiario.findAll({attributes: campos, where: param_query  })
        .then((beneficiario) => {
            
            beneficiario.forEach((DATA)=> {
                var edad , actual;
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
                
            param_query.$or = [ {cedula: {$like: `%${parametros.cadena_busq}%`}}, { apellido: {$like: `%${parametros.cadena_busq}%`}}];
            campos = [['cedula', 'Codigo'], ['apellido', 'Descripcion']];    
            nrocampos = 20; 

            Beneficiario.findAll({attributes: campos, where: param_query, limit: nrocampos})
            .then((beneficiario) => res.status(200).json(beneficiario))
            .catch((err) =>{
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            }); 
        }


    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}

exports.deleteByID = function(req, res){
    const body = req.params.id;

    if(req.params !== "" || req.params!==undefined){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Beneficiario, sequelize }  = conexion;

        return sequelize.transaction(function (t) {

            return Beneficiario.update({    
                estado: 'I',
                },{ 
                    where: {Cedula: req.params.id}
                }, {transaction: t})

        }).then(()=> {
            return res.status(200).json({msg: 'Beneficiario #: '+req.params.id+" eliminado con exito"})
        }).catch((err) => {
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
        const { Beneficiario, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Beneficiario.create({
                cedula: body.cedula,
                nombre: body.nombres,
                apellido: body.apellidos,
                fecha_nac: formats.convertirFecha(body.fecha_nacimiento, "dd/mm/yyyy", "yyyy-mm-dd"),
                estado: body.estado,
                telefono: body.telefono,
                fecha_inscripcion: formats.convertirFecha(body.fecha_inscripcion, "dd/mm/yyyy", "yyyy-mm-dd"),
                dolencia_medica: body.dolencia_medica,
                unidad_academica: body.unidad,
                periodo_electivo: body.periodoEscolar,
                promedio_general: body.calificacion,
                representante_ced: body.cedulaRepresentante,
                representante_nombre: body.nombreRe,
                representante_apellido: body.apellidoRe,
                direccion: (body.direccion)?body.direccion:'',
                cod_apadrinado: (body.codigo_apadrinado)?body.codigo_apadrinado:''
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

exports.update = function(req, res){
    const body = req.body;

    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Beneficiario, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Beneficiario.update({
                //cedula: body.cedula,
                nombre: body.nombres,
                apellido: body.apellidos,
                fecha_nac: formats.convertirFecha(body.fecha_nacimiento, "dd/mm/yyyy", "yyyy-mm-dd"),
                estado: body.estado,
                telefono: body.telefono,
                fecha_inscripcion: formats.convertirFecha(body.fecha_inscripcion, "dd/mm/yyyy", "yyyy-mm-dd"),
                dolencia_medica: body.dolencia_medica,
                unidad_academica: body.unidad,
                periodo_electivo: body.periodoEscolar,
                promedio_general: body.calificacion,
                representante_ced: body.cedulaRepresentante,
                representante_nombre: body.nombreRe,
                representante_apellido: body.apellidoRe,
                direccion: body.direccion,
                cod_apadrinado: body.codigo_apadrinado
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
        const { Beneficiario }  = conexion;

        var fecha = "";
        var fecha2 = "";

        Beneficiario.findOne({where:{cedula: req.params.id} })
        .then((beneficiario) =>{
                
                fecha = (beneficiario.dataValues.fecha_nac)? new Date(beneficiario.dataValues.fecha_nac).toISOString().substring(0,10): undefined;
                beneficiario.dataValues.fecha_nac = formats.convertirFecha(fecha, 'yyyy-mm-dd', 'dd/mm/yyyy');

                fecha2 = (beneficiario.dataValues.fecha_inscripcion)? new Date(beneficiario.dataValues.fecha_inscripcion).toISOString().substring(0,10): undefined;
                beneficiario.dataValues.fecha_inscripcion = formats.convertirFecha(fecha2, 'yyyy-mm-dd', 'dd/mm/yyyy');
                
                beneficiario.dataValues.nombre = (beneficiario.dataValues.nombre)?beneficiario.dataValues.nombre:'';
            return res.status(200).json(beneficiario)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}