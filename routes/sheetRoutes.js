const express = require('express');
const { findEmployeeRestController, findEmployeeSalaryController } = require('../controllers/employee');
const { loginController } = require('../controllers/auth');
const { getSendAllRequestController, getSendRequestController, postSendRequestController } = require('../controllers/request');
const { getSendEmailController } = require('../controllers/email');
const limiter = require('../middlewares/rateLimit');

const router = express.Router();

// -----------------------=> auth
// router.post('/auth-login', limiter, loginController);
router.post('/auth-login', loginController);
// router.post('/find-rest', limiter, findEmployeeData);

// -----------------------=> find
router.post('/find-rest', findEmployeeRestController);
router.post('/find-salary', limiter, findEmployeeSalaryController);

// -----------------------=> send request
router.post('/get-all-send-request', getSendAllRequestController);
router.post('/get-send-request', getSendRequestController);
router.post('/post-send-request', postSendRequestController);

// -----------------------=> auto send email
router.post('/post-send-email', getSendEmailController);

module.exports = router;
