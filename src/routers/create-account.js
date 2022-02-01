const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/create_account', (req, res) => {
    res.render('create_account')
})

module.exports = router