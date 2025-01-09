import React, { useEffect, useState } from 'react';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Container,
    Box,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@mui/material';
import { styled, Theme } from '@mui/system';
import HttpService from '../../APIS/superadmin/http_user_Services';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
    border: '1px solid #ddd',
}));

const TableContainerStyled = styled(TableContainer)(({ theme }: { theme: Theme }) => ({
    borderRadius: '8px',
    overflow: 'hidden',
    marginTop: '20px',
    backgroundColor: theme.palette.background.paper,
}));

const TableRowStyled = styled(TableRow)(({ theme }: { theme: Theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected,
    },
}));

const LoadingWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const ErrorWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
}));

const UsersList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        HttpService.get('/user')
            .then((response) => {
                setLoading(false);
                setUsers(response.data);
            })
            .catch((err) => {
                setLoading(false);
                console.error('Error fetching users:', err);
                setError(err.message || 'An unexpected error occurred.');

                // Check if the error status is 401 (Unauthorized)
                if (err.response && err.response.status === 401) {
                    // Redirect to the login page
                    navigate('/login'); // Adjust the path to your login page route
                }
            });
    }, [navigate]);

    const handleEdit = (id: string) => {
        console.log(`Edit user with ID: ${id}`);
    };

    const confirmDelete = (id: string) => {
        setDeleteUserId(id);
    };

    const cancelDelete = () => {
        setDeleteUserId(null);
    };

    const deleteUser = async () => {
        try {
            await HttpService.del(`/user/delete?id=${deleteUserId}`);

            // Remove the deleted user from the state
            setUsers(users.filter((user) => user.id !== deleteUserId));

            // Reset the delete user ID
            setDeleteUserId(null);
        } catch (err) {
            console.error('Error deleting user:', err);
            setError('Failed to delete the user. Please try again.');
        }
    };


    if (loading)
        return (
            <LoadingWrapper>
                <CircularProgress />
            </LoadingWrapper>
        );

    if (error)
        return (
            <ErrorWrapper>
                <Box textAlign="center">
                    <Typography variant="h6" color="error">
                        Error: {error}
                    </Typography>
                    <Typography variant="body1">
                        Please check your network connection or try refreshing the page.
                    </Typography>
                </Box>
            </ErrorWrapper>
        );

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    marginBottom: 4,
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    fontWeight: 'bold',
                }}
            >
                Users List Data
            </Typography>
            <TableContainerStyled>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Username</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Role</StyledTableCell>
                            <StyledTableCell>Created At</StyledTableCell>
                            <StyledTableCell>Updated At</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography variant="body1">No users found.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRowStyled key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(user.updatedAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleEdit(user.id)}
                                            aria-label={`Edit user ${user.username}`}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => confirmDelete(user.id)}
                                            aria-label={`Delete user ${user.username}`}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRowStyled>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainerStyled>

            <Dialog open={!!deleteUserId} onClose={cancelDelete}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteUser} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UsersList;
