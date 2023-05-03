const User = require("../models/Usuarios.js");

module.exports = async (req, res, next) => {

console.log(role)
if(role !== 'admin'){

res.send(`<script>alert("¡No estas autorizado!"); window.location.href='/PanelUsuarios';</script>`)

}else{

    await User.deleteOne({username:req.query.Usuario})
    res.redirect('/PanelUsuarios')


}



}