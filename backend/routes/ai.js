const express = require('express');
const router = express.Router();
const { generateSummary, improveContent, generateSkills, generateCoverLetter, generateResume, analyzeResumeQuality } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/generate-summary', generateSummary);
router.post('/improve-content', improveContent);
router.post('/generate-skills', generateSkills);
router.post('/generate-cover-letter', generateCoverLetter);
router.post('/generate-resume', generateResume);
router.post('/analyze', analyzeResumeQuality);

module.exports = router;
