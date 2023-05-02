const Tests= require('../models/Tets')

module.exports = async (req,res)=>{

const correo = req.body.UsuarioBusqueda
    var x= ['Diabetes',
    'PresionAlta',
    'EmbarazoOlactancia',
    'ProblemasDelCorazon',
    'Galucoma',
    'Caratatas',
    'DolorDeCabeza',
    'Myopia',
    'Hyperopia',
    'Asigmatism',
    'Presbyopia',
    'Anisometropia',
    'Amblyopia',
    'Strabismus',
    'DiabeticRet',
    'HtnRet',
    'DryEye',
    'Pinguecula',
    'Pterygium',
    'Conjuntivitis',
    'Galucoma2',
    'Cataracts',
    'ODExamination',
    'OSExamination',
    'PriorSurg',
    'ODExamination2',
    'OSExamination2'
    ] 
       

for (i=0; i<x.length; i++){


    for (let i = 0; i < x.length; i++) {
        if (!req.body[x[i]]) {
          req.body[x[i]] = false;
        }
      }
    }
      

      
    await Tests.updateOne({_id:req.body.ValorBusqueda},{...req.body})
    res.redirect('/TestCliente/'+`${correo}`+'?Fecha='+`${req.body.ValorBusqueda}`)
}



