const express = require('express')
const path = require('path')

const router = express.Router()



router.get('/create_account', (req, res) => {

    const email = req.query.email
    const password = req.query.password


    if (email === undefined || password === undefined) {
        console.log('Loading empty form')
        return res.render('create_account')
    }
    else {
        res.render('create_account')
    }

})

module.exports = router