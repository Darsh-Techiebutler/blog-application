import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, CircularProgress, Box } from '@mui/material';
import { toast } from 'react-toastify';
import HttpService from '../../APIS/superadmin/http_user_Services';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const AddUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        role: '',
        password: '',
    });
    const theme = useTheme(); // Get the current theme

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchUserData(id);
        }
    }, [id]);

    const fetchUserData = async (id: string) => {
        try {
            const response = await HttpService.getById(`/user`, id);
            setFormData({
                username: response.data.username,
                email: response.data.email,
                role: response.data.role,
                password: '',
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load user data.');
        }
    };

    const validate = () => {
        let valid = true;
        let newErrors = { username: '', email: '', role: '', password: '' };

        if (!formData.username) {
            newErrors.username = 'Username is required';
            valid = false;
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }
        if (!formData.role) {
            newErrors.role = 'Role is required';
            valid = false;
        }
        if (!isEditing && !formData.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

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
        if (!validate()) return;

        setLoading(true);

        try {
            if (isEditing) {
                const response = await HttpService.put(`/user/${id}`, formData);
                console.log('User updated:', response.data);
                toast.success('User updated successfully!');
            } else {
                const response = await HttpService.post('/user', formData);
                console.log('User added:', response.data);
                toast.success('User added successfully!');
            }

            // Reset the form after submission
            setFormData({
                username: '',
                email: '',
                role: '',
                password: '',
            });

            // Navigate to the user list after success
            navigate('/superadmin/users');
        } catch (err: any) {
            setLoading(false);

            if (err.response && err.response.status === 409) {
                const errorMessage = err.response.data?.error || 'A conflict occurred while processing the user';
                toast.error(errorMessage);
            } else {
                toast.error(err.message || 'An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                margin: 'auto',
                padding: 2,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: 2,
            }}
        >
            <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>

            <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                InputLabelProps={{
                    style: { color: theme.palette.text.primary },
                }}
                InputProps={{
                    style: { color: theme.palette.text.primary },
                }}
                error={!!errors.username}
                helperText={errors.username}
            />

            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                margin="normal"
                InputLabelProps={{
                    style: { color: theme.palette.text.primary },
                }}
                InputProps={{
                    style: { color: theme.palette.text.primary },
                }}
                error={!!errors.email}
                helperText={errors.email}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel style={{ color: theme.palette.text.primary }}>Role</InputLabel>
                <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    sx={{ color: theme.palette.text.primary }}
                    error={!!errors.role}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="superadmin">SuperAdmin</MenuItem>
                </Select>
                {errors.role && <Box color="error.main">{errors.role}</Box>}
            </FormControl>

            <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                // required={!isEditing} // Make password field required only if editing
                margin="normal"
                InputLabelProps={{
                    style: { color: theme.palette.text.primary },
                }}
                InputProps={{
                    style: { color: theme.palette.text.primary },
                }}
                error={!!errors.password}
                helperText={errors.password}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                    marginTop: 2,
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                    },
                }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : isEditing ? 'Update User' : 'Add User'}
            </Button>
        </Box>
    );
};
