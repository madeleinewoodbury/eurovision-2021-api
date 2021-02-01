const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const Participant = require('../models/Participant')
const Country = require('../models/Country')
const User = require('../models/User')

// @route POST/api/participants
// @desc Create a participant
// @access Private
router.post(
  '/',
  auth,
  [
    check('country', 'Country is required').not().isEmpty(),
    check('artist', 'Artist name is required').not().isEmpty(),
    check('song', 'Song is required').not().isEmpty(),
    check('semifinal', 'Semifinal is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      // Check if user is authorized
      const user = await User.findById(req.user.id).select('-password')
      if (user.role !== 'admin') {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User not authorized' }] })
      }

      const country = await Country.findOne({
        name: req.body.country,
      })

      if (!country) {
        return res.status(400).json({ msg: 'Country not found' })
      }

      // Create new instance of participant
      const newParticipant = new Participant({
        country: {
          name: country.name,
          code: country.code,
          flag: country.flag,
        },
        artist: req.body.artist,
        song: req.body.song,
        image: req.body.image
          ? req.body.image
          : 'https://res.cloudinary.com/dsliohzpe/image/upload/v1612177797/ESC-2021/placeholder_jlghg4.jpg',
        bio: req.body.bio && req.body.bio,
        writtenBy: req.body.writtenBy ? req.body.writtenBy : 'Unknown',
        composedBy: req.body.composedBy ? req.body.composedBy : 'Unknown',
        semifinal: req.body.semifinal,
        final: req.body.final && req.body.final,
        video: req.body.video && req.body.video,
        points: req.body.points && req.body.points,
      })

      const participant = await newParticipant.save()
      res.json(participant)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
