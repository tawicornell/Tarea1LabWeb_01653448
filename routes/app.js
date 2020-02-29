// routes/app.js
// De express obtiene una instancia del componente Router
let router = require('express').Router();
// Importa el controlador que creamos
let PagesController = require('../controllers/PagesController');


router.get('/create', PagesController.create);//SE NOMBRA EN PAGEcontroller para usarlo como un boton o un llamado pasivo igual como about



// Establece que al hacer una petición GET a la ruta / se conteste
// con las palabras "Hello World!"
router.get('/', PagesController.homepage);

// Identifica la ruta "/about" y la respuesta de la ruta
router.get('/about', PagesController.about);


//************************/
const express = require('express');
const app = express();
//funcion para leer los submits
app.use(express.urlencoded({ extended: true }));


//LEER TODO
//leer todos los json
const queries = require('../database/queries');
router.get('/read', (req, res) => {
    queries.products.getAll().then(products => {
        res.json(products); //responder con jsons
    });
        
});

//LEER UNO dado el parametro
//llamado post desde el html con submit, donde recibe llamada con el parametro id que va en la url, luego lo puede leer por medio de request.params[...] de ahi la url
router.post('/read/:id', (req, res) => {
  //mi archivo con funciones.serie de funciones.funcion(parametro). ... despues de funcion
 queries.products.read( req.params.id ) //req.params.algo de ahi toma la url
 .then(products => {
   res.render('pages/readOne',{ ...products}); //respuesta.Rendering HTML views se usa para ponerle los datos retrieved en el html con {{algo}}
 });


});

//BORRAR dado el parametro
router.post('/delete/:id', (req, res) => {

  queries.products.delete( req.params.id ).then(products => {
    res.redirect('/');
    //depues de funcion enviar a / ruta
  });
 
 });

//INSERTAR con post para poner pues te mandan

router.post('/create', (req, res) => {
  queries.products.create(req.body).then((data)=>{
    res.redirect('/');
  });
});

//UPDATE retrieve
router.post('/update/:id', (req, res) => {
  queries.products.read( req.params.id )
  .then(products => {
    res.render('pages/updateOne',{ ...products});
  });
});


//UPDATE REAL
router.post('/saveUpdate/:id', (req, res) => {
  //request.body toma lo que se envio en su total en el form submit input
  queries.products.update(req.body, req.params.id).then((data)=>{
    res.redirect('/');
  });
  });

//*****************//

// Exporta las configuraciones
module.exports = router;