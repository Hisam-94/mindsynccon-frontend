import axiosInstance from '../../services/axiosInstance';

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const registerApi = async (userDetails) => {
  const response = await axiosInstance.post('/auth/register', userDetails);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

// Fetch all users
export const fetchUsersApi = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
  };
  
  // Fetch a single user by ID (optional if required)
  export const fetchUserByIdApi = async (userId) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  };
