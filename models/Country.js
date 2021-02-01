const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
  },
})

module.exports = Country = mongoose.model('country', CountrySchema)
