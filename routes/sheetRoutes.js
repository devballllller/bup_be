const express = require('express');
const { findEmployeeRestController, findEmployeeSalaryController } = require('../controllers/employee');
const { loginController } = require('../controllers/auth');
const { getSendAllRequestController, getSendRequestController, postSendRequestController, insertAcceptController } = require('../controllers/request');
const { getSendEmailController } = require('../controllers/email');
const { uploadImage } = require('../controllers/image');
const { getAllAttendanceControllersH, authH, postAttendanceControllersH } = require('../controllers/h/h');

const limiter = require('../middlewares/rateLimit');
const { getAllTimekeepingControllers, insertTimekeepingControllers } = require('../controllers/timekeeping');

const router = express.Router();

router.get('/', (req, res) => {
  return res.json('ok');
});

// -----------------------=> auth
// router.post('/auth-login', limiter, loginController);
router.post('/auth-login', loginController);
// router.post('/find-rest', limiter, findEmployeeData);

// -----------------------=> find
router.post('/find-rest', findEmployeeRestController);
router.post('/find-salary', limiter, findEmployeeSalaryController);

// -----------------------=> send request
router.get('/get-all-send-request', getSendAllRequestController);
router.post('/get-send-request', getSendRequestController);
router.post('/post-send-request', postSendRequestController);

router.post('/insert-accept-request', insertAcceptController);

// -----------------------=> auto send email
router.post('/post-send-email', getSendEmailController);

// -----------------------=> post image
router.post('/post-email', uploadImage);

// -----------------------=> timekeeoing
router.get('/timekeeping', getAllTimekeepingControllers);
router.post('/timekeeping-insert', insertTimekeepingControllers);

// -----------------------=> H
router.post('/H/auth-login', authH);
router.post('/H/post-attendance', postAttendanceControllersH);
router.get('/H/get-all-attendance', getAllAttendanceControllersH);

module.exports = router;
