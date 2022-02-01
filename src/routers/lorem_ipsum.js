const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/lorem_ipsum', (req, res) => {
    res.render('lorem_ipsum')
})

module.exports = router