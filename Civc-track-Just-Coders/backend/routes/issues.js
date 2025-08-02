const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getIssues, createIssue, updateIssueStatus } = require('../controllers/issuesController');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // save to uploads/
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

// POST with image upload
router.post('/', upload.array('photo',5), createIssue); // photo is the form-data field name

router.get('/', getIssues);
router.patch('/:id/status', updateIssueStatus);

module.exports = router;
