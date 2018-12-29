const express = require('express')
const path = require('path')
const app = express()

const blog = require('./routes/blog')
const butter = require('./config/cfg')

// app.disable("x-powered-by")

app.use(express.static(path.join(__dirname, "..", "dist")));
app.use('/blog/', blog)
app.use(express.json())

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

// const PORT = '3002'

// app.listen(PORT, (err) => {
//   if (err) console.log(`Oops! ${err}`)
//   console.log(`Listening on PORT: ${PORT}`) 
// })

module.exports = app