import axios from 'axios';
import { Dispatch } from 'redux';
import { loginSuccess } from '../reducer/authReducer'; // Import your loginSuccess action
// import { loginSuccess, loginFailure } from '../reducer/authReducer';
const API_URL = 'http://localhost:1717/api/auth';
// Define types for response
interface LoginResponse {
    token: string;
    role: string;
    email: string;
}

// Action types
const LOGOUT = 'LOGOUT';


// interface LoginUserAction {
//     (dispatch: Dispatch, email: string, password: string): Promise<LoginResponse | undefined>;
// }


export const loginUser = async (email: string, password: string, dispatch: any) => {
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
        // Dispatch the loginSuccess action directly with user data and token
        localStorage.setItem('role', data.role);
        localStorage.setItem('token', data.token);
        dispatch(loginSuccess(data));


        return data; // Optionally return the data if needed
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
