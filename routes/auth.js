const express = require('express')
const router = express.Router()

// @route GET/api/auth
// @desc ***TEST***
// @access Public
router.get('/', (req, res) => {
  res.json({ success: true, msg: 'Auth route' })
})

module.exports = router
