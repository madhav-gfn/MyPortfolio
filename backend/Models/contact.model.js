const mongoose= require('mongoose');
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true      // saves emails in lowercase consistently
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  }
}, { timestamps: true }); // ✅ track when messages are created

const ContactMe = mongoose.model("ContactMe", contactSchema);
module.exports = ContactMe;
