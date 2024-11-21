import { default as axios } from "axios";
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const STRAPI_API_KEY = import.meta.env.VITE_BASE_URL;
const axiosClient = axios.create({
  baseURL: STRAPI_API_KEY,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data) => axiosClient.post("/user-resumes", { data });
const getUserResumes = (userEmail) =>
  axiosClient.get("/user-resumes?filters[userEmail][$eq]=" + userEmail, {
    userEmail,
  });
const getResumeById = (resumeId) =>
  axiosClient.get(`/user-resumes/${resumeId}?populate=*`);
const deleteResume = (resumeId) =>
  axiosClient.delete(`/user-resumes/${resumeId}`);

const updateResumePersonalDetail = (id, data) =>
  axiosClient.put(`/user-resumes/${id}`, { data });
export default {
  createNewResume,
  getUserResumes,
  updateResumePersonalDetail,
  getResumeById,
  deleteResume,
};
