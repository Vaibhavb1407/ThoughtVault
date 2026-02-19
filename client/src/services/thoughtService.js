import axios from 'axios';

const API_URL = 'http://localhost:5000/api/thoughts/';

const createThought = async (thoughtData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, thoughtData, config);
    return response.data;
};

const getThoughts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

const updateThought = async (id, thoughtData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, thoughtData, config);
    return response.data;
};

const deleteThought = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const thoughtService = {
    createThought,
    getThoughts,
    updateThought,
    deleteThought,
};

export default thoughtService;
