const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');

exports.createAsignacion = function(req, res){
    const body = req.body;

    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Club_Detalle, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            body.detalle.forEach((DATA) => {
                DATA.nombre_punto_satelite = DATA.punto_satelite_N;
                DATA.fecha_creacion = formats.convertirFecha(DATA.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd");
                DATA.hora_desde = DATA.desde;
                DATA.hora_hasta = DATA.hasta;
            });
            console.log(body);
            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

                return Club_Detalle.bulkCreate(body.detalle, {transaction: t})

                
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

exports.getAll = function(req, res){
    let parametros = req.query;

    if (parametros){
        var param_query = {};
        var campos;
        
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { sequelize, Club_Detalle }  = conexion;
        
        console.log("PARAMETROS: ", parametros.cadena_busq)

        //BENEFICIARIO CLUB CONTROLLER
        if(parametros.beneficiario !== undefined){
            console.log("ENTRO GETALL /?beneficiario")
            return sequelize.query("sp_consultaClubsAsignados_Beneficiario '"+parametros.beneficiario+"' ")
            .spread((asignaciones) =>{
                asignaciones.forEach((arr)=>{
                    var hora = "";
                    hora = (arr.desde)? arr.desde.toISOString().substring(11,16) :undefined
                    arr.desde = hora;
                    hora = (arr.hasta)? arr.hasta.toISOString().substring(11,16) :undefined
                    arr.hasta = hora;
                })
                return res.status(200).json(asignaciones);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
        }

        //CLUB ASIGNADOS A COFACILITADORES
        if(parametros.cofacilitador !== undefined){
            console.log("ENTRO GETALL /?cofacilitador=true")
            return sequelize.query("sp_DetalleClubAsignacionCofacilitador")
            .spread((asignaciones) =>{
                asignaciones.forEach((arr)=>{
                    var hora = "";
                    hora = (arr.desde)? arr.desde.toISOString().substring(11,16) :undefined
                    arr.desde = hora;
                    hora = (arr.hasta)? arr.hasta.toISOString().substring(11,16) :undefined
                    arr.hasta = hora;
                })
                return res.status(200).json(asignaciones);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
        }

        if(parametros.visualizar !== undefined){
            console.log("ENTRO GETALL /asignaciones?visualizar=true")
            return sequelize.query("sp_ClubsAsignados_Beneficiario_getAll ")
            .spread((visualizar_asig) =>{
                visualizar_asig.forEach((arr)=>{
                    var hora = "";
                    hora = (arr.desde)? arr.desde.toISOString().substring(11,16) :undefined
                    arr.desde = hora;
                    hora = (arr.hasta)? arr.hasta.toISOString().substring(11,16) :undefined
                    arr.hasta = hora;
                })
                return res.status(200).json(visualizar_asig);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
        }

        if(parametros.cadena_busq === undefined){
            console.log("ENTRO GETALL /")
            return sequelize.query("sp_ListarAsignaciones_getall")//Modify
            .spread((clubs_detalles) =>{
                    //console.log("DETALLE: ", clubs_detalles)
                    //Format Fecha
                    clubs_detalles.forEach((arr)=>{
                        var fecha = '';
                        fecha = (arr.fecha_creacion)? new Date(arr.fecha_creacion).toISOString().substring(0,10): undefined;
                        arr.fecha_creacion = formats.convertirFecha(fecha, 'yyyy-mm-dd', 'dd/mm/yyyy'); 

                        var hora = "";
                        hora = (arr.desde)? arr.desde.toISOString().substring(11,16) :undefined
                        arr.desde = hora;
                        //console.log("HORA: ", hora)
                        hora = (arr.hasta)? arr.hasta.toISOString().substring(11,16) :undefined
                        arr.hasta = hora;

                    })
                    return res.status(200).json(clubs_detalles);
            })        
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
        }

        
        /* else{
            
            param_query.$or = [ {id: {$like: `%${parametros.cadena_busq}%`}}, { nombre: {$like: `%${parametros.cadena_busq}%`}}];
            campos = [['id', 'Codigo'], ['nombre', 'Descripcion']];    
            nrocampos = 20; 

            Club_Detalle.findAll({attributes: campos, where: param_query, limit: nrocampos})
            .then((club) => res.status(200).json(club))
            .catch((err) =>{
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            }); 
        } */
    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}

exports.deleteByID = function(req, res){
    const params = req.params;

    if(req.params !== "" || req.params!==undefined){
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Club_Detalle, sequelize }  = conexion;

        return sequelize.transaction(function (t) {

            return Club_Detalle.update({    
                estado: 'I',
                },{ 
                    where: {$and: [{id: params.id} ,{ punto_satelite: params.ps }, {secuencia: params.sc}, {dia: params.di}]}
                }, {transaction: t})

        }).then(()=> {
            return res.status(200).json({msg: 'Asignacion #: '+req.params.id+" eliminada con exito"})
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });
    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}

exports.update = function (req, res){
    var body = req.body;
    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Club_Detalle, sequelize }  = conexion;

        return sequelize.transaction(function (t){
            return sequelize.query("sp_ValidacionAsignacionCofacilitador '"+body.cofacilitador+"' ", {transaction: t})
            .spread((valido)=>{
                
                if(valido.length === 0){
                    return Club_Detalle.update({
                        cod_cofacilitador: body.cofacilitador,
                    },{ 
                        where: {$and: [{id: req.params.id},{estado: 'A'}]}
                    }, {transaction: t})
                }else{
                    return res.status(200).json({msg: 'Cofacilitador ya asignado en un club'})
                }
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

exports.desvinculacion = function (req, res){
    if(req.params){
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Club_Detalle, sequelize }  = conexion;

        return sequelize.transaction(function (t){
            return Club_Detalle.update({
                cod_cofacilitador: null,
            },{ 
                where: {$and: [{id: req.params.id},{estado: 'A'}]}
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
