const addNewBookHandler = require('./handlers/addNewBookHandler');
const getAllBooksHandler = require('./handlers/getAllBooksHandler');
const getBookByIdHandler = require('./handlers/getBookByIdHandler');
const deleteBookByIdHandler = require('./handlers/deleteBookByIdHandler');
const updateBookByIdHandler = require('./handlers/updateBookByIdHandler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
