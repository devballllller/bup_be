const { EmployeeInformationEnum, EnumSim } = require('../../constants/enumValue');

const { sendRequestBI, getAllUserBI, getAllUserSimBI, getAllVPPBI, postVpp, getAllVppRequest, insertStatusVPP } = require('../configService');

const enumRequest = {
  id: 0,
  name: 1,
  phone: 2,
  vppname: 3,
  vppnumber: 4,
  daysend: 5,
  status: 6,
};

const status = 'Chờ duyệt';
const statusAccept = 'Duyệt';
const statusReject = 'Từ chối';

async function biPostEmployeeService(name, gender, dob, phone, permanentaddress, currentaddress, cmnd, cccd, issueddate, SIC, SIB, PITC) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await sendRequestBI([
        '',
        '',
        name,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        gender,
        dob,
        '',
        phone,
        '',
        permanentaddress,
        currentaddress,
        cmnd,
        cccd,
        issueddate,
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        SIC,
        SIB,
        PITC,
      ]);

      resolve(response);
    } catch (error) {
      reject(error);
      console.log(error);
    }
  });
}

// đăng nhập
async function biloginRequestSercvices(phone) {
  try {
    const response = await getAllUserBI();

    const dataRaw = response.filter((els) => els[EmployeeInformationEnum.PHONE] == phone);

    let data = [];
    if (dataRaw.length > 0) {
      data = {
        employeeId: dataRaw[0][EmployeeInformationEnum.EMPLOYEEID] || '',
        name: dataRaw[0][EmployeeInformationEnum.NAME] || '',
        department: dataRaw[0][EmployeeInformationEnum.DEPARTMENT] || '',
        hiredate: dataRaw[0][EmployeeInformationEnum.HIREDATE] || '',
        workingstatus: dataRaw[0][EmployeeInformationEnum.WORKINGSTATUS] || '',
        phone: dataRaw[0][EmployeeInformationEnum.PHONE] || '',
        packagec: dataRaw[0][EmployeeInformationEnum.PACKAGEC] || '',
        packageuse: dataRaw[0][EmployeeInformationEnum.PACKAGE_USE] || '',
        esimsim: dataRaw[0][EmployeeInformationEnum.ESIM_SIM] || '',
        sn: dataRaw[0][EmployeeInformationEnum.SN] || '',
        gmail: dataRaw[0][EmployeeInformationEnum.GMAIL] || '',
        mb_vt: dataRaw[0][EmployeeInformationEnum.MB_VT] || '',
        dayactive: dataRaw[0][EmployeeInformationEnum.DAY_ACTIVE] || '',
      };
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để hàm gọi có thể xử lý
  }
}

// lấy tất cả người dùng
async function biGetAllUserSercvices(phone) {
  try {
    let data = await getAllUserBI();

    if (data.length > 0) {
      data = data.map((els) => {
        return {
          employeeId: els[EmployeeInformationEnum.EMPLOYEEID] || '',
          name: els[EmployeeInformationEnum.NAME] || '',
          department: els[EmployeeInformationEnum.DEPARTMENT] || '',
          hiredate: els[EmployeeInformationEnum.HIREDATE] || '',
          workingstatus: els[EmployeeInformationEnum.WORKINGSTATUS] || '',
          phone: els[EmployeeInformationEnum.PHONE] || '',
          packagec: els[EmployeeInformationEnum.PACKAGEC] || '',
          packageuse: els[EmployeeInformationEnum.PACKAGE_USE] || '',
          esimsim: els[EmployeeInformationEnum.ESIM_SIM] || '',
          sn: els[EmployeeInformationEnum.SN] || '',
          gmail: els[EmployeeInformationEnum.GMAIL] || '',
          mb_vt: els[EmployeeInformationEnum.MB_VT] || '',
          dayactive: els[EmployeeInformationEnum.DAY_ACTIVE] || '',
        };
      });
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// lấy các vpp
async function biGetAllVPPSercvices() {
  try {
    const response = await getAllVPPBI();

    const data = response.flat();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// lấy các yêu cầu vpp
async function biGetAllRequestVPPSercvices() {
  try {
    const response = await getAllVppRequest();

    const data = response.map((els) => {
      return {
        id: els[enumRequest.id],
        name: els[enumRequest.name],
        phone: els[enumRequest.phone],
        vppname: els[enumRequest.vppname],
        vppnumber: els[enumRequest.vppnumber],
        daysend: els[enumRequest.daysend],
        status: els[enumRequest.status],
      };
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//gửi yêu cầu vpp
async function biPostRequestVPPSercvices(id, name, phone, vppname, vppnumber, daysend) {
  try {
    const requestdATA = [id, name, phone, vppname, vppnumber, daysend, status];
    console.log(requestdATA);
    const response = await postVpp(requestdATA);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//lấy yêu cầu vpp bởi phone
async function biGetRequestVPPUserSercvices(phone) {
  try {
    const response = await getAllVppRequest();

    const data = response
      .filter((els) => els[enumRequest.phone] === phone)
      .map((els) => ({
        id: els[enumRequest.id],
        name: els[enumRequest.name],
        phone: els[enumRequest.phone],
        vppname: els[enumRequest.vppname],
        vppnumber: els[enumRequest.vppnumber],
        daysend: els[enumRequest.daysend],
        status: els[enumRequest.status],
      }));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//lấy yêu cầu vpp bởi phone
async function biAcceptAdminSercvices(id, status) {
  try {
    const response = await getAllVppRequest();

    const indexRow = response.findIndex((item) => item[enumRequest.id] === id);

    let range = `Request!${String.fromCharCode(65 + Number(enumRequest.status))}${indexRow + 2}`;

    await insertStatusVPP([status], range);
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  biPostEmployeeService,
  biloginRequestSercvices,
  biGetAllVPPSercvices,
  biPostRequestVPPSercvices,
  biGetRequestVPPUserSercvices,
  biAcceptAdminSercvices,
  biGetAllRequestVPPSercvices,
  biGetAllUserSercvices,
};
