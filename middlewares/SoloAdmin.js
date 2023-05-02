
module.exports = async (req,res,next)=>{
    
    if (role !== 'admin'){

        res.redirect('/')
    }else{
        next()

    }
}