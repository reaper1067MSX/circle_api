module.exports = {	
	databases : {
		database_users:{
			host: 'localhost', 
			//port: 1433,
			user : 'sa',
			pass: '123',
			name: 'Children', 
			dialect: 'mssql',
		},
		databases_empresas:[
			{	nombre: 'Children',
				config_connection: {	host: 'localhost',
										//port: 1433,
										user : 'sa',
										pass: '123',
										name: 'Children', 
										dialect: 'mssql',
									}
			}					
		]
	},
	app:{
		port: 3005,
        secret: 'WJ<G_fhS=v\!f@$SV546#.VNJCyw#Fjs_}f*v*;+t{[g2¿V!G-',		
		tokenExpiresIn: 60*60*12, 
		host: 'localhost',
		salt: 10
	}	
}
