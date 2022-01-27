const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/main', (req, res) => {
    res.render('main')
})

module.exports = router