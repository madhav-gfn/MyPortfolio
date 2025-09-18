const mongoose= require('mongoose');
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,     // must have a title
    trim: true,         // remove spaces around it
    minlength: 3        // minimum 3 characters
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10       // at least 10 characters for meaningful description
  },
  techStack: {
    type: [String],     // array of strings
    required: true
  },
  github: {
    type: String,
    trim: true
  },
  liveDemo: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // ✅ adds createdAt & updatedAt

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;