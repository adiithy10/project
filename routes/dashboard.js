const express = require('express')
const router = express.Router()
const Complaint = require('../models/Complaint')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const total = await Complaint.countDocuments()
    const pending = await Complaint.countDocuments({ status: 'Pending' })
    const inProgress = await Complaint.countDocuments({ status: 'In Progress' })
    const resolved = await Complaint.countDocuments({ status: 'Resolved' })

    res.json({ total, pending, inProgress, resolved })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router