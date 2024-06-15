//Código de Aarón el que lo copie es puto.

//const User = require("../models/Usuarios.js"); module.exports= async(req,res)=>{ var page = req.query.page; if (page === undefined){ const usuarios = await User.paginate({},{page:1,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; console.log(usuarios); var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} console.log(TotalPaginas); res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); }else if (page != undefined){ const usuarios = await User.paginate({},{page,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); } }

const User = require("../models/Usuarios.js");

module.exports = async (req, res) => {
  var idioma = req.session.language;
 
  var page = req.query.page;

  if (page === undefined) {
    // Si no se especifica la página, muestra la primera página por defecto
    const usuarios = await User.paginate({ username: { $ne: req.session.username }}, { page: 1, limit: 10 });
    const FiltroPaginado = false;
    const Filtro = "ninguno";
    //console.log(usuarios);
    var TotalPaginas = [];
    for (i = 0; i < usuarios.totalPages; i++) {
      TotalPaginas.push(i + 1);
    }
    var PaginaActual= usuarios.page;

    //console.log(TotalPaginas);
    res.render('PanelUsuarios', {title:"Usuarios", Logeado, role, usuarios, FiltroPaginado, Filtro, PaginaActual, TotalPaginas, idioma , lng: req.session.language});
  } else if (page != undefined) {

    var usuarioss01 = await User.paginate({}, { page, limit: 10 });


    
  if( page > usuarioss01.totalPages ){
    page =usuarioss01.totalPages
  
    
  }
    // Si se especifica una página, muestra esa página
    const usuarios = await User.paginate({ username: { $ne: req.session.username }}, { page, limit: 10 });
    const FiltroPaginado = false;
    const Filtro = "ninguno";

    var PaginaActual= usuarios.page;


    var PaginaActual = usuarios.page;
    var TotalPaginas = [];


    if ((usuarios.totalPages - PaginaActual) >= 10) {
      // Si hay 10 o más páginas después de la página actual, empieza desde la página actual
      for (var i = PaginaActual - 1; i < PaginaActual - 1 + 10; i++) {
          TotalPaginas.push(i + 1);
      }
  } else {
      // Si hay menos de 10 páginas después de la página actual, empieza más atrás para asegurar 10 páginas en total
      var inicio = Math.max(0, usuarios.totalPages - 10); // Asegúrate de no ir a un índice negativo
      for (var i = inicio; i < usuarios.totalPages; i++) {
          TotalPaginas.push(i + 1);
      }
  }


    res.render('PanelUsuarios', { Logeado, role, usuarios, PaginaActual, FiltroPaginado, Filtro, TotalPaginas, idioma, lng: req.session.language });
  }
}
