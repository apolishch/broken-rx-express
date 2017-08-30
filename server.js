'use strict'

const express = require('express')
const timeout = require('connect-timeout')
const Rx = require('rx')
const http = require('http')

let app = express()
app.use(timeout('1s'))

app.get('/', (req, res) => {
  Rx.Observable.create((observer) => {
    observer.onNext({
      response: 'potato'
    })
    observer.onCompleted()
  })
  .delay(new Date(Date.now() + 2000))
  .subscribe((x) => {
    console.log('potato', res)
    res.status(200).send()
  })
})

app.use((err, req, res, next) => {
  if(err) {
    res.status(500).send('SOMETHING BROKE!')
  }
})

const httpServer = http.createServer(app)
httpServer.listen(3000, function () {
  console.log('Listening on port %d.', 3000)
})
