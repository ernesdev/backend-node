const { Router } = require('express');
const router = Router();

const { createUsers, signIn } = require('../controllers/index.controller');

/**
 * AUTH
 */
router.post('/sign-in', signIn)
router.post('/sign-up', createUsers)

module.exports = router;