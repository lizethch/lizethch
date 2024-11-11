import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

// Mock useAuth
vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('Login Component', () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        // Por defecto, simulamos que no hay usuario logueado
        useAuth.mockReturnValue({
            login: mockLogin,
            user: null
        });
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('renders login form with all necessary elements', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByText('Sistema de Carga de Datos')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('handles form input changes correctly', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });

    it('handles successful login correctly', async () => {
        mockLogin.mockResolvedValueOnce({ success: true });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

        fireEvent.change(emailInput, { target: { value: 'admin@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'supersecret' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('admin@mail.com', 'supersecret');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('handles failed login correctly', async () => {
        mockLogin.mockResolvedValueOnce({ success: false, error: 'Credenciales inválidas' });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });

        fireEvent.change(emailInput, { target: { value: 'wrong@mail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it('prevents form submission with empty fields', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);

        expect(mockLogin).not.toHaveBeenCalled();
    });

    it('redirects to dashboard if user is already logged in', async () => {
        // Configurar el mock para simular un usuario ya autenticado
        useAuth.mockReturnValue({
            login: mockLogin,
            user: { name: 'Test User', role: 'admin' }
        });

        // Renderizar el componente
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Esperar a que se llame a navigate
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        }, { timeout: 2000 }); // Aumentamos el timeout para dar más tiempo
    });

    it('clears error message when user starts typing', async () => {
        mockLogin.mockResolvedValueOnce({ success: false, error: 'Credenciales inválidas' });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Primero hacemos un intento fallido de login
        const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
        fireEvent.click(submitButton);

        // Esperamos a que aparezca el mensaje de error
        await waitFor(() => {
            expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
        });

        // Escribimos en el campo de email y verificamos que el error desaparezca
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'new@email.com' } });

        expect(screen.queryByText('Credenciales inválidas')).not.toBeInTheDocument();
    });
});