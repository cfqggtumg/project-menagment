import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BtnPrimary } from './Buttons';
import { runCypressTests } from '../utils/cypressIntegration';

const TestExecution = () => {
    const [testCases, setTestCases] = useState([]);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    
    useEffect(() => {
        const fetchTestCases = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/test-cases');
                setTestCases(response.data);
            } catch (error) {
                setError(error);
                console.error('Error fetching test cases:', error);
            }
        };

        fetchTestCases();
    }, []);

    const handleRunTests = async () => {
        setIsLoading(true);
        try {
            const testResults = await runCypressTests();
            setResults(testResults);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Ejecución de Pruebas</h2>
            
            <BtnPrimary 
                onClick={handleRunTests}
                disabled={isLoading}
            >
                {isLoading ? 'Ejecutando...' : 'Ejecutar Pruebas'}
            </BtnPrimary>

            {error && (
                <div className="alert alert-danger mt-3">{error.message}</div>
            )}

            <div className="mt-4">
                {testCases.length > 0 ? (
                    testCases.map((test) => (
                        <div key={test._id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{test.name}</h5>
                                <p className="card-text">{test.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay casos de prueba disponibles</p>
                )}
            </div>

            {results.length > 0 && (
                <div className="mt-4">
                    <h3>Resultados</h3>
                    {results.map((result, index) => (
                        <div key={index} className={`alert ${result.status === 'passed' ? 'alert-success' : 'alert-danger'}`}>
                            {result.name}: {result.status}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestExecution;