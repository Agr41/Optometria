const Paciente = require('../models/pacientes')
const Tests= require('../models/Tets')

module.exports = async (req,res)=>{
    const id = req.params.id
    const Fecha= req.query.Fecha
    const pacientes = await Paciente.find({_id:id})
    const tests= await Tests.find({id:id,_id:Fecha})
    res.render('TestPaciente',{pacientes,tests,Logeado, role,Fecha,id,usuario})
}