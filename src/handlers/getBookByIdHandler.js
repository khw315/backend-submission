const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithData,
} = require('../utils/response');

const findBookById = (bookId) =>
  books.find((book) => book.id === bookId) || null;

const getBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const book = findBookById(bookId);

  if (!book) {
    return getFailedResponseWithMessage(h, 'Buku tidak ditemukan', 404);
  }

  return getSuccessResponseWithData(h, {book});
};

module.exports = getBookByIdHandler;
