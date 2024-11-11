// src/components/FileUpload.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';

export default function FileUpload({ onUpload }) {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && !selectedFile.name.endsWith('.csv')) {
            alert('Por favor seleccione un archivo CSV');
            return;
        }
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const reader = new FileReader();
                reader.onload = (event) => {
                    onUpload(event.target.result);
                };
                reader.readAsText(file);
            } catch (error) {
                console.error('Error reading file:', error);
                alert('Error al procesar el archivo');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    Choose File
                </label>
                <p className="mt-2 text-sm text-gray-600">
                    {file ? file.name : 'No file selected'}
                </p>
            </div>
            <button
                type="submit"
                disabled={!file}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
            >
                Upload File
            </button>
        </form>
    );
}

FileUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
};
