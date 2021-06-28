import errorHandler from 'errorhandler'
import mongoose from 'mongoose'

import app from './app'
import { MONGODB_URI, SESSION_SECRET } from './util/secrets'

const path = require('path')
const express = require('express')
const mongoUrl = MONGODB_URI
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
// import client from '../../client'
    if(process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, '../../client/build')))

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client', 'build', 'index.html' ))
      })
    } else {
      app.get('/', (req, res) => {
        res.send("api running")
      })
    }
    // Start Express server
    app.listen(app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((err: Error) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())
