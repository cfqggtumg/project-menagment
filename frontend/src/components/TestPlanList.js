import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestPlanModal from './TestPlanModal';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import toast from 'react-hot-toast';

const TestPlanList = () => {
    const [testPlans, setTestPlans] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPlanId, setEditPlanId] = useState(null);

    useEffect(() => {
        fetchTestPlans();
    }, []);

    const fetchTestPlans = () => {
        axios.get('http://localhost:9000/testPlans')
            .then((res) => {
                setTestPlans(res.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Something went wrong');
            });
    };

    const handleDelete = (planId) => {
        axios.delete(`http://localhost:9000/testPlan/${planId}`)
            .then(() => {
                toast.success('Test plan deleted successfully');
                fetchTestPlans();
            })
            .catch((error) => {
                console.error(error);
                toast.error('Something went wrong');
            });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Test Plans</h1>
                <BtnPrimary onClick={() => setIsModalOpen(true)}>Create Test Plan</BtnPrimary>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Project</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Start Date</th>
                        <th className="py-2">End Date</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Requirements Coverage</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testPlans.map((plan) => (
                        <tr key={plan._id}>
                            <td className="py-2">{plan.name}</td>
                            <td className="py-2">{plan.project}</td>
                            <td className="py-2">{plan.description}</td>
                            <td className="py-2">{plan.startDate}</td>
                            <td className="py-2">{plan.endDate}</td>
                            <td className="py-2">{plan.status}</td>
                            <td className="py-2">{plan.requirementsCoverage}</td>
                            <td className="py-2 flex space-x-2">
                                <BtnSecondary onClick={() => { setEditPlanId(plan._id); setIsModalOpen(true); }}>Edit</BtnSecondary>
                                <BtnSecondary onClick={() => handleDelete(plan._id)}>Delete</BtnSecondary>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TestPlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} edit={!!editPlanId} planId={editPlanId} />
        </div>
    );
};

export default TestPlanList;