import axios from 'axios';

const API_URL = 'http://localhost:8080/api/appointments'; // đổi lại theo API backend của bạn

export const getAllAppointments = () => {
  return axios.get(`${API_URL}/all`);
};

export const updateAppointmentStatus = (id, status) => {
  return axios.put(`${API_URL}/${id}/status`, { status });
};
