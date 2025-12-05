import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
// import { setLogin } from '../../../store/authSlice'; // REMOVED
import { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import apiClient from '../../utils/apiClients.js';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function LoginPage() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setServerError('');
        try {
            // Call your backend login route
            const res = await apiClient("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            const resData = await res.json();
            if (!res.ok) {
                throw new Error(resData.message || "Login failed");
            }
            
            // --- THIS IS THE CORRECTED PART ---
            // On success, save the token to localStorage so ProtectedRoute can find it
            localStorage.setItem('token', resData.token);

            // --- Redirect to the admin dashboard ---
            navigate('/admin/dashboard');

        } catch (e) {
            setServerError(e.message);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f1f5f9', // neutral-gray-100
        }}>
            <Paper elevation={6} sx={{
                padding: { xs: 3, sm: 4 },
                width: '100%',
                maxWidth: '400px',
                margin: 2,
            }}>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
                        Admin Login
                    </Typography>
                    
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: emailRegex, message: "Enter a valid email" },
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    
                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {serverError && (
                        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                            {serverError}
                        </Typography>
                    )}
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : "Sign In"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
export default LoginPage;