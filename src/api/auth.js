import axios from 'axios';

const API_URL = 'http://52.201.237.41:5000/api/auth';

export const signup = (userData) => axios.post(`${API_URL}/signup`, userData);
export const login = (userData) => axios.post(`${API_URL}/login`, userData);
export const editProfile = (email, profileData) => axios.put(`${API_URL}/edit-profile/${email}`, profileData);
export const forgotPassword = (email) => axios.post(`${API_URL}/forgot-password`, { email });
export const resetPassword = async (token, data) => {
  return await axios.post(`/api/auth/reset-password/${token}`, data);
};

export const getUserData = async (email) => {
  const res = await axios.get(`/api/auth/user/${email}`);
  return res.data;
};

// Update user data by email
export const updateUserData = async (email, data) => {
  const res = await axios.put(`/api/auth/user/${email}`, data);
  return res.data;
};

export const uploadProfilePicture = async (formData) => {
  return await axios.post('/api/auth/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
  });
}


