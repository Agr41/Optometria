const User =require("../models/Usuarios")
const mongoosePaginate= require('mongoose-paginate-v2')
const Test =require("../models/Tets")

module.exports = async (req, res) =>{
    var today = new Date();

    var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
    req.body.FechaDelTest= date
await Test.create(req.body)


res.redirect('/')

}
     