export { validateField as validationField };
const validators = {
    name: (value) => {
        if (!value || value.trim() === '') return 'El nombre no puede estar vacío';
        if (value.length > 50) return 'El nombre debe tener menos de 50 caracteres';
        return null;
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'El formato del email es inválido';
        return null;
    },
    age: (value) => {
        const age = parseInt(value);
        if (isNaN(age) || age <= 0) return 'La edad debe ser un número positivo';
        if (age > 120) return 'La edad debe ser menor a 120 años';
        return null;
    },
    role: (value) => {
        const validRoles = ['admin', 'user'];
        if (!validRoles.includes(value)) return 'El rol debe ser "admin" o "user"';
        return null;
    },
    password: (value) => {
        if (!value || value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return null;
    }
};

export const validateField = (field, value) => {
    const validator = validators[field];
    return validator ? validator(value) : null;
};
