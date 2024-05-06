//Código de Aarón el que lo copie es puto.

//const User = require("../models/Usuarios.js"); module.exports= async(req,res)=>{ var page = req.query.page; if (page === undefined){ const usuarios = await User.paginate({},{page:1,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; console.log(usuarios); var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} console.log(TotalPaginas); res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); }else if (page != undefined){ const usuarios = await User.paginate({},{page,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); } }

const Paciente = require("../models/pacientes.js");
const Test = require('../models/Tets.js');
module.exports = async (req, res) => {
  var page = req.query.page;
  var ingles = false
  console.log(Idioma)



  if (Idioma == "en-US"){
    ingles = true;
  }
  if (page === undefined) {
    // Si no se especifica la página, muestra la primera página por defecto
    const pacientes = await Paciente.paginate({}, { page: 1, limit: 10 });
    const tests = await Test.find({})
    const FiltroPaginado = false;
    const Filtro = "ninguno";
    //console.log(usuarios);
    var TotalPaginas = [];
    for (i = 0; i < pacientes.totalPages; i++) {
      TotalPaginas.push(i + 1);
    }
    var PaginaActual= pacientes.page;
 
    res.render('PanelPacientes', {title:"Pacientes", Logeado, role, pacientes, FiltroPaginado, PaginaActual, Filtro, TotalPaginas, ingles });
  } else if (page != undefined && page >= 1) {

   var pacientes01 = await Paciente.paginate({}, { page, limit: 10 });



  if( page > pacientes01.totalPages ){
    page =pacientes01.totalPages
  
    
  }


    // Si se especifica una página, muestra esa página
    const pacientes = await Paciente.paginate({}, { page, limit: 10 });
    const FiltroPaginado = false;
    const Filtro = "ninguno";
 
    var PaginaActual= pacientes.page;


    var PaginaActual = pacientes.page;
    var TotalPaginas = [];
    



    if ((pacientes.totalPages - PaginaActual) >= 10) {
        // Si hay 10 o más páginas después de la página actual, empieza desde la página actual
        for (var i = PaginaActual - 1; i < PaginaActual - 1 + 10; i++) {
            TotalPaginas.push(i + 1);
        }
    } else {
        // Si hay menos de 10 páginas después de la página actual, empieza más atrás para asegurar 10 páginas en total
        var inicio = Math.max(0, pacientes.totalPages - 10); // Asegúrate de no ir a un índice negativo
        for (var i = inicio; i < pacientes.totalPages; i++) {
            TotalPaginas.push(i + 1);
        }
    }
    
        

    
        res.render('PanelPacientes', {title:"Lista de pacientes", Logeado, role, pacientes,PaginaActual, FiltroPaginado, Filtro, TotalPaginas, ingles });
  }





}



