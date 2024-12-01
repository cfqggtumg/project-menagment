import axios from 'axios';

export const runCypressTests = async () => {
    try {
        const response = await axios.post('http://localhost:9000/api/run-tests');
        return response.data.results;
    } catch (error) {
        console.error('Error running Cypress tests:', error);
        return [];
    }
};