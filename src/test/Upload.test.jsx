// src/test/Upload.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Upload from '../pages/Upload';
import { useAuth } from '../context/AuthContext';

vi.mock('../context/AuthContext', () => ({
    useAuth: vi.fn()
}));

describe('Upload Component Tests', () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            user: { role: 'admin', name: 'Test Admin' }
        });
    });

    it('should render file upload component', () => {
        render(
            <BrowserRouter>
                <Upload />
            </BrowserRouter>
        );

        expect(screen.getByText(/sistema de carga de datos/i)).toBeInTheDocument();
        expect(screen.getByText(/choose file/i)).toBeInTheDocument();
    });

    it('should handle file selection', async () => {
        render(
            <BrowserRouter>
                <Upload />
            </BrowserRouter>
        );

        const file = new File(['name,email\nJohn,john@example.com'], 'test.csv', {
            type: 'text/csv'
        });

        const input = screen.getByLabelText(/choose file/i);
        fireEvent.change(input, { target: { files: [file] } });

        expect(screen.getByText('test.csv')).toBeInTheDocument();
    });
});
