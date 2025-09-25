import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7233",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
