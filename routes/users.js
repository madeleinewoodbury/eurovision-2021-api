const express = require('express')
const router = express.Router()

// @route GET/api/users
// @desc ***TEST***
// @access Public
router.get('/', (req, res) => {
  res.json({ success: true, msg: 'Users route' })
})

module.exports = router
