// src/components/UploadResults.jsx
import PropTypes from 'prop-types';
import ErrorRecord from './ErrorRecord';

export default function UploadResults({ results, onRetry, onReset }) {
    const { success, errors } = results;

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                    Upload Results
                </h3>
                <button
                    onClick={onReset}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    New File
                </button>
            </div>

            {success.length > 0 && (
                <div className="mb-6 bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-green-700">
                            {success.length} records uploaded successfully
                        </span>
                    </div>
                </div>
            )}

            {errors.length > 0 && (
                <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">
                        The following {errors.length} records encountered errors. Please fix them and retry:
                    </h4>
                    {errors.map((error) => (
                        <ErrorRecord
                            key={error.row}
                            error={error}
                            onRetry={onRetry}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

UploadResults.propTypes = {
    results: PropTypes.shape({
        success: PropTypes.array.isRequired,
        errors: PropTypes.array.isRequired,
    }).isRequired,
    onRetry: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};
