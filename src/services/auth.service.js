export const loginService = async (email, password) => {
    // Simulate API call
    if (email === 'admin@mail.com' && password === 'supersecret') {
        return {
            ok: true,
            data: {
                email: 'admin@mail.com',
                name: 'Mr. Admin',
                role: 'admin',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
        };
    }
    throw new Error('Credenciales inválidas');
};