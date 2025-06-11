const express = require('express');
const router = express.Router();

// Define payment routes here
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Payment routes' });
});

module.exports = router;
