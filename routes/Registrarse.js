module.exports = async (req,res) =>{

  var idioma = req.session.language;

    res.render('Registrar',{title:"Registrar usuario",Logeado,role, idioma, lng: req.session.language})
}