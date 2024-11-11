// src/test/validation.test.jsx
import { describe, it, expect } from 'vitest';
import { validateField } from '../utils/validators';

describe('Validation Tests', () => {
    it('should validate email field correctly', () => {
        expect(validateField('email', 'valid@email.com')).toBeNull();
        expect(validateField('email', 'invalid-email')).toBe('El formato del email es inválido');
    });

    it('should validate age field correctly', () => {
        expect(validateField('age', '25')).toBeNull();
        expect(validateField('age', '-1')).toBe('La edad debe ser un número positivo');
        expect(validateField('age', '150')).toBe('La edad debe ser menor a 120 años');
    });

    it('should validate name field correctly', () => {
        expect(validateField('name', 'John Doe')).toBeNull();
        expect(validateField('name', '')).toBe('El nombre no puede estar vacío');
        expect(validateField('name', 'a'.repeat(51))).toBe('El nombre debe tener menos de 50 caracteres');
    });

    it('should validate role field correctly', () => {
        expect(validateField('role', 'admin')).toBeNull();
        expect(validateField('role', 'user')).toBeNull();
        expect(validateField('role', 'invalid')).toBe('El rol debe ser "admin" o "user"');
    });

    it('should validate password field correctly', () => {
        expect(validateField('password', 'password123')).toBeNull();
        expect(validateField('password', '12345')).toBe('La contraseña debe tener al menos 6 caracteres');
    });
});