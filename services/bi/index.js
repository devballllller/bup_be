const { EmployeeInformationEnum } = require('../../constants/enumValue');

const { sendRequestBI, getAllUserBI, getAllVPPBI, postVpp, getAllVppRequest, insertStatusVPP } = require('../configService');

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

    const data = {
      name: dataRaw[0][EmployeeInformationEnum.NAME],
      phone: dataRaw[0][EmployeeInformationEnum.PHONE],
    };

    return data;
  } catch (error) {
    console.error(error);
    throw error; // Ném lỗi để hàm gọi có thể xử lý
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

    const data = response.map((els) => {
      if (els[enumRequest.phone] == phone) {
        return {
          id: els[enumRequest.id],
          name: els[enumRequest.name],
          phone: els[enumRequest.phone],
          vppname: els[enumRequest.vppname],
          vppnumber: els[enumRequest.vppnumber],
          daysend: els[enumRequest.daysend],
          status: els[enumRequest.status],
        };
      }
    });

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
};
