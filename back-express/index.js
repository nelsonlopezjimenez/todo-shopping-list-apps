const express = require('express')

const { extname } = require('path')
const cors = require('cors');
const marked = require('marked');

const app = express();
const PORT = 22032

app.use(express.static('public'))
app.use(express.static('views'))
app.use(cors())


app.get('/', (req, res) => {
    res.render('home.ejs')
})
app.get('/quarter1', (req, res) => {
    res.render('week000.ejs')
})
app.get('/quarter2', (req, res) => {
    res.render('quarter2/home.ejs')
})
app.get('/calendar', (req, res) => {
    res.render('calendar000.ejs')
})
app.get('/youtube.nel', (req, res) => {
    res.render('videos000.ejs')
})
app.get('/youtube.nel', (req, res) => {
    res.render('videos000.ejs')
})
app.get('/cfc', (req, res) => {
    res.render('cfc.ejs')
})

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`)
})