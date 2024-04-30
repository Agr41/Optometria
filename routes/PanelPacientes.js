//Código de Aarón el que lo copie es puto.

//const User = require("../models/Usuarios.js"); module.exports= async(req,res)=>{ var page = req.query.page; if (page === undefined){ const usuarios = await User.paginate({},{page:1,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; console.log(usuarios); var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} console.log(TotalPaginas); res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); }else if (page != undefined){ const usuarios = await User.paginate({},{page,limit:30}); const FiltroPaginado= false; const Filtro = "ninguno"; var TotalPaginas=[]; for (i=0; i<usuarios.totalPages; i++){TotalPaginas.push(i + 1);} res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro,TotalPaginas}); } }

const Paciente = require("../models/pacientes.js");
const Test = require('../models/Tets.js');
module.exports = async (req, res) => {

  var page = req.query.page || 1; // Si no hay una página especificada, se usará la primera por defecto
  const limit = 10; // 10 pacientes por página
  const pacientes = await Paciente.paginate({}, { page, limit });

  // Calcula el número total de páginas
  const totalPages = pacientes.totalPages;

  // Calcula el rango de páginas que deseas mostrar
  const currentPage = parseInt(page);
  const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  // Consulta la base de datos para obtener pacientes en la página actual

  // Crea un array con las páginas que deseas mostrar en la paginación
  const TotalPaginas = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
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
  
/*
    for (let j = 0; j < tests.length; j++) {
      for (let i = 0; i < pacientes.docs.length; i++) {
          const pacienteId = pacientes.docs[i]._id.toString(); // Convierte el _id del paciente a una cadena de texto
          const testId = tests[j].id.toString(); // Convierte el id del test a una cadena de texto
  console.log(pacienteId,testId)
          if (pacienteId === testId) {
              pacientes.docs[i].OD = tests[j].ODReni;
              pacientes.docs[i].OI = tests[j].OIReni;
          }
      }
  }
  
console.log(pacientes.docs)
*/

    res.render('PanelPacientes', {title:"Pacientes", Logeado, role, pacientes, FiltroPaginado, Filtro, TotalPaginas, ingles });
  } else if (page != undefined) {
    // Si se especifica una página, muestra esa página
    const pacientes = await Paciente.paginate({}, { page, limit: 10 });
    const FiltroPaginado = false;
    const Filtro = "ninguno";
  
    
    res.render('PanelPacientes', {title:"Lista de pacientes", Logeado, role, pacientes, FiltroPaginado, Filtro, TotalPaginas, ingles });
  }
}
