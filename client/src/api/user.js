import axios from "axios"

export const registerUser = async (formData) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/signup", formData);
    return response.data;
  } catch (error) {
    return error;
  }
};


export const login = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  export const getAllUSers = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/users/`);
      return response.data;
    } catch (error) {
      return error;
    }
  };