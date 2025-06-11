import axios from "axios";

const baseDomain = "http://localhost:3000/api/";
const baseURL = `${baseDomain}`; 

const Client = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

Client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Client.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload(); // Logout qilish
    }
    return Promise.reject(error);
  }
);

console.log(localStorage.getItem);

export default Client