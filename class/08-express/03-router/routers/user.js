

const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('this is a user get require')
})
// define the about route
router.post('/', function (req, res) {
  res.send('this is a user post require')
})

router.put('/', function (req, res) {
  res.send('this is a user put require')
})


router.delete('/', function (req, res) {
  res.send('this is a user delete require')
})


module.exports = router