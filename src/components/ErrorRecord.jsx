// src/components/ErrorRecord.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { validateField } from '../utils/validators';

export default function ErrorRecord({ error, onRetry }) {
    const [details, setDetails] = useState(error.details);
    const [validationErrors, setValidationErrors] = useState(error.validationErrors);

    const handleFieldChange = (field, value) => {
        const newDetails = { ...details, [field]: value };
        const validationError = validateField(field, value);

        setDetails(newDetails);
        setValidationErrors({
            ...validationErrors,
            [field]: validationError
        });
    };

    const handleRetry = () => {
        onRetry(error.row, details);
    };

    return (
        <div className="border border-red-200 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">
                    Row {error.row}
                </span>
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                    Retry
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(details).map(([field, value]) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-gray-700">
                            {field}
                        </label>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                                ${validationErrors[field]
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                                }`}
                        />
                        {validationErrors[field] && (
                            <p className="mt-1 text-sm text-red-600">
                                {validationErrors[field]}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

ErrorRecord.propTypes = {
    error: PropTypes.shape({
        row: PropTypes.number.isRequired,
        details: PropTypes.object.isRequired,
        validationErrors: PropTypes.object.isRequired,
    }).isRequired,
    onRetry: PropTypes.func.isRequired,
};
