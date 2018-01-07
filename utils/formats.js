exports.convertirFecha = function (fecha, formatoentrada, formatosalida){
    let partes_fecha;
    let fecha_salida;                      
    switch(formatoentrada){
        case "dd/mm/yyyy":
            partes_fecha = fecha.split("/");
            switch(formatosalida){
                case "yyyy-mm-dd":           
                    fecha_salida = partes_fecha[2] + "-" + partes_fecha[1] + "-" + partes_fecha[0];
                    break;       
            }
            break;       
        case "yyyy-mm-dd":
            partes_fecha = fecha.split("-");
            switch(formatosalida){
                case "dd/mm/yyyy":           
                    fecha_salida = partes_fecha[2] + "/" + partes_fecha[1] + "/" + partes_fecha[0];
                    break;       
            }        
            break;       

    }    
    

    return fecha_salida;
}

exports.completar_String = (cadena, char_relleno, tam_final) => {
    let tam_actual = cadena.toString().length;    
    let veces_repetir = tam_final - tam_actual;
    return char_relleno.repeat(veces_repetir).concat(cadena);
}


exports.formatearFecha = (fecha) => {
    var partes_fecha = '';
    var temp = '';
    partes_fecha = fecha.split("-");
    temp = partes_fecha[2];
    partes_fecha[2] = temp.substring(0, 2);

    fecha = partes_fecha[2] + '/' + partes_fecha[1] + '/' + partes_fecha[0];
    return fecha;
}
