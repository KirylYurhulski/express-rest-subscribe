require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const router = require('./routers/index')
const errorHandler = require('./middlewares/ErrorHandler')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(
    app.listen(PORT, (err) =>
      err
        ? console.log(
            `ERROR! Server has not been started on port ${PORT}, ${err}`
          )
        : console.log(`Server has been started on port ${PORT}`)
    )
  )
  .catch((err) => console.log(err))
