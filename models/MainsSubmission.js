const mongoose = require('mongoose');

const mainsSubmissionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  questionId: { type: String, required: true },
  questionTitle: { type: String, required: true },
  answerText: { type: String }, // Agar student type karke answer de
  fileUrl: { type: String }, // Agar Photo/PDF upload kare (AWS S3 ya Cloudinary URL)
  status: { type: String, enum: ['Pending Evaluation', 'Evaluated'], default: 'Pending Evaluation' },
  marksObtained: { type: String, default: 'N/A' },
  facultyFeedback: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MainsSubmission', mainsSubmissionSchema);