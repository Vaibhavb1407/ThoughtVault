const express = require('express');
const router = express.Router();
const {
    getThoughts,
    setThought,
    updateThought,
    deleteThought,
} = require('../controllers/thoughtController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getThoughts).post(protect, setThought);
router.route('/:id').put(protect, updateThought).delete(protect, deleteThought);

module.exports = router;
