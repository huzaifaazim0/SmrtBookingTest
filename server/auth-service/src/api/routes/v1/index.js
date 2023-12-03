const express = require('express');
const authRoutes = require('./auth.route');

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

router.use('/auth', authRoutes);

module.exports = router;
