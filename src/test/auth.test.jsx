// src/test/auth.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Login from '../pages/Login';

vi.mock('../context/AuthContext', async () => ({
    useAuth: vi.fn(),
    AuthProvider: ({ children }) => <div>{children}</div>
}));

describe('Auth Tests', () => {
    it('should render login form correctly', () => {
        useAuth.mockReturnValue({
            login: vi.fn(),
            user: null
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('should handle successful login', async () => {
        const mockNavigate = vi.fn();
        const mockLogin = vi.fn().mockResolvedValue({ success: true });

        vi.mock('react-router-dom', async () => ({
            ...await vi.importActual('react-router-dom'),
            useNavigate: () => mockNavigate
        }));

        useAuth.mockReturnValue({
            login: mockLogin,
            user: null
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), {
            target: { value: 'admin@mail.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('Password'), {
            target: { value: 'supersecret' }
        });
        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(mockLogin).toHaveBeenCalledWith('admin@mail.com', 'supersecret');
    });
});
