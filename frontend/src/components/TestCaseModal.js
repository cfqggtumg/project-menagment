import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import toast from 'react-hot-toast';

const TestCaseModal = ({ isOpen, onClose, edit = false, caseId = null }) => {
    const [name, setName] = useState('');
    const [plan, setPlan] = useState('');
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState('');
    const [expectedResult, setExpectedResult] = useState('');
    const [actualResult, setActualResult] = useState('');
    const [status, setStatus] = useState('');
    const [priority, setPriority] = useState('');

    useEffect(() => {
        if (edit && isOpen) {
            axios.get(`http://localhost:9000/testCase/${caseId}`)
                .then((res) => {
                    const testCase = res.data;
                    setName(testCase.name);
                    setPlan(testCase.plan);
                    setDescription(testCase.description);
                    setSteps(testCase.steps);
                    setExpectedResult(testCase.expectedResult);
                    setActualResult(testCase.actualResult);
                    setStatus(testCase.status);
                    setPriority(testCase.priority);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        }
    }, [edit, caseId, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const caseData = { name, plan, description, steps, expectedResult, actualResult, status, priority };

        if (edit) {
            axios.put(`http://localhost:9000/testCase/${caseId}`, caseData)
                .then(() => {
                    toast.success('Test case updated successfully');
                    onClose();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        } else {
            axios.post('http://localhost:9000/testCase', caseData)
                .then(() => {
                    toast.success('Test case created successfully');
                    onClose();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        }
    };

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white rounded-md p-6 w-full max-w-md">
                        <Dialog.Title>{edit ? 'Edit Test Case' : 'Create Test Case'}</Dialog.Title>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Plan</label>
                                <input type="text" value={plan} onChange={(e) => setPlan(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Steps</label>
                                <textarea value={steps} onChange={(e) => setSteps(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Expected Result</label>
                                <textarea value={expectedResult} onChange={(e) => setExpectedResult(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Actual Result</label>
                                <textarea value={actualResult} onChange={(e) => setActualResult(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <input type="text" value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <BtnSecondary onClick={onClose}>Cancel</BtnSecondary>
                                <BtnPrimary type="submit">Save</BtnPrimary>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
};

export default TestCaseModal;