import axios from 'axios';
import { Dispatch, UnknownAction } from 'redux';
import { loginSuccess, loginFailure } from '../reducer/authReducer';
const API_URL = 'http://localhost:1717/api/auth';
// Define types for response
interface LoginResponse {
    token: string;
    role: string;
    email: string;
}

// Action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';


// interface LoginUserAction {
//     (dispatch: Dispatch, email: string, password: string): Promise<LoginResponse | undefined>;
// }

export const loginUser = async (email: string, password: string) => {
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

        const data: LoginResponse = await response.json();
        // Store the role and token in localStorage or sessionStorage
        localStorage.setItem('role', data.role);
        localStorage.setItem('token', data.token);

        // dispatch(loginSuccess(data));
        return data;
    } catch (error) {
        // dispatch(loginFailure((error as Error).message));  // Dispatch error if login fails
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
