const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); 
const authMiddleware = require('../middleware/authMiddleware'); 



router.get('/my/personal-list', authMiddleware, async (req, res) => {
  try {
    console.log("Fetching complaints for user ID:", req.user.id);
  
    const myComplaints = await Complaint.find({ createdBy: req.user.id })
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(myComplaints);
  } catch (error) {
    console.error('Error fetching user complaints:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, category, description, location, isAnonymous } = req.body;
    const newComplaint = new Complaint({
      title,
      category,
      description,
      location,
      isAnonymous: isAnonymous || false,
      createdBy: req.user.id, 
      status: 'Pending'
    });
    await newComplaint.save();
    res.status(201).json({ message: 'Complaint registered successfully', complaint: newComplaint });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('createdBy', 'name').sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('createdBy', 'name');
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, title, category, description, location } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (description) updateData.description = description;
    if (location) updateData.location = location;

    const updatedComplaint = await Complaint.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!deletedComplaint) return res.status(404).json({ message: 'Complaint not found' });
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;