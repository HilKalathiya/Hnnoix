const express = require('express');
const {exec} = require('child_process');

const {getAllConfigs, saveAllConfigs} = require('../controllers/editController');

const editRouter = express.Router();

editRouter.get('/all', getAllConfigs);

editRouter.post('/all', saveAllConfigs);

module.exports = editRouter;