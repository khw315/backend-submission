const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMessage,
} = require('../utils/response');

const findBookIndexById = (bookId) =>
  books.findIndex((book) => book.id === bookId);

const validateBookPayload = ({name, readPage, pageCount}) => {
  if (!name) {
    return 'Gagal memperbarui buku. Mohon isi nama buku';
  }
  if (readPage > pageCount) {
    return 'Gagal memperbarui buku. readPage tidak boleh lebih besar ' +
           'dari pageCount';
  }
  return null;
};

const updateBookByIdHandler = (request, h) => {
  const {bookId} = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const validationError = validateBookPayload({name, readPage, pageCount});
  if (validationError) {
    return getFailedResponseWithMessage(h, validationError, 400);
  }

  const bookIndex = findBookIndexById(bookId);
  if (bookIndex === -1) {
    return getFailedResponseWithMessage(
        h,
        'Gagal memperbarui buku. Id tidak ditemukan',
        404,
    );
  }

  books[bookIndex] = {
    ...books[bookIndex],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt: new Date().toISOString(),
  };

  return getSuccessResponseWithMessage(h, 'Buku berhasil diperbarui');
};

module.exports = updateBookByIdHandler;
