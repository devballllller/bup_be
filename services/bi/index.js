const { EmployeeInformationEnum, enumRequest, enumStationary, nameOfField } = require('../../constants/enumValue');

const {
  sendRequestBI,
  getAllUserBI,
  getAllVPPBI,
  postVpp,
  getAllVppRequest,
  insertStatusVPP,
  insertVPPBI,
  getAllUNFBI,
  insertUNFBI,
  getAllDVEBI,
  insertDVEBI,
} = require('../configService');

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
async function biGetAllUserSercvices() {
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
          gmail: els[EmployeeInformationEnum.GMAIL] || '',
          mb_vt: els[EmployeeInformationEnum.MB_VT] || '',
          dayactive: els[EmployeeInformationEnum.DAY_ACTIVE] || '',
          packagec: els[EmployeeInformationEnum.PACKAGEC] || '',
          packageuse: els[EmployeeInformationEnum.PACKAGE_USE] || '',
          esimsim: els[EmployeeInformationEnum.ESIM_SIM] || '',
          sn: els[EmployeeInformationEnum.SN] || '',
          addFee: els[EmployeeInformationEnum.ADDFEE] || '',
          payTime: els[EmployeeInformationEnum.PAYTIME] || '',
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

    const data1 = [];
    const data2 = [];
    const data3 = [];

    for (let i = 0; i < data.length; i++) {
      if (i % 3 === 0) {
        data1.push(data[i]);
      } else if (i % 3 === 1) {
        data2.push(data[i]);
      } else {
        data3.push(data[i]);
      }
    }

    return { data, data1, data2, data3 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// lấy các thiết bị
async function biGetAllDevicesSercvices() {
  try {
    const response = await getAllDVEBI();

    const data = response.flat();

    const data1 = [];
    const data2 = [];
    const data3 = [];

    for (let i = 0; i < data.length; i++) {
      if (i % 3 === 0) {
        data1.push(data[i]);
      } else if (i % 3 === 1) {
        data2.push(data[i]);
      } else {
        data3.push(data[i]);
      }
    }

    return { data, data1, data2, data3 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// lấy các đồng phục
async function biGetAllUniformSercvices() {
  try {
    const response = await getAllUNFBI();

    const data = response.flat();

    const data1 = [];
    const data2 = [];
    const data3 = [];

    for (let i = 0; i < data.length; i++) {
      if (i % 3 === 0) {
        data1.push(data[i]);
      } else if (i % 3 === 1) {
        data2.push(data[i]);
      } else {
        data3.push(data[i]);
      }
    }

    return { data, data1, data2, data3 };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
// lấy các yêu cầu vpp
async function biGetAllRequestVPPSercvices() {
  try {
    const response = await getAllVppRequest();
    let data = response.map((els) => {
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

    data = data.filter((els) => els.status == 'Chờ duyệt');

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//gửi yêu cầu vpp
async function biPostRequestVPPSercvices(id, name, phone, vppname, vppnumber, daysend, type) {
  try {
    const requestdATA = [id, name, phone, vppname, vppnumber, daysend, status, '', type];
    console.log(requestdATA);
    const response = await postVpp(requestdATA);

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//lấy yêu cầu vpp bởi phone
async function biGetRequestVPPUserSercvices(phone, type) {
  try {
    const response = await getAllVppRequest();
    console.log(phone, type);
    const data = response
      .filter((els) => els[enumRequest.phone] === phone && els[enumRequest.type] === type)
      .map((els) => ({
        id: els[enumRequest.id],
        name: els[enumRequest.name],
        phone: els[enumRequest.phone],
        vppname: els[enumRequest.vppname],
        vppnumber: els[enumRequest.vppnumber],
        daysend: els[enumRequest.daysend],
        status: els[enumRequest.status],
        reason: els[enumRequest.reason],
      }));

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//duyệt yêu cầu vpp
async function biAcceptAdminSercvices(id, status, reason, name, number) {
  console.log(id, status, reason, name, number, 'id, status, reason, name, number');
  try {
    const response = await getAllVppRequest();
    const { data, data1, data2, data3 } = await biGetAllVPPSercvices();

    const indexRow = response.findIndex((item) => item[enumRequest.id] === id);

    let range = `${nameOfField.RequestStationary}!${String.fromCharCode(65 + Number(enumRequest.status))}${indexRow + 2}`;

    await insertStatusVPP([status, reason], range);

    if (status != 'Từ chối') {
      for (let i = 0; i < data.length; i++) {
        if (data[i] == name) {
          const indexRow1 = data1.findIndex((els) => els == name);

          let range1 = `${nameOfField.Stationaries}!${String.fromCharCode(65 + Number(enumStationary.stock))}${indexRow1 + 2}`;

          console.log(indexRow1);
          const stock = Number(data2[indexRow1]) - Number(number);
          const actual = Number(data3[indexRow1]) + Number(number);

          console.log(Number(data2[indexRow1]), Number(data3[indexRow1]), 'stock, actual');
          await insertVPPBI([stock, actual], range1);
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i] == name) {
          const indexRow1 = data1.findIndex((els) => els == name);

          let range1 = `${nameOfField.Stationaries}!${String.fromCharCode(65 + Number(enumStationary.stock))}${indexRow1 + 2}`;

          console.log(indexRow1);
          const stock = Number(data2[indexRow1]) - Number(number);
          const actual = Number(data3[indexRow1]) + Number(number);

          console.log(Number(data2[indexRow1]), Number(data3[indexRow1]), 'stock, actual');
          await insertVPPBI([stock, actual], range1);
        }
      }
    }

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
  biGetAllDevicesSercvices,
  biGetAllUniformSercvices,
};
