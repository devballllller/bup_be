const express = require('express');
const { findEmployeeData, findEmployeeDataSalary } = require('../controllers/sheetController');
const { loginController } = require('../controllers/auth');
const limiter = require('../middlewares/rateLimit');

const router = express.Router();

// router.post('/auth-login', limiter, loginController);
router.post('/auth-login', loginController);
router.get('/auth-login', loginController);
// router.post('/find-rest', limiter, findEmployeeData);
router.post('/find-rest', findEmployeeData);
router.post('/find-salary', limiter, findEmployeeDataSalary);

module.exports = router;
