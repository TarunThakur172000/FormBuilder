const express = require('express');
const router = express.Router();
const { submitResponse } = require('../controllers/responseController');

// Route to submit form response
router.post('/:formId/response', submitResponse);

module.exports = router;
