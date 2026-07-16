const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.get('/', itineraryController.list);
router.post('/', itineraryController.create);
router.delete('/:id', itineraryController.remove);

module.exports = router;
