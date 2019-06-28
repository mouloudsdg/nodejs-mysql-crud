const express = require('express')
const bodyparser = require('body-parser')
const session = require('express-session')
const flash = require("./middlewares/flash")

const app = express()

const {getHomePage, addPost, getPost, delPost, upPost} = require("./routes/routes.js")


const port = process.env.PORT || 8080

// Template engine
app.set('view engine', 'ejs')

// Middleware
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(flash)


// Routes
app.get('/',getHomePage)

app.post('/',addPost)

app.get("/post/:id",getPost)

app.get("/post/del/:id",delPost)

app.post("/post/up/:id", upPost)


app.listen(port, () => {
  console.log(`Server running on port: ${port} `)
})