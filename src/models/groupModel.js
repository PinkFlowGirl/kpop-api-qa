const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  fandom: { type: String, required: true },
  debutYear: { type: Number, required: true },
  generation: { type: Number, default: null },
  members: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
