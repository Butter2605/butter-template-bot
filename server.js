const express = require('express')

function server() {
    const app = express()
const port = 5273

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}

module.exports = server