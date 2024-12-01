import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BtnPrimary from './BtnPrimary';

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/reports');
            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    const handleGenerateReport = async (type) => {
        try {
            await axios.post(`http://localhost:9000/api/reports/${type}`);
            fetchReports();
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Reportes</h1>
            <div className="flex space-x-4 mb-4">
                <BtnPrimary onClick={() => handleGenerateReport('coverage')}>Cobertura de Requisitos</BtnPrimary>
                <BtnPrimary onClick={() => handleGenerateReport('execution')}>Ejecución de Pruebas</BtnPrimary>
                <BtnPrimary onClick={() => handleGenerateReport('defects')}>Defectos</BtnPrimary>
                <BtnPrimary onClick={() => handleGenerateReport('progress')}>Progreso del Proyecto</BtnPrimary>
                <BtnPrimary onClick={() => handleGenerateReport('trends')}>Tendencias</BtnPrimary>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Lista de Reportes</h2>
                <ul>
                    {reports.map(report => (
                        <li key={report._id} className="p-2 border-b">
                            <span>{report.type}</span>
                            <span>{new Date(report.createdAt).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Reports;