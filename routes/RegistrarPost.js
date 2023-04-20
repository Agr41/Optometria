const User =require("../models/Usuarios")
const mongoosePaginate= require('mongoose-paginate-v2')

module.exports = async (req, res) =>{
await User.create(req.body)
res.redirect('/')

}
     