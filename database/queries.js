//HABILITA EL USO DE KNEX EN ESTE componente
let appConfig = require('../configs/app');

const knexfile = require('../knexfile');

const knex = require('knex')(knexfile[appConfig.env]);

//FUNCION select alls
//permite el exports que se puedan invocar las funciones de aqui de forma externa
module.exports = {
    //tiene una coleccion asociada a products
    products:{
        //qeries de knex mysql
        getAll: function(){
            return knex('products')
        },

        read: function(id){
//return knex('products').select('ALGO',''algo2',...).where('id',id);
            return knex('products').where('id',id).first();
            // first(); //DA UN OBJETO NO UN ARRAY

        },
        create: function(products){
            return knex('products').insert({...products});
            //el post lo hace solo pero necesita hacer match
        },

        delete: function(id){
            return knex('products').where('id',id).del();
        },
        update: function(products, id){
            //... todo el products que halle de la tabla
            return knex('products').where('id',id).update({...products});
        }
        

    }
}