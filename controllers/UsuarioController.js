const models = require('../models/UsersConfig/');
const conexionbd = require('../utils/conexionbd');
const bcrypt = require('bcryptjs');
const Usuario = models.Usuario;

exports.getById = function(req, res){
    const body = req.body;
    console.log("COME!!");
    if(body){
        //const conexion = conexionbd.getConexion(models, req.headers.empresa);
        console.log("CUERPO: ", body)
        var username = body.user;
        var pass = body.pass;
        var result = false;

        Usuario.findOne({where: {id:username}})
        .then((usuario) => {

            if (!usuario) {
                return res.status(200).json({ msg: 'Acceso No Autorizado: Usuario no válido' });
            }

            if (bcrypt.compareSync(pass, usuario.clave)){
                result = true;  
            }
            console.log("RESULTADO", result);
            return res.status(200).json(result);  
        })
        .catch((err) => { 
            console.log(err);
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });

    }else{
        return res.status(400).json({ msg: 'Request inválido' });
    }
    

}