//Código de Aarón el que lo copie es puto.

//const User = require("../models/Usuarios.js"); module.exports= async(req,res)=>{ var page = req.query.page; if (page === undefined){ const usuarios = await User.paginate({},{page:1,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; console.log(usuarios); var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} console.log(TotalPaginas); res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); }else if (page != undefined){ const usuarios = await User.paginate({},{page,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); } }

const Paciente = require("../models/pacientes.js");

module.exports = async (req, res) => {
  var page = req.query.page;

  if (page === undefined) {
    // Si no se especifica la página, muestra la primera página por defecto
    const pacientes = await Paciente.paginate({}, { page: 1, limit: 10 });
    const FiltroPaginado = false;
    const Filtro = "ninguno";
    //console.log(usuarios);
    var TotalPaginas = [];
    for (i = 0; i < pacientes.totalPages; i++) {
      TotalPaginas.push(i + 1);
    }


    //console.log(TotalPaginas);


    
    res.render('PanelPacientes', { Logeado, role, pacientes, FiltroPaginado, Filtro, TotalPaginas });
  } else if (page != undefined) {
    // Si se especifica una página, muestra esa página
    const pacientes = await Paciente.paginate({}, { page, limit: 10 });
    const FiltroPaginado = false;
    const Filtro = "ninguno";
    var TotalPaginas = [];
    for (i = 0; i < pacientes.totalPages; i++) {
      TotalPaginas.push(i + 1);
    }
    res.render('PanelPacientes', {title:"Lista de pacientes", Logeado, role, pacientes, FiltroPaginado, Filtro, TotalPaginas });
  }
}
