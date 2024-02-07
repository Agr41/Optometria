module.exports = async (req,res) =>{

    var ingles = false
    console.log(Idioma)
    if (Idioma == "en-US"){
      ingles = true;
    }
    res.render('idioma',{title:"Idioma",Logeado,role, ingles, user:req.session.username})
}