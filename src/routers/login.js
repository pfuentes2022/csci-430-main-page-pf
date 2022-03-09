const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {

    const email = req.query.email
    const password = req.query.password

    console.log('Checking form')

    if (email === undefined || password === undefined) {
        console.log('Loading empty login screen')
        return res.render('login')
    }
    else {
        res.render('login')
    }
    /*if (email === 'eric@example.com' && password === 'test') {
        res.status(200).send({
            token: "abc123"
        })
    }*
    else {
        res.status(401).send()
    }*/
})

module.exports = router