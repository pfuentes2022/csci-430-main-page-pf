const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/main', (req, res) => {

    const token = req.query.token   // Does nothing
    //if(token == 'null') {
        res.render('main', {token}) // Token does not get defined
    //}

    //else {
    //   res.render('index')
    //}
    
})

module.exports = router