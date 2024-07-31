import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [pattern, setPattern] = useState('');
    const [replacement, setReplacement] = useState('');
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePatternChange = (e) => {
        setPattern(e.target.value);
    };

    const handleReplacementChange = (e) => {
        setReplacement(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pattern', pattern);
        formData.append('replacement', replacement);

        try {
            const response = await axios.post('http://localhost:8000/api/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('There was an error uploading the file!', error);
        }
    };

    return (
        <div>
            <h2>Upload CSV/Excel File</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <input type="text" placeholder="Pattern" value={pattern} onChange={handlePatternChange} />
                <input type="text" placeholder="Replacement" value={replacement} onChange={handleReplacementChange} />
                <button type="submit">Upload</button>
            </form>
            {result && (
                <div>
                    <h3>Processed Data</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
