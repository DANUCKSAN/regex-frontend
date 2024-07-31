// src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [patternDescription, setPatternDescription] = useState('');
    const [replacementValue, setReplacementValue] = useState('');
    const [processedData, setProcessedData] = useState([]);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !patternDescription || !replacementValue) {
            setError('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('pattern_description', patternDescription);
        formData.append('replacement_value', replacementValue);

        try {
            const response = await fetch('/api/process/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error processing file');
            }

            const data = await response.json();
            setProcessedData(data);
            setError('');
        } catch (err) {
            setError('An error occurred while processing the file.');
        }
    };

    return (
        <div className="container">
            <header>
                <h1>Regex Pattern Matching and Replacement</h1>
            </header>
            <main>
                <section className="upload-form">
                    <h2>Upload File and Process Data</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept=".csv, .xlsx"
                            onChange={handleFileChange}
                        />
                        <input
                            type="text"
                            placeholder="Describe the pattern (e.g., find email addresses)"
                            value={patternDescription}
                            onChange={(e) => setPatternDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Replacement value"
                            value={replacementValue}
                            onChange={(e) => setReplacementValue(e.target.value)}
                        />
                        <button type="submit">Process File</button>
                    </form>
                    {error && <div className="error">{error}</div>}
                </section>
                {processedData.length > 0 && (
                    <section className="results">
                        <h2>Processed Data</h2>
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(processedData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {processedData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, idx) => (
                                            <td key={idx}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </main>
            <footer>
                <p>© 2024 Regex Pattern Matching and Replacement</p>
            </footer>
        </div>
    );
}

export default App;
