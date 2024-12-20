const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage:{type: String},
  questions: [{ type: mongoose.Schema.Types.Mixed, required: true }],
});

module.exports = mongoose.model('Form', formSchema);
