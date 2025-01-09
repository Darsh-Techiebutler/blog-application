import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import HttpService from '../../APIS/superadmin/http_user_Services';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';

export const AddUser = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await HttpService.post('/user', formData); // API call
            console.log('User added:', response.data);

            // Reset the form
            setFormData({
                username: '',
                email: '',
                role: '',
                password: '',
            });

            // Display success toast and navigate
            toast.success('User added successfully!');
            navigate('/superadmin/users');
        } catch (err: any) {
            setLoading(false);

            // Handle specific error scenarios
            if (err.response && err.response.status === 409) {
                const errorMessage = err.response.data?.error || 'A conflict occurred while adding the user';
                toast.error(errorMessage);
            } else {
                toast.error(err.message || 'An unexpected error occurred.');
            }
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
            <h2>Add User</h2>

            <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                margin="normal"
            />

            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
                margin="normal"
            />

            <FormControl fullWidth required margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="superadmin">SuperAdmin</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
                margin="normal"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ marginTop: 2 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Add User'}
            </Button>
        </Box>
    );
};
