import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container, Paper, AppBar, Toolbar } from '@mui/material';
import { useDispatch } from 'react-redux';  // Import useDispatch from Redux
import { loginUser } from '../Auth_api_services/authService';  // Import loginUser function
import { loginSuccess } from '../reducer/authReducer';  // Import Redux actions

type LoginPageProps = {
  onLogin: (role: string) => void
};

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Get dispatch function from Redux

  const handleLogin = async (event: any) => {
    event.preventDefault();

    try {
      const data = await loginUser(email, password, dispatch);
      if (data && data.role) {
        // Pass the role to the parent component
        onLogin(data.role);
        // console.log(data)
        dispatch(loginSuccess(data));

        // Navigate based on the role
        if (data.role === 'admin') {
          navigate('/admin');
        } else if (data.role === 'superadmin') {
          navigate('/superadmin');
        }
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Back!
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" align="center">
            Welcome Back!
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Log In
            </Button>
          </form>
          <Typography align="center" sx={{ mt: 2 }}>
            Don't have an account? <a href="/signup">Sign up</a>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default LoginPage;
