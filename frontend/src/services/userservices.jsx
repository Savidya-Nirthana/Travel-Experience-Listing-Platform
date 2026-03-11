import API from "./axiosinstant";
const BASE_URL = "/user";

export const verifyUser = async () => {
  try {
    const response = await API.post(
      `${BASE_URL}/verify`,
      {},
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const logingUser = async (email, password) => {
  try {
    const response = await API.post(
      `${BASE_URL}/login`,
      { email, password },
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const logOut = async () => {
  try {
    const response = await API.post(
      `${BASE_URL}/logOut`,
      {},
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (
  firstname,
  lastname,
  dob,
  gender,
  email,
  password,
) => {
  try {
    const response = await API.post(
      `${BASE_URL}/register`,
      { firstname, lastname, dob, gender, email, password },
      { withCredentials: true },
    );
    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
