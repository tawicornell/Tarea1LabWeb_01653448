// Importa el modelo de productos
let ProductModel = require('../models/Product')

// Reglas para la respuesta para la petición "/"
// permite el uso de homepages en router
exports.homepage = (req, res) => {
  ProductModel.all()
    .then((data) => {
      let products = data;
      res.render('pages/homepage', { products: products });
    });
}

exports.about = (req, res) => {
  res.send('About us');
}

//como se usa en un get y depende de un bottom no de un input  se puede usar al caragr una llmada de ruta se maraca aqui
exports.create = (req, res) => {
  ProductModel.all()
  .then((data) => { let products = data;
    res.render('pages/create', { products: products });
  });
}
