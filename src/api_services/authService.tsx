import axios from 'axios';
import { Dispatch } from 'redux';
const API_URL = 'http://localhost:1717/api/auth';
// Define types for response
interface LoginResponse {
    token: string;
    role: string;
}

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';


// This is the async action creator
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        // Store the role and token in localStorage or sessionStorage
        localStorage.setItem('role', data.role); // Example: 'admin' or 'superadmin'
        localStorage.setItem('token', data.token);
        return data;

    } catch (error) {
        console.error(error);
        throw new Error('Login failed');
    }
};


// Logout action
export const logoutUser = () => (dispatch: Dispatch) => {
    localStorage.removeItem('token');

    dispatch({
        type: LOGOUT,
    });
};

// Registration action (unchanged)
export const registerUser = async (username: string, email: string, password: string, role: string) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { username, email, password, role });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Registration failed');
    }
};
