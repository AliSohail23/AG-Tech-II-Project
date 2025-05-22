import express from 'express';
import { 
  uploadPastPaper,
  getAllPastPapers,
  getSinglePastPaper,
  updatePastPaper,
  deletePastPaper,
  getRecentPapers
} from '../controllers/pastPaperController.js';

const router = express.Router();

// Routes

router.post('/', uploadPastPaper);
router.get('/', getAllPastPapers);
router.get('/recent', getRecentPapers);
router.get('/:id', getSinglePastPaper);
router.put('/:id', updatePastPaper);
router.delete('/:id', deletePastPaper);

export default router;
