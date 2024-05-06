const User = require("../models/Usuarios.js")
const Joi = require('joi');

module.exports = async (req, res) => {
    var page = req.query.page;
    var Filtro = req.body.Tipo;

    if (page === undefined  ){

        if(Filtro ==="Nombre"){


            try{



                const schema = Joi.object({
                    busqueda: Joi.string().regex(/^[a-zA-Z0-9\s]*$/).required()
                  });
              
                  // Paso 3: Validar
                  const { error, value } = schema.validate({ busqueda: req.body.busqueda });
                  if (error) {
                    throw new Error('Caracteres no permitidos');
                  }
      
           
            const usuarios = await User.paginate({username:{$regex:req.body.busqueda, $options: 'i' }},{page:1,limit:10}) 
            const FiltroPaginado = true;
            const consulta = req.body.busqueda;
            var TotalPaginas = [];
            for (i = 0; i < usuarios.totalPages; i++) {
              TotalPaginas.push(i + 1);
            }
            res.render('PanelUsuarios',{usuarios,Logeado, role, FiltroPaginado,Filtro,consulta,TotalPaginas})

        }catch(e) {           
             res.send(`<script>alert("¡Carácteres introducidos no permitidos!"); window.location.href='/PanelUsuarios';</script>`) 

        }

        }


    }else if (page != undefined){
        var Filtro = req.query.Filtro
        var consulta = req.query.consulta;

        if(Filtro ==="Nombre"){
try{


            var usuarios01 = await User.paginate({username:{$regex:consulta, $options: 'i' }},{page,limit:10}) 
          console.log(usuarios01)

            if( page > usuarios01.totalPages ){
              page =usuarios01.totalPages
            
              
            }
            const usuarios = await User.paginate({username:{$regex:consulta}},{page,limit:10}) 
            const FiltroPaginado = true;


            var TotalPaginas = [];
            var PaginaActual= usuarios.page;
            if ((usuarios.totalPages - PaginaActual) >= 10) {
                // Si hay 10 o más páginas después de la página actual, empieza desde la página actual
                for (var i = PaginaActual - 1; i < PaginaActual - 1 + 10; i++) {
                    TotalPaginas.push(i + 1);
                }
            } else {
                // Si hay menos de 10 páginas después de la página actual, empieza más atrás para asegurar 10 páginas en total
                var inicio = Math.max(0, usuarios.totalPages - 10); // Asegúrate de no ir a un índice negativo
                for (var i = inicio; i < usuarios.totalPages; i++) {
                    TotalPaginas.push(i + 1);
                }
            }
  
            res.render('PanelUsuarios',{usuarios,Logeado, role,FiltroPaginado,Filtro,consulta,TotalPaginas})
        }catch(e){
            res.send(`<script>window.location.href='/PanelUsuarios';</script>`)
        }            

        }

    

    }

}

