const EmployeeInformationEnum = {
  EMPLOYEEID: 0,
  NAME: 1,
  HIREDATE: 2,
  WORKINGSTATUS: 3,
  DEPARTMENT: 5,
  PHONE: 6,
  MB_VT: 7,
  GMAIL: 8,
  DAY_ACTIVE: 9,
  PACKAGEC: 10,
  PACKAGE_USE: 11,
  ESIM_SIM: 12,
  SN: 13,
  ADDFEE: 14,
  PAYTIME: 15,
};

const EnumSim = {
  STT: 0,
  PHONE: 1,
  ESIM_SIM: 2,
  SERIAL_NUMBER: 3,
  OWNER: 4,
  STATUS: 5,
  OLD_PACKAGE: 6,
  NEW_PACKAGE: 7,
  ACTIVE_INACTIVE: 8,
  DEPARTMENT: 9,
  KEEPER: 10,
  QR_CODE_IMAGE: 11,
};

// thach
const enumTarget = {
  LINE: 0,
  DATE: 1,
  DAYTARGET: 2,
};

const PARTNAME = '/2025!';

const enumManPCSSALARY = {
  PARTNAME: PARTNAME,
  NAMESHEET: `${PARTNAME}A7:AO100`,
  LINE: 0,
  DATE: 1,
  DAYTARGET: 2,
};

// biii
const nameOfField = {
  Stationaries: 'Stationaries',
  RequestStationary: 'RequestStationary',
  Uniform: 'Uniform',
  RequestUniform: 'RequestUniform',
  RequestUniform: 'RequestUniform',
  Devices: 'Devices',
  RequestDevies: 'RequestDevies',
};

const enumRequest = {
  id: 0,
  name: 1,
  phone: 2,
  vppname: 3,
  vppnumber: 4,
  daysend: 5,
  status: 6,
  reason: 7,
  type: 8,
};

const enumStationary = {
  type: 0,
  stock: 1,
  actual: 2,
};

module.exports = { EmployeeInformationEnum, EnumSim, enumRequest, enumStationary, nameOfField, enumTarget, enumManPCSSALARY };
