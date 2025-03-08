import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const API_CREDENTIALS = {
  username: "user",
  password: "a3489306-0f4d-4208-affd-881e805c020f",
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  auth: API_CREDENTIALS,
  headers: {
    "Content-Type": "application/json",
  },
});
