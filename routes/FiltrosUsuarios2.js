const User = require("../models/Usuarios.js")

module.exports = async (req, res) => {
    var page = req.query.page;
    var Filtro = req.body.Tipo;

    if (page === undefined  ){

        if(Filtro ==="Nombre"){
            const usuarios = await User.paginate({username:{$regex:req.body.busqueda}},{page:1,limit:50}) 
            const FiltroPaginado = true;
            const consulta = req.body.busqueda;
            res.render('PanelUsuarios',{usuarios,Logeado, role, FiltroPaginado,Filtro,consulta})

        }


    }else if (page != undefined){
        var Filtro = req.query.Filtro
        var consulta = req.query.consulta;

        if(Filtro ==="Nombre"){
            const usuarios = await User.paginate({username:{$regex:consulta}},{page,limit:50}) 
            const FiltroPaginado = true;
            res.render('PanelUsuarios',{usuarios,Logeado, role,FiltroPaginado,Filtro,consulta})

        }

    }

}

