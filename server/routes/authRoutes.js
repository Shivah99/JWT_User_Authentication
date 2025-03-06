const { Router } = require('express');
const { register, login } = require('../controllers/authControllers');
const { checkUser } = require('../middlewares/authMiddlewares');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', checkUser);

module.exports = router;
