const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  currentProject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  currentColumn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('Task', TaskSchema);
