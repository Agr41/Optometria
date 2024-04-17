
module.exports = async (req,res,next)=>{
    if (role === "admin" || role === "cliente" || role === "alumno"){

        next()

    }else{
        res.redirect('/')
    }       

}