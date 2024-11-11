// src/test/csv.test.jsx
import { describe, it, expect } from 'vitest';
import { processCSVContent } from '../services/csv.service';

describe('CSV Service Tests', () => {
    it('should process valid CSV content correctly', () => {
        const csvContent = 'name,email,age\nJohn Doe,john@example.com,30';
        const result = processCSVContent(csvContent);

        expect(result.success).toHaveLength(1);
        expect(result.errors).toHaveLength(0);
        expect(result.success[0]).toMatchObject({
            name: 'John Doe',
            email: 'john@example.com',
            age: '30'
        });
    });

    it('should handle invalid CSV data', () => {
        const csvContent = 'name,email,age\nJohn Doe,invalid-email,not-a-number';
        const result = processCSVContent(csvContent);

        expect(result.success).toHaveLength(0);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].validationErrors).toHaveProperty('email');
        expect(result.errors[0].validationErrors).toHaveProperty('age');
    });

    it('should handle empty lines in CSV', () => {
        const csvContent = 'name,email,age\nJohn Doe,john@example.com,30\n\n';
        const result = processCSVContent(csvContent);

        expect(result.success).toHaveLength(1);
        expect(result.errors).toHaveLength(0);
    });
});
