const Tests= require('../models/Tets')

module.exports = async (req,res)=>{

await Tests.deleteOne({_id:req.query.Fecha,username:req.query.Usuario})
res.redirect('/PanelUsuarios')
}