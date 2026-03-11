import API from "./axiosinstant";
const BASE_URL = "/listing";

export const createLs = async ({
  title,
  location,
  image,
  description,
  price,
}) => {
  try {
    const response = await API.post(
      `${BASE_URL}/create`,
      { title, location, image, description, price },
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

export const updateLs = async ({
  title,
  location,
  image,
  description,
  price,
  id,
}) => {
  try {
    const response = await API.post(
      `${BASE_URL}/update`,
      { title, location, image, description, price, id },
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

export const getExperiences = async () => {
  try {
    const response = await API.post(`${BASE_URL}/fetch`);
    return response;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);
    const response = await API.post(`${BASE_URL}/uploadImage`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteList = async (id) => {
  try {
    const reponse = await API.post(
      `${BASE_URL}/deleteListing`,
      { id },
      { withCredentials: true },
    );
    return reponse;
  } catch (error) {
    return {
      status: error.response.status,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
