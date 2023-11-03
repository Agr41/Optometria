const User = require('../models/Usuarios')
module.exports = async (req,res)=>{
    await User.create(req.body)
    await User.updateOne({username:req.body.username},{username:req.body.username})
    res.redirect('/HomeSessions')
    //Checar que sea admin
}