import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import DefectModal from './DefectModal';

const DefectManagement = () => {
    const [defects, setDefects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDefect, setSelectedDefect] = useState(null);

    useEffect(() => {
        fetchDefects();
    }, []);

    const fetchDefects = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/defects');
            setDefects(response.data);
        } catch (error) {
            console.error('Error fetching defects:', error);
        }
    };

    const handleEdit = (defect) => {
        setSelectedDefect(defect);
        setIsModalOpen(true);
    };

    const handleDelete = async (defectId) => {
        try {
            await axios.delete(`http://localhost:9000/api/defects/${defectId}`);
            fetchDefects();
        } catch (error) {
            console.error('Error deleting defect:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Defectos</h1>
            <BtnPrimary onClick={() => setIsModalOpen(true)}>Nuevo Defecto</BtnPrimary>
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Lista de Defectos</h2>
                <ul>
                    {defects.map(defect => (
                        <li key={defect._id} className="p-2 border-b">
                            <div className="flex justify-between">
                                <span>{defect.summary}</span>
                                <div>
                                    <BtnSecondary onClick={() => handleEdit(defect)}>Editar</BtnSecondary>
                                    <BtnSecondary onClick={() => handleDelete(defect._id)}>Eliminar</BtnSecondary>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <DefectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} defect={selectedDefect} refreshDefects={fetchDefects} />
        </div>
    );
};

export default DefectManagement;