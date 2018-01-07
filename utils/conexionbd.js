exports.getConexion = (models, bd) => {
    for(var i = 0; i < models.length; i++)
    {
        if(models[i].nombre.toString().toLowerCase() === bd.toString().toLowerCase())
        {
            return models[i];
        }
    }
}