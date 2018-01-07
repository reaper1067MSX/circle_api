exports.gen_FechaSistema = () => {    
    var fch_sist_ = new Date, fecha_sist = [ fch_sist_.getFullYear(),
        fch_sist_.getMonth()+1,                                                            
        fch_sist_.getDate()].join('-')+' '+
        [fch_sist_.getHours(),
        fch_sist_.getMinutes(),
        fch_sist_.getSeconds()].join(':');
        
    return fecha_sist;
}

exports.gen_HoraSistema = () => {
    var fch_sist_ = new Date, hora_sist = [fch_sist_.getHours(),
        fch_sist_.getMinutes(),
        fch_sist_.getSeconds()].join(':');
    return hora_sist;
}

exports.gen_FechaSistemaSequelize = () =>{
    var d = new Date();    
    return new Date(d+'UTC');
}

exports.gen_FechaSistemaMonth = () =>{
    var fch_sist_ = new Date, fecha_sist =  fch_sist_.getMonth()+1
    return fecha_sist;
}

exports.gen_FechaSistemaCortaOutput= () => {    
    var fch_sist_ = new Date, fecha_sist = [ fch_sist_.getDate(),
        fch_sist_.getMonth()+1,                                                            
        fch_sist_.getFullYear()].join('/')
        
    return fecha_sist;
}