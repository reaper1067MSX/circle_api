const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');


exports.create = function(req, res){
    const body = req.body;

    if(req.body){

        const conexion = conexionbd.getConexion(models, 'Children');    
        const { BeneficiarioClub, sequelize }  = conexion;
        console.log(body);
        return sequelize.transaction(function (t) {

            var inscripcion = [];
            body.detalle.forEach((DATA, i) => {
                var item = {};
                item.club = DATA.club_cod;
                item.beneficiario = DATA.beneficiario_cod;
                item.punto_satelite = DATA.punto_satelite;
                item.secuencia = i + 1;
                item.dia = DATA.dia;
                item.desde = DATA.desde;
                item.hasta = DATA.hasta;

                inscripcion.push(item);
            });
            console.log(body);

            return sequelize.query("del_inscripcion_beneficiario  '"+req.params.id+"' ", {transaction: t})
            .then(()=>{
                return BeneficiarioClub.bulkCreate(inscripcion, {transaction: t})
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

exports.deleteByID = function (req, res){
    if(req.query.beneficiario !== undefined && req.query.secuencia !== undefined){
        try{
            const conexion = conexionbd.getConexion(models, 'Children');    
            const { BeneficiarioClub, sequelize }  = conexion;

            return sequelize.transaction(function (t) {

                return BeneficiarioClub.destroy({    
                    where: {$and: [{beneficiario: req.query.beneficiario}, {secuencia: req.query.secuencia}]}
                    }, {transaction: t})

            }).then(()=> {
                return res.status(200).json({msg: 'El Beneficiario #: '+req.query.beneficiario+" su asignacion se ha eliminado con exito"})
            }).catch((err) => {
                console.log(err);
                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
            });
            
        }catch (error) {
            console.log(error);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        }
    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}