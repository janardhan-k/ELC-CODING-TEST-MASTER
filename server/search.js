// created for solution
// const products = require('./products.json');
const data      = require('./data');

function search(query) {
  return data.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
}

module.exports = search;