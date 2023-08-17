const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMessage,
} = require('../utils/response');

const deleteBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const bookIndex = findBookIndexById(bookId);
  if (bookIndex === -1) {
    return getFailedResponseWithMessage(
        h, 'Buku gagal dihapus. Id tidak ditemukan', 404,
    );
  }
  books.splice(bookIndex, 1);
  return getSuccessResponseWithMessage(h, 'Buku berhasil dihapus');
};
const findBookIndexById = (bookId) => {
  return books.findIndex((book) => book.id === bookId);
};

module.exports = deleteBookByIdHandler;
