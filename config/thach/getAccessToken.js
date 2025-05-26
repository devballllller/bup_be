const { JWT } = require('google-auth-library');
const fs = require('fs');

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

async function getAccessToken() {
  const serviceAccount = JSON.parse(fs.readFileSync('./subtle-lambda-438005-m6-9c5ab8ef5764.json', 'utf8'));

  const client = new JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: SCOPES,
  });

  const tokens = await client.authorize();
  return tokens.access_token;
}

module.exports = {
  getAccessToken,
};
