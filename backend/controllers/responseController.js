const Response = require('../models/response');

// Submit a form response
const submitResponse = async (req, res) => {
  const { formId } = req.params;
  const { responses } = req.body; // Expecting an array of responses (questionId and answer)

  if (!responses || responses.length === 0) {
    return res.status(400).json({ error: 'Responses are required.' });
  }

  try {
    const formResponse = new Response({ formId, responses });
    await formResponse.save();
    res.status(201).json(formResponse);
  } catch (error) {
    console.error('Error saving form response:', error);
    res.status(500).json({ error: 'An error occurred while saving the response.' });
  }
};

module.exports = {
  submitResponse,
};
