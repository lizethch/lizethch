import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extiende los matchers correctamente
expect.extend(matchers);

// Limpia el DOM después de cada prueba
afterEach(() => {
    cleanup();
});

// Mock para el objeto window si no existe
if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(), // deprecated
            removeListener: vi.fn(), // deprecated
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
}

// Configura las variables de entorno para testing
vi.stubGlobal('process.env', {
    VITE_API_URL: 'http://localhost:3000',
});

// Mock para FileReader
global.FileReader = class {
    constructor() {
        this.onload = null;
    }
    readAsText() {
        setTimeout(() => {
            this.onload?.({ target: { result: 'mocked file content' } });
        }, 0);
    }
};

// Mock para fetch
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
        ok: true,
    })
);

// Silencia los warnings de los tests
console.error = vi.fn();
console.warn = vi.fn();