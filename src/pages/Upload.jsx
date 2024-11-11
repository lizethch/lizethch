// src/pages/Upload.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FileUpload from '../components/FileUpload';
import UploadResults from '../components/UploadResults';
import { processCSVContent } from '../services/csv.service';
import { validateField } from '../utils/validators';

export default function Upload() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [uploadResults, setUploadResults] = useState(null);
    const [error, setError] = useState(null);

    // Check if user is authorized
    if (!user || user.role !== 'admin') {
        navigate('/login');
        return null;
    }

    const handleFileUpload = async (content) => {
        try {
            setIsLoading(true);
            setError(null);

            // Use the csv.service to process the file content
            const results = processCSVContent(content);
            setUploadResults(results);
        } catch (err) {
            setError('Error al procesar el archivo');
            console.error('Upload error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = async (row, updatedRecord) => {
        try {
            setIsLoading(true);

            // Validate the updated record using the existing validation service
            const recordErrors = {};
            let hasErrors = false;

            Object.entries(updatedRecord).forEach(([field, value]) => {
                const error = validateField(field, value);
                if (error) {
                    recordErrors[field] = error;
                    hasErrors = true;
                }
            });

            if (hasErrors) {
                setError('Los datos actualizados contienen errores');
                return;
            }

            // Update the results state with the corrected record
            if (uploadResults) {
                const newResults = {
                    success: [
                        ...uploadResults.success,
                        { id: Date.now(), ...updatedRecord }
                    ],
                    errors: uploadResults.errors.filter(error => error.row !== row)
                };
                setUploadResults(newResults);
            }
        } catch (err) {
            setError('Error al reintentar el registro');
            console.error('Retry error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setUploadResults(null);
        setError(null);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">
                                Sistema de Carga de Datos
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">{user.name}</span>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : !uploadResults ? (
                        <div className="max-w-xl mx-auto">
                            <FileUpload onUpload={handleFileUpload} />
                        </div>
                    ) : (
                        <UploadResults
                            results={uploadResults}
                            onRetry={handleRetry}
                            onReset={handleReset}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

