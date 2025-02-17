import axiosInstance from "../../services/axiosInstance";

export const fetchItemsApi = async () => {
  const response = await axiosInstance.get('/items');
  return response.data;
};

export const createItemApi = async (itemData) => {
  const response = await axiosInstance.post('/items', itemData);
  return response.data;
};

export const updateItemApi = async (id, updatedData) => {
  const response = await axiosInstance.put(`/items/${id}`, updatedData);
  return response.data;
};

export const deleteItemApi = async (id) => {
  const response = await axiosInstance.delete(`/items/${id}`);
  return response.data;
};
