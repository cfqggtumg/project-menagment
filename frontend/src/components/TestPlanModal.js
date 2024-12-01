import React, { useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import toast from 'react-hot-toast';

const TestPlanModal = ({ isOpen, onClose, edit = false, planId = null }) => {
    const [name, setName] = useState('');
    const [project, setProject] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [requirementsCoverage, setRequirementsCoverage] = useState('');

    useEffect(() => {
        if (edit && isOpen) {
            axios.get(`http://localhost:9000/testPlan/${planId}`)
                .then((res) => {
                    const plan = res.data;
                    setName(plan.name);
                    setProject(plan.project);
                    setDescription(plan.description);
                    setStartDate(plan.startDate);
                    setEndDate(plan.endDate);
                    setStatus(plan.status);
                    setRequirementsCoverage(plan.requirementsCoverage);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        }
    }, [edit, planId, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const planData = { name, project, description, startDate, endDate, status, requirementsCoverage };

        if (edit) {
            axios.put(`http://localhost:9000/testPlan/${planId}`, planData)
                .then(() => {
                    toast.success('Test plan updated successfully');
                    onClose();
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Something went wrong');
                });
        } else {
            axios.post('http://localhost:9000/testPlan', planData)
                .then(() => {
                    toast.success('Test plan created successfully');
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
                        <Dialog.Title>{edit ? 'Edit Test Plan' : 'Create Test Plan'}</Dialog.Title>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Project</label>
                                <input type="text" value={project} onChange={(e) => setProject(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Requirements Coverage</label>
                                <input type="text" value={requirementsCoverage} onChange={(e) => setRequirementsCoverage(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
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

export default TestPlanModal;