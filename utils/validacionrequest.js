var jwt = require('jsonwebtoken');
var path = require('path');
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '../', 'config/'))[env];


/*
	Función: validarRequest		
	Descripción: Es un middleware que revisa cada request recibido y evalúa que siempre tengan incluídas las cabeceras http 'empresa' 
	y 'x-access-token'.

	El valor de la cabecera 'empresa' debe tener sólo letras y debe ser igual a uno de los items del array de configuración de 
	base de datos ( config.databases.databases_empresas ).

	El valor de la cabecera 'x-access-token' debe tener un token que haya sido emitido por la API en el proceso de autenticación y 
	no debe haber expirado.
*/


exports.validarRequest = () => {
	return (req, res, next) => {

		//console.log("METHOD",req.method);
		if ( req.method!=='OPTIONS'){
			
			//console.log("headers",req.headers);

			let token = req.headers['x-access-token'];

			//console.log('token extraido', token)

			if (token){
				jwt.verify(token, config.app.secret, function (err, decoded) {
					if(err){
						res.status(401).json({ msg: 'Acceso No Autorizado: Token inválido' }).end()
					}else{								
						next();
					}
				})
			}else{
				res.status(401).json({ msg: 'Acceso No Autorizado: Token no especificado' }).end()
			}
		}else{
			next();
		}
	}
}