const express = require('express');
const roomRoutes = require('./room.route');

const config = require('../../../config/vars');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

if (config.env === 'development') {
  /**
     * GET v1/docs
    */
  router.use('/docs', express.static('docs'));
}

router.use('/rooms', roomRoutes);

module.exports = router;
