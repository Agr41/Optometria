const User = require('../models/Usuarios')
module.exports = async (req,res)=>{
    await User.updateOne({username:req.body.username},{language:req.body.language})
    res.redirect('/HomeSessions')
    //Checar que sea admin
}