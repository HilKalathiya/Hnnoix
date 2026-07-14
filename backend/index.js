const express = require('express');
const { spawn } = require("child_process");
const {exec} = require("child_process");
const websocketManager = require('./src/websocket/websocketManager');
const http = require("http")


const  welcomeRouter  = require('./routes/welcome');
const setupRouter = require('./routes/setup');
const buildRouter = require('./routes/build');
const installRouter = require('./routes/install');
const editRouter = require('./routes/edit');
const binaryRouter = require('./routes/binaries');

const app = express();

app.use(express.json());

const server = http.createServer(app)
websocketManager.init(server)

app.use('/api',welcomeRouter);
app.use('/api/setup',setupRouter);
app.use('/api/build', buildRouter);
app.use('/api/install', installRouter);
app.use('/api/edit', editRouter);
app.use('/api/binary', binaryRouter);

server.listen(3000, ()=>{
  console.log("server listening on port 3000")
})
