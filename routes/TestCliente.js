const User = require('../models/pacientes')
const Tests= require('../models/Tets')

module.exports = async (req,res)=>{
    const id = req.params.id
    const Fecha= req.query.Fecha
    const usuarios = await User.find({username:id})
    const tests= await Tests.find({username:id,_id:Fecha})
    res.render('TestCliente',{usuarios,tests,Logeado, role,Fecha,id})
}