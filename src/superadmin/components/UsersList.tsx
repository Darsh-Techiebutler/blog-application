import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';
import { fetchUsers } from '../../APIS/superadmin/GetallUser'; // Import fetchUsers function

interface User {
    id: string;
    name: string;
    email: string;
}

const UsersList = ({ token }: { token: string }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const userData = await fetchUsers(token);
                setUsers(userData);
                setLoading(false);
            } catch (err) {
                // setError('Failed to fetch users');
                setLoading(false);
            }
        };

        getUsers();
    }, [token]);

    if (loading) return <CircularProgress />;
    if (error) return <Box>{error}</Box>;

    return (
        <List>
            {users.map((user) => (
                <ListItem key={user.id}>
                    <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
            ))}
        </List>
    );
};

export default UsersList;
