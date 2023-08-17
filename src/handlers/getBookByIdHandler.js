const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithData,
} = require('../utils/response');

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = findBookById(bookId);
  if (!book) {
    return getFailedResponseWithMessage(h, 'Buku tidak ditemukan', 404);
  }
  return getSuccessResponseWithData(h, {book});
};
const findBookById = (bookId) => {
  return books.find((book) => book.id === bookId) || null;
};

module.exports = getBookByIdHandler;
