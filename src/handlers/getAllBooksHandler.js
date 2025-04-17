const books = require('../books');
const {getSuccessResponseWithData} = require('../utils/response');

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;

  const filteredBooks = books
      .filter((book) => {
      // Filter by name (if provided)
        if (name && !book.name.toLowerCase().includes(name.toLowerCase())) {
          return false;
        }

        // Filter by reading (if provided)
        if (reading !== undefined && book.reading !== (reading === '1')) {
          return false;
        }

        // Filter by finished (if provided)
        if (finished !== undefined && book.finished !== (finished === '1')) {
          return false;
        }

        return true;
      })
      .map(({id, name, publisher}) => ({
        id,
        name,
        publisher,
      }));

  return getSuccessResponseWithData(h, {books: filteredBooks});
};

module.exports = getAllBooksHandler;
