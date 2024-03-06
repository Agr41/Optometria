const User = require('../models/pacientes')
const Tests= require('../models/Tets')

module.exports = async (req,res)=>{
    const id = req.params.id
    const Fecha= req.query.Fecha
    const TipoTest= req.query.TipoTest

    const usuarios = await User.find({username:id})
    const tests= await Tests.find({id:id,_id:Fecha})
console.log(tests)
res.render('TestGeneral',{usuarios,tests,Logeado, role,Fecha,id,TipoTest})
}