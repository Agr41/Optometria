module.exports = async (req,res) =>{

    var ingles = false
    console.log(Idioma)
    if (Idioma == "en-US"){
      ingles = true;
    }
    res.render('Registrar',{title:"Registrar usuario",Logeado,role, ingles})
}