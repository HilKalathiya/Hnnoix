const express = require('express');
const {exec, spwan} = require('child_process');
const { 
  startgnb, stopgnb, statusgnb, 
  startue, stopue, statusue,
  corestart, corestop
} = require('../controllers/binaryController');

const binaryRouter = express.Router();

binaryRouter.get('/gnb/start', startgnb)
binaryRouter.get('/gnb/stop', stopgnb)
binaryRouter.get('/gnb/status', statusgnb)


binaryRouter.get('/ue/start', startue)
binaryRouter.get('/ue/stop', stopue)
binaryRouter.get('/ue/status', statusue)

binaryRouter.get('/core/start', corestart)
binaryRouter.get('/core/stop', corestop)

module.exports = binaryRouter