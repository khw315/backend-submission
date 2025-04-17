const books = require('../books');
const {
  getFailedResponseWithMessage,
  getSuccessResponseWithMsgAndData,
} = require('../utils/response');

const validateBookPayload = ({name, readPage, pageCount}) => {
  if (!name) {
    return 'Gagal menambahkan buku. Mohon isi nama buku';
  }
  if (readPage > pageCount) {
    return 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari ' +
           'pageCount';
  }
  return null;
};

const generateBookId = async () => {
  try {
    const {nanoid} = await import('nanoid');
    return nanoid();
  } catch (error) {
    console.error('Error importing nanoid:', error);
    throw new Error('ID_GENERATION_FAILED');
  }
};

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

  const validationError = validateBookPayload({name, readPage, pageCount});
  if (validationError) {
    return getFailedResponseWithMessage(h, validationError, 400);
  }

  let id;
  try {
    id = await generateBookId();
  } catch {
    return getFailedResponseWithMessage(h, 'Internal server error!', 500);
  }

  const timestamp = new Date().toISOString();
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
    insertedAt: timestamp,
    updatedAt: timestamp,
  };

  const initialLength = books.length;
  books.push(newBook);

  if (books.length > initialLength) {
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
