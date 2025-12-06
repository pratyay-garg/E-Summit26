const express = require('express');
const RegisterUser = require('../controllers/RegisterUser')

const router = express.Router();


//Register
router.post('/register',RegisterUser);



module.exports = router;