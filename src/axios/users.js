import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';

export const createUser = async (usuarioNombre, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      usuarioNombre,
      email,
      password,
    })

    return response
  } catch (error) {
    return error.response
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const verifyUser = async (email, code) => {
  try {
    const response = await axios.patch(`${BASE_URL}/auth/verify`, {
      email,
      code,
    });
    console.log(response)
    return response
  } catch (error) {
    console.log(error);
    return error.response.data.msg;
  }
}   

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
      email,
    });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);
    return error.response;
  }
}

export const getUserByTokenId = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/get-user-by-tokenid`, {
      token,
    },
    {
      headers: {
        "x-token" : token,
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export const recoveryPassword = async (password, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/auth/recovery-password`, {
      password,
    },
    {
      headers: {
        "x-token" : token,
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}

export const changePassword = async (oldpassword, newpassword, token) => {
  try {
    const response = await axios.patch(`${BASE_URL}/auth/change-password`, {
      oldpassword,
      newpassword
    },
    {
      headers: {
        "x-token" : token,
      }
    });
    return response;
  } catch (error) {
    return error.response;
  }
}