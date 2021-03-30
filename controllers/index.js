const router = require('express').Router();
// Handle views
const homeRoutes = require('./homeRoutes');
// Handle data
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
