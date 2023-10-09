const Tests= require('../models/Tets')

module.exports = async (req,res)=>{

const correo = req.body.UsuarioBusqueda
    var x= [   
        'Diabetes',
    'Hipertension',
    'ProblemasDelCorazon',
    'Glaucoma',
    'ConLentesDistancia',
    'ConLentesCerca',
    'SinLentesDistancia',
    'SinLentesCerca',
        'grupoRadioA',
    'grupoRadioB',
    'grupoRadioC',
       'ODReni',
    'OIReni',
    'opcion',
    ] 
       
for (i=0; i<x.length; i++){


    for (let i = 0; i < x.length; i++) {
        if (!req.body[x[i]]) {
          req.body[x[i]] = false;
        }
      }
    }
      

    console.log(req.body)

    await Tests.updateOne({_id:req.body.ValorBusqueda},{...req.body})
    res.redirect('/TestPaciente/'+`${correo}`+'?Fecha='+`${req.body.ValorBusqueda}`)
}



/*

*/