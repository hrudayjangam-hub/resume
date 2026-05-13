const express = require('express');
const router = express.Router();
const { getResumes, getResume, createResume, updateResume, patchResumeSection, deleteResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', getResumes);
router.post('/create', createResume);
router.get('/:id', getResume);
router.put('/update/:id', updateResume);
router.patch('/patch/:id', patchResumeSection);
router.delete('/delete/:id', deleteResume);

module.exports = router;
