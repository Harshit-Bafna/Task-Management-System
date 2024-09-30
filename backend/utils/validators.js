const validator = require('validator');

const validateRegistration = (data) => {
    let errors = {};

    if (!data.name) {
        errors.name = 'Name is required';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email';
    }

    if (!data.password || !validator.isLength(data.password, { min: 8, max: 12 })) {
        errors.password = 'Password must be between 8 to 12 characters';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        errors.password = 'Password must contain at least one special character';
    }

    if (!/[A-Z]/.test(data.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
    }

    if (!/[a-z]/.test(data.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
    }

    if (!/[0-9]/.test(data.password)) {
        errors.password = 'Password must contain at least one number';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

module.exports = {
    validateRegistration,
};
