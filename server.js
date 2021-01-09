const express = require("express")
const path = require("path")
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())

app.use(express.static(path.join(__dirname, "build")))

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "build", "index.html")))

app.listen(PORT, () => {
  console.log(`> Server is running on port ${PORT}`)
})