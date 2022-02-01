const express = require('express') 
const path = require('path')
const hbs = require('hbs')

const indexRouter = require('./routers/index') 
const loginRouter = require('./routers/login')
const createaccountRouter = require('./routers/create-account')
const mainRouter = require('./routers/main')
const loremRouter = require('./routers/lorem_ipsum')
const _404Router = require('./routers/404')

const app = express() 

const dir = path.join(__dirname, "../public") 
app.use(express.static(dir)) 

app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, "../templates")
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

app.use(indexRouter) 
app.use(loginRouter)
app.use(createaccountRouter)
app.use(mainRouter)
app.use(loremRouter)
app.use(_404Router) 

const port = process.env.PORT || 3000 
app.listen(port, () => { 
    console.log('Server is up on port ' + port) 
})