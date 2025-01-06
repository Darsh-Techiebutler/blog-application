import { JwtPayload, jwtDecode } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
    role: string;
    userId: string;
}

// Function to extract role from the JWT
export const getUserRoleFromToken = (token: string | null): string | null => {
    if (!token) return null;
    try {
        // Decode the token and cast it to DecodedToken type
        const decodedToken: DecodedToken = jwtDecode(token);
        return decodedToken.role || null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};

// Function to extract user ID from the JWT
export const getUserIdFromToken = (token: string | null): string | null => {
    if (!token) return null;

    try {
        // Decode the token and cast it to DecodedToken type
        const decodedToken = jwtDecode<DecodedToken>(token);
        return decodedToken.userId || null;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
};
