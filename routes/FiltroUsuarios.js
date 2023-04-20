//Código de Aarón el que lo copie es puto.

const User = require("../models/Usuarios.js"); module.exports = async (req, res) => { var page = req.query.page; var Filtro = req.body.role; if (page === undefined ){ if(Filtro ==="admin"){ const usuarios = await User.paginate({role:"admin"},{page:1,limit:50}); const FiltroPaginado = true; res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro}) } if(Filtro ==="cliente"){ const usuarios = await User.paginate({role:"cliente"},{page:1,limit:50}); const FiltroPaginado = true; res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro}) } }else if (page != undefined){ var Filtro = req.query.Filtro; var page = req.query.page; if(Filtro ==="admin"){ const usuarios = await User.paginate({role:"admin"},{page,limit:50}); const FiltroPaginado = true; res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro}) } if(Filtro ==="cliente"){ const FiltroPaginado = true; const usuarios = await User.paginate({role:"cliente"},{page,limit:50}); console.log(usuarios); res.render('PanelUsuarios',{Logeado,role,usuarios,FiltroPaginado,Filtro}) } } }






