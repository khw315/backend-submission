const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMsgAndData,
} = require('../utils/response');

const addNewBookHandler = async (request, h) => {
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
  if (!name || readPage > pageCount) {
    const message = !name ?
      'Gagal menambahkan buku. Mohon isi nama buku' :
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
    return getFailedResponseWithMessage(h, message, 400);
  }
  let nanoid;
  try {
    const nanoidModule = await import('nanoid');
    nanoid = nanoidModule.nanoid;
  } catch (error) {
    console.error('Error importing nanoid:', error);
    return getFailedResponseWithMessage(
        h,
        'Internal server error!',
        500,
    );
  }
  const id = nanoid();
  const currentISODate = new Date().toISOString();
  const finished = pageCount === readPage;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    insertedAt: currentISODate,
    updatedAt: currentISODate,
  };
  const newLength = books.push(newBook);
  if (books.length === newLength) {
    return getSuccessResponseWithMsgAndData(
        h,
        'Buku berhasil ditambahkan',
        {bookId: id},
        201,
    );
  }
  return h.response({
    status: 'error',
    message: 'Catatan gagal ditambahkan',
  }).code(500);
};

module.exports = addNewBookHandler;
