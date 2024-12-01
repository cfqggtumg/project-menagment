import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';

const DefectModal = ({ isOpen, onClose, defect, refreshDefects }) => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [severity, setSeverity] = useState('');

    useEffect(() => {
        if (defect) {
            setSummary(defect.summary);
            setDescription(defect.description);
            setPriority(defect.priority);
            setSeverity(defect.severity);
        }
    }, [defect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const defectData = { summary, description, priority, severity };

        try {
            if (defect) {
                await axios.put(`http://localhost:9000/api/defects/${defect._id}`, defectData);
            } else {
                await axios.post('http://localhost:9000/api/defects', defectData);
            }
            refreshDefects();
            onClose();
        } catch (error) {
            console.error('Error saving defect:', error);
        }
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-25" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                {defect ? 'Editar Defecto' : 'Nuevo Defecto'}
                            </Dialog.Title>
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Resumen</label>
                                    <input type="text" id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prioridad</label>
                                    <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                                        <option value="Low">Baja</option>
                                        <option value="Medium">Media</option>
                                        <option value="High">Alta</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="severity" className="block text-sm font-medium text-gray-700">Severidad</label>
                                    <select id="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm">
                                        <option value="Minor">Menor</option>
                                        <option value="Major">Mayor</option>
                                        <option value="Critical">Crítica</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <BtnSecondary onClick={onClose}>Cancelar</BtnSecondary>
                                    <BtnPrimary type="submit">Guardar</BtnPrimary>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default DefectModal;