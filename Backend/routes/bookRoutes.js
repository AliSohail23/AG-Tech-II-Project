import express from 'express';
import {
  uploadBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook
} from '../controllers/bookController.js';

const router = express.Router();


router.post('/',  uploadBook);
router.get('/', getAllBooks);
router.get('/:id', getSingleBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;