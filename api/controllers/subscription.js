'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var builder = require('xmlbuilder');
const jsf = require('json-schema-faker');
const chance = require('chance')
const faker = require('faker')
jsf.extend('chance', () => new chance.Chance());
jsf.extend('faker', () => faker);
/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  listCategories: getlist,
  TypesCategories: getTypes,
  SubscProduct: getProduct
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getlist(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var SubscCategory = { 
                  "name": "Товары для самых маленьких"
                  }
  res.json([SubscCategory]);
}


function getTypes(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var typeCategory = { 
                  "name": "Товары для самых маленьких", "subcategory": "памперсы", "type": "weekly"
                  }
  res.json([typeCategory]);
}

function getProduct(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  // var name = req.swagger.params.tea.value || 'white';
  var doc = builder.create('subscritions')
    .ele('subscription')
      .att('nameProduct', 'Памперсы1')
      .att('category', 'товары для самых маленьких')
      .att('subcategory', 'памперсы')
      .att('cost', '2')
      .up()
    .ele('subscription')
      .att('nameProduct', 'Памперсы2')
      .att('category', 'товары для самых маленьких')
      .att('subcategory', 'памперсы')
      .att('cost', '6')
      .up()  
  .end({ pretty: true });

  res.type('application/xml');
  res.set('x-template', 'subscritions.xsl')
  res.send(doc.toString());
}