

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const mysql = require('mysql')
// const myConnection = require('express-myconnection')
const http = require('http')
const path = require("path")

const https = require('https')
const fs = require('fs');


const credential = {
  hostname: 'api-koibid.diligentsoftinter.com',
  key: fs.readFileSync("/etc/letsencrypt/live/api-koibid.diligentsoftinter.com/privkey.pem",'utf8'),
  cert: fs.readFileSync("/etc/letsencrypt/live/api-koibid.diligentsoftinter.com/cert.pem",'utf8'),
  ca: fs.readFileSync('/etc/letsencrypt/live/api-koibid.diligentsoftinter.com/chain.pem','utf8')
};
 
const httpsServer = https.createServer(credential,app)
const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer)


httpsServer.listen(444)
httpServer.listen(81)

io.on('connection', function (client) {

  console.log('client connect...', client.id);

  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  ocket.on("error", console.error);

  client.on('message', function name(data) {
    console.log(data);
    io.emit('message', data)
  })

  client.on('location', function name(data) {
    console.log('location');
    io.emit('location', data);
  })

  client.on('connect', function () {
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})
console.log('end')

// var server_port = process.env.PORT || 3000;
// server.listen(server_port, function (err) {
//   if (err) throw err
//   console.log('Listening on port %d', server_port);
// });