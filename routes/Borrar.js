const User = require("../models/Usuarios.js");

module.exports = async (req, res, next) => {

console.log(req.query.Usuario)

await User.deleteOne({username:req.query.Usuario})
res.redirect('/PanelUsuarios')

}