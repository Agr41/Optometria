const Paciente = require("../models/pacientes.js");

module.exports = async (req, res, next) => {

console.log(role)
if(role !== 'admin'){

res.send(`<script>alert("¡No estas autorizado!"); window.location.href='/PanelPacientes';</script>`)

}else{

    await Paciente.deleteOne({_id:req.query.id})
    res.redirect('/PanelPacientes')


}



}