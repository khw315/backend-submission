const books = require('../books');
const {getSuccessResponseWithData} = require('../utils/response');

const getAllBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let filteredBooks = [];
  if (name) {
    filteredBooks = getFilteredBooksByName(name);
  } else if (reading) {
    filteredBooks = getFilteredBooksByReading(reading);
  } else if (finished) {
    filteredBooks = getFilteredBooksByFinished(finished);
  } else {
    filteredBooks = getFilteredBooks();
  }
  return getSuccessResponseWithData(h, {books: filteredBooks});
};
const getFilteredBooksByName = (name) => {
  const booksByName = books.filter((book) =>
    book.name.toUpperCase().includes(name.toUpperCase()),
  );
  return getFilteredBooks(booksByName);
};
const getFilteredBooksByFinished = (finished) => {
  const finishBool = finished === '1';
  const booksByFinished = books.filter((book) => book.finished === finishBool);
  return getFilteredBooks(booksByFinished);
};
const getFilteredBooksByReading = (reading) => {
  const readBool = reading === '1';
  const booksByReading = books.filter((book) => book.reading === readBool);
  return getFilteredBooks(booksByReading);
};
const getFilteredBooks = (unfilteredBooks = books) => {
  return unfilteredBooks.map(({id, name, publisher}) => ({
    id,
    name,
    publisher,
  }));
};

module.exports = getAllBooksHandler;
