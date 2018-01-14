const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');

exports.getAll = function(req, res){

    let parametros = req.query;

    if (parametros){
        var param_query = {};
        var campos;
        
        const conexion = conexionbd.getConexion(models, 'Children');    
        const { sequelize }  = conexion;
        return sequelize.query("sp_ListarClubs_getall")//Modify
        .spread(clubs =>{

                //Format Fecha
                clubs.forEach((arr)=>{
                    var fecha = '';
                    fecha = (arr.fecha_creacion)? new Date(arr.fecha_creacion).toISOString().substring(0,10): undefined;
                    arr.fecha_creacion = formats.convertirFecha(fecha, 'yyyy-mm-dd', 'dd/mm/yyyy'); 
                })
                return res.status(200).json(clubs);
        })        
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}

exports.deleteByID = function(req, res){
    const body = req.params.id;

    if(req.params !== "" || req.params!==undefined){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { Club, sequelize }  = conexion;

        return sequelize.transaction(function (t) {

            return Club.update({    
                estado: 'I',
                },{ 
                    where: {id: req.params.id}
                }, {transaction: t})

        }).then(()=> {
            return res.status(200).json({msg: 'Club #: '+req.params.id+" eliminado con exito"})
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
        const { Club, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Club.create({
                id: body.codigo,
                fecha_creacion: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                nombre: body.nombre,
                estado: body.estado_sel,
                objetivo_Estrategico: body.objEspec_sel,
                programa: body.programa_sel,
                observacion: body.observacion,
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
        const { Club, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            //COMPROBAR CODIGO NO REPETIDO SI ESTA REPETIDO MANDA MENSAJE PARA CAMBIAR

            return Club.update({
                //id: body.codigo,
                fecha_creacion: formats.convertirFecha(body.fecha_creacion, "dd/mm/yyyy", "yyyy-mm-dd") ,
                nombre: body.nombre,
                estado: body.estado_sel,
                objetivo_Estrategico: body.objEspec_sel,
                programa: body.programa_sel,
                observacion: body.observacion,
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
