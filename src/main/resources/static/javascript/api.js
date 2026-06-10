const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
    // Método genérico para requisições POST com JSON no corpo
    async post(endpoint, body) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            console.error("Erro na requisição POST:", error);
            throw error;
        }
    },

    // Método genérico para requisições POST
    async postWithParams(endpoint, params) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${API_BASE_URL}${endpoint}?${queryString}`, {
                method: 'POST'
            });
            return response;
        } catch (error) {
            console.error("Erro na requisição POST com Params:", error);
            throw error;
        }
    },

    // Método genérico para requisições GET
    async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET'
            });
            return response;
        } catch (error) {
            console.error("Erro na requisição GET:", error);
            throw error;
        }
    },

    async put(endpoint, body) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return response;
        } catch (error) {
            console.error("Erro na requisição PUT:", error);
            throw error;
        }
    },
};