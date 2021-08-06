if(process.env.NODE_ENV !== 'production') {
 require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

//Declaring the router
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')

//Ejs
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//Setting up Mongodb
const mongoose = require('mongoose')
//MongoCLient constructor
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

//Using the routers we have created in the routes folder
app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

//Setting the port on which the server is listening
app.listen(process.env.PORT || 3000)