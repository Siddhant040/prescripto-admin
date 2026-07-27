import api from "./axios";
export const adminLogin = async (userData) => {
const response = await api.post("/auth/login", userData);
return response.data    
}
export const getCurrentUser = async ()=>{
  const response = await api.get("/auth/me");
  return response.data;
}
export const  refreshAccessToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};
