const express = require('express')
const router = express.Router()

// @route GET/api/participants
// @desc ***TEST***
// @access Public
router.get('/', (req, res) => {
  res.json({ success: true, msg: 'Participants route' })
})

module.exports = router
