import { create } from "apisauce";

let inProdDev = false;
export const baseURL = "http://localhost:5000";
const apiClient = create({
  baseURL: baseURL,
  timeout: 25000,
});

const nextClient = create({
  baseURL: "/api/",
  timeout: 25000,
});

const APIServer = { apiClient, nextClient };

export default APIServer;