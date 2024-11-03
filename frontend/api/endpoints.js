import APIServer from "./client";

const { nextClient, apiClient } = APIServer;

const register = (data) =>
    apiClient.post(
        "/api/users/register",
        {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
        },
        {}
    );

const login = (data) =>
    apiClient.post(
        "/api/users/login",
        {
            email: data.email,
            password: data.password,
        },
        {}
    );

const restApi = {
    register,
    login,
};

export default restApi;