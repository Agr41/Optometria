module.exports= async (req,res) =>{
    req.session.destroy(() =>{
        
        res.redirect('/')
        })
        
}