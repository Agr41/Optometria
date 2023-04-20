const User = require('../models/Usuarios')
module.exports = async (req,res)=>{
    await User.create(req.body)
    res.redirect('/')

}