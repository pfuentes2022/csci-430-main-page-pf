const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/main', (req, res) => {

    const token = req.query.token
    //if(token == 'abc123') {
    res.render('main', {token:token})
    //}

    //else {
       // res.render('index')
    //}
    
})

module.exports = router