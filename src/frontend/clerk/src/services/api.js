import axios from "axios";

const clerkApiUrl = "http://localhost:8081/api"

export const clerkApi = axios.create({
    baseURL: clerkApiUrl,
    timeout: 5000,
});