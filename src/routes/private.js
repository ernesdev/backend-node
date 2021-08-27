
const { Router } = require('express');

const router = Router();
const {ensureToken} = require('../utils/function');
router.use(ensureToken);
const { getUsers } = require('../controllers/index.controller');


/**
 * GET USER
 */
router.get('/users', getUsers);
module.exports = router;