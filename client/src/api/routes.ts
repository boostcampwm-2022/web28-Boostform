const BASE_URL = process.env.REACT_APP_SERVER_ORIGIN_URL;

const API = {
  FORM: `${BASE_URL}/api/forms`,
  RESPONSE: `${BASE_URL}/api/responses`,
  LOGIN: `${BASE_URL}/api/users/redirect`,
  LOGOUT: `${BASE_URL}/api/users/logout`,
  USER_INFO: `${BASE_URL}/api/users`,
};

export default API;
