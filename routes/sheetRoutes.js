const express = require('express');
const { findEmployeeRestController, findEmployeeSalaryController } = require('../controllers/employee');
const { loginController } = require('../controllers/auth');
const { getSendAllRequestController, getSendRequestController, postSendRequestController, insertAcceptController } = require('../controllers/request');
const { getSendEmailController } = require('../controllers/email');
const { uploadImage } = require('../controllers/image');
const { getAllAttendanceControllersH, authH, postAttendanceControllersH, allSalaryHServicesControllersH } = require('../controllers/h/h');
const {
  biPostEmployeeController,
  biloginRequestController,
  bilSimInfoController,
  biGetAllVPPController,
  biPostRequestVPPController,
  biGetRequestVPPUserController,
  biAcceptAdminController,
  biGetAllRequestVPPController,
  biGetAllUserControllers,
} = require('../controllers/bi/index');
const {
  thachPostProductController,
  thachGetAllProductController,
  thachGetFilterProductController,
  getfilterProductNameThachController,
  thachPostPresentController,
  thachGetPresentController,
  thachGetStyleController,
} = require('../controllers/thach/index');

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
router.get('/H/get-all-salary', allSalaryHServicesControllersH);

// -----------------------=> Bi
router.post('/bi/post-employee', biPostEmployeeController);

router.post('/bi/login-request', biloginRequestController);
router.post('/bi/sim-info', bilSimInfoController); // LẤY TẤT THONG TIN SIM -> CHƯA XONG
router.get('/bi/get-all-vpp', biGetAllVPPController); // lấy tất cả văn phòng phẩm
router.post('/bi/request-vpp', biPostRequestVPPController); // gửi yêu cầu văn phòng phẩm
router.post('/bi/get-vpp-request-user', biGetRequestVPPUserController); // lấy các yêu cầu vpp
router.post('/bi/accept-admin', biAcceptAdminController); // duyệt yêu cầuu vpp
router.get('/bi/get-all-vpprequest', biGetAllRequestVPPController); // duyệt yêu cầuu vpp
router.get('/bi/get-all-user', biGetAllUserControllers); // lất tất cả người dùng

// -----------------------=> THACH
router.post('/thach/post-product', thachPostProductController);
router.post('/thach/post-present', thachPostPresentController);
router.post('/thach/get-present', thachGetPresentController);
router.get('/thach/get-all-product', thachGetAllProductController);
router.post('/thach/get-filter-product', thachGetFilterProductController);
router.post('/thach/get-product-name', getfilterProductNameThachController);
router.post('/thach/get-style', thachGetStyleController);

module.exports = router;
