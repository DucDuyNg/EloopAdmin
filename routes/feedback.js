const express = require('express');
const router = express.Router();
const feedback = require("../feedback/feedbackController")

/* GET users listing. */
router.get('/', feedback.getFeedback)
router.post('/', feedback.postFeedback)

module.exports = router;