
module.exports = async (req,res,next)=>{
    
    if (role !== 'admin' || role !== 'cliente'){

        res.redirect('/')
    }else{
        next()

    }
}