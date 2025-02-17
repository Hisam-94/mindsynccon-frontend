import axiosInstance from './axiosInstance';

export const fetchBookingsApi = async () => {
  const response = await axiosInstance.get('/bookings');
  return response.data;
};

export const createBookingApi = async (bookingData) => {
  const response = await axiosInstance.post('/bookings', bookingData);
  return response.data;
};

export const cancelBookingApi = async (id) => {
  const response = await axiosInstance.delete(`/bookings/${id}`);
  return response.data;
};
