// src/api/userService.ts
import axios from 'axios';

const API_URL = 'http://localhost:1717/api/user';

export const fetchUsers = async (token: string) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};
