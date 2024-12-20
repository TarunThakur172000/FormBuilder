const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById,deleteById } = require('../controllers/formController');

// Route to create a form
router.post('/', createForm);

// Route to get all forms
router.get('/', getAllForms);

// Route to get a form by ID
router.get('/:formId', getFormById);

router.delete('/:formId', deleteById);

module.exports = router;
