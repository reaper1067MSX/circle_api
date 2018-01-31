const models = require('../models/');
const conexionbd = require('../utils/conexionbd');
const formats = require('../utils/formats');



exports.getAll = function (req, res){
    
    if(req.query){
        try {
            
            const conexion = conexionbd.getConexion(models, 'Children');    
            const { sequelize }  = conexion;

            //caso /
            var parametros = Object.keys(req.query).length;
            
            if(parametros === 0){
                return sequelize.query("sp_listar_clubs_asignados_PS")
                .spread((clubsasignados) =>{
                    //console.log("TAMAÑO: ",clubsasignados.length)
                    return res.status(200).json(clubsasignados);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
                });
            }
            
        }catch(error){
            console.log(error);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        }
    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
}