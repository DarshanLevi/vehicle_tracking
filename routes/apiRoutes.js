const express = require('express');
const router = express.Router();
const { getIntervalData,getAllEvents} = require('../controllers/eventController');


router.get('/getIntervalData', getIntervalData);
router.get('/getAllEvents', getAllEvents);

module.exports = router;
