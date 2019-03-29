

const express = require('express')
const router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('this is a blog get require')
})
// define the about route
router.post('/', function (req, res) {
  res.send('this is a blog post require')
})

router.put('/', function (req, res) {
  res.send('this is a blog put require')
})


router.delete('/', function (req, res) {
  res.send('this is a blog delete require')
})


module.exports = router