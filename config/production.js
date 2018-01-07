module.exports = {	
	databases : {
		database_users:{
			host: '192.168.0.252',
			port: 2328,
			user : 'sa',
			pass: 'Mf02',
			name: 'Itera', 
			dialect: 'mssql', 
		},
		databases_empresas:[
			{	nombre: 'deporpas',
				config_connection: {	host: '192.168.0.252',
										port: 2328,
										user : 'sa',
										pass: 'Mf02',
										name: 'Deporpas', 
										dialect: 'mssql', 
									}
			},
			{	nombre: 'osier',
				config_connection: {	host: '192.168.0.252',
										port: 2328,
										user : 'sa',
										pass: 'Mf02',
										name: 'Osier', 
										dialect: 'mssql', 
									}
			}						
		]
	},
	app:{
		port: 3005,
        secret: 'WJ<G_fhS=v\!f@$SV546#.VNJCyw#Fjs_}f*v*;+t{[g2¿V!G-',		
		tokenExpiresIn: 60*60*1, 
		host: 'localhost',
		salt: 10
	},
}
