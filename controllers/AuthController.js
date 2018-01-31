const models = require('../models/UsersConfig/');
const Usuario = models.Usuario;
const Cargo = models.Cargo;
const models_emp = require('../models/');
const conexionbd = require('../utils/conexionbd');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, './', '../config/'))[env];
const sequelize = models.sequelize;

exports.login = function(req, res, next){    
    let username = req.body.username;
    let clave = req.body.clave;

    
    
    if (username && clave) {

        Usuario.findOne({
            where: {id:username}
        }).then((usuario) => {
            if (!usuario) {
                return res.status(401).json({ msg: 'Acceso No Autorizado: Usuario no válido' });
            }
            if (bcrypt.compareSync(clave, usuario.clave)){
                try{    
                    return Cargo.findOne({
                        where: {id:usuario.cargo}
                    }).then((cargo) => {

                        var datos_sesion = {};
                        datos_sesion.token = jwt.sign({ usuario: usuario.Codigo }, config.app.secret, { expiresIn: config.app.tokenExpiresIn } )
                        datos_sesion.usuario = usuario.nombre.trim();                        
                        datos_sesion.tiempoSesion = config.app.tokenExpiresIn;
                        datos_sesion.cargo = cargo.descripcion;

                        //console.log("DATA: ", datos_sesion)
                        return res.status(200).json(datos_sesion);  
                    })
                }catch(error){
                    return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + error });
                }
            }else{
                return res.status(401).json({ msg: 'Acceso No Autorizado: Clave incorrecta' });
            }                       
        })
        .catch((err) => {            
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        });
    }else{
        return res.status(400).json({ msg: 'El usuario o la clave no han sido especificados.' });
    }
}

/*
exports.getParametros  = function(req, res, next){    
    let username = req.params.usuario;
    let perfilid = req.params.perfilid;

    if (username && perfilid) {
        Usuario.findOne({where: {Login:username}})
        .then((usuario) => {
            if (usuario){                
                const { UsuarioPerfilEmpresa, UsuarioPerfil, Perfil, Empresa, sequelize } = models;                    
                
                UsuarioPerfil.belongsTo(Empresa, {as:'infoempresa', foreignKey: 'CodigoEmpresaDefault', targetKey: 'CodigoEmpresa'});                    
                UsuarioPerfil.belongsTo(Perfil, {as: 'infoperfil', foreignKey: 'PerfilId', targetKey: 'PerfilId'});

                UsuarioPerfil.findAll({
                    include: [  { model: Perfil, as: 'infoperfil', attributes: ['NombrePerfil']},
                                { model: Empresa, as: 'infoempresa', attributes: ['NombreEmpresa', 'NombreBaseDatos']},                
                            ],  
                    where: { $and: [{ UsuarioId: usuario.UsuarioId}, {PerfilId: perfilid}]}                        
                }).then((perfiles)=>{
                    let perfil = perfiles[0].dataValues;    

                    UsuarioPerfilEmpresa.belongsTo(Empresa, {as:'infoempresa', foreignKey: 'CodigoEmpresa', targetKey: 'CodigoEmpresa'});                    
                    
                    UsuarioPerfilEmpresa.findAll({ 
                        include: [  { model: Empresa, as: 'infoempresa', attributes: ['NombreEmpresa', 'NombreBaseDatos']} ],                         
                        attributes: ['CodigoEmpresa', 'PerfilId'],
                        where: { $and: [{UsuarioId: usuario.UsuarioId}, {PerfilId: perfil.PerfilId}]}    

                    }).then((empresas_perfil)=>{
                        sequelize.query("sp_selOpcionesMenu " + usuario.UsuarioId + ", " + perfil.PerfilId + ", '" + perfil.CodigoEmpresaDefault + "'") 
                        .spread((opciones_menu) => {
                            let permisos = {};
                            
                            permisos.menu = opciones_menu;                            
                            permisos.empresaActualId = perfil.infoempresa.NombreBaseDatos.trim().toLowerCase();
                            permisos.empresaActualDescrip = perfil.infoempresa.NombreEmpresa.trim();
                            permisos.empresasPerfil = empresas_perfil;
                            permisos.perfil = perfil.infoperfil.NombrePerfil.trim();

                            const conexion = conexionbd.getConexion(models_emp, permisos.empresaActualId);
                            const sequelize_emp = conexion.sequelize;

                            sequelize_emp.query('sp_Parametros_sel_all')
                            .spread((parametros) => {                             
                                return res.status(200).json({datos_inic: {permisos, parametros}});
                            })   
                            .catch((err)=>{
                                return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
                            });
                        })
                        .catch((err)=>{
                            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
                        })  
                    })
                    .catch((err)=>{
                        return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
                    })                                     
                })
                .catch((err)=>{
                    return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
                })                 
            }else{
                return res.status(400).json({ msg: 'Los parámetros de request son inválidos' });
            }
        })
        .catch((err)=>{
            return res.status(500).json({ msg: 'Error Interno en el Servidor: ' + err });
        })  
    }else{
        return res.status(400).json({ msg: 'Los parámetros de request son inválidos' });
    }
    
} 
*/
