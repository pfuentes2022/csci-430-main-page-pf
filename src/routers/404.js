const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/404', (req, res) => {
    res.render('404')
})

module.exports = router