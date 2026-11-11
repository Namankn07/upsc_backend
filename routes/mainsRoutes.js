const express = require('express');
const router = express.Router();
const MainsSubmission = require('../models/MainsSubmission');

// 🚀 POST API: Answer Submit karne ke liye
router.post('/submit-answer', async (req, res) => {
  try {
    const { userId, questionId, questionTitle, answerText, fileUrl } = req.body;
    
    const newSubmission = new MainsSubmission({
      userId,
      questionId,
      questionTitle,
      answerText,
      fileUrl,
      status: 'Pending Evaluation'
    });

    await newSubmission.save();
    res.status(201).json({ success: true, message: "✅ Answer successfully submitted to Faculty Queue!", data: newSubmission });
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ success: false, message: "Server Error during submission." });
  }
});

// 🚀 GET API: User ki history dekhne ke liye
router.get('/my-submissions/:userId', async (req, res) => {
  try {
    const submissions = await MainsSubmission.find({ userId: req.params.userId }).sort({ submittedAt: -1 });
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching submissions." });
  }
});
// 🚀 GET API: Admin Dashboard ke liye saari copies nikalne ke liye
router.get('/admin/all-submissions', async (req, res) => {
  try {
    const submissions = await MainsSubmission.find().sort({ createdAt: -1 }); // Nayi copies sabse upar
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching admin submissions." });
  }
});
// 🚀 PUT API: Admin jab copy check karke marks dega tab yeh chalega
router.put('/admin/evaluate/:id', async (req, res) => {
  try {
    const { marks, feedback } = req.body;
    const updatedSubmission = await MainsSubmission.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'Evaluated', 
        marksAwarded: marks, 
        facultyFeedback: feedback 
      },
      { new: true }
    );
    res.status(200).json({ success: true, message: "Evaluation saved!", data: updatedSubmission });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving evaluation." });
  }
});
module.exports = router;