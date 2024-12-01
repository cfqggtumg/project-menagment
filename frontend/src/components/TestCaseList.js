import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestCaseModal from './TestCaseModal';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';
import toast from 'react-hot-toast';

const TestCaseList = () => {
    const [testCases, setTestCases] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editCaseId, setEditCaseId] = useState(null);

    useEffect(() => {
        fetchTestCases();
    }, []);

    const fetchTestCases = () => {
        axios.get('http://localhost:9000/testCases')
            .then((res) => {
                setTestCases(res.data);
            })
            .catch((error) => {
                console.error(error);
                toast.error('Something went wrong');
            });
    };

    const handleDelete = (caseId) => {
        axios.delete(`http://localhost:9000/testCase/${caseId}`)
            .then(() => {
                toast.success('Test case deleted successfully');
                fetchTestCases();
            })
            .catch((error) => {
                console.error(error);
                toast.error('Something went wrong');
            });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Test Cases</h1>
                <BtnPrimary onClick={() => setIsModalOpen(true)}>Create Test Case</BtnPrimary>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Plan</th>
                        <th className="py-2">Description</th>
                        <th className="py-2">Steps</th>
                        <th className="py-2">Expected Result</th>
                        <th className="py-2">Actual Result</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Priority</th>
                        <th className="py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testCases.map((testCase) => (
                        <tr key={testCase._id}>
                            <td className="py-2">{testCase.name}</td>
                            <td className="py-2">{testCase.plan}</td>
                            <td className="py-2">{testCase.description}</td>
                            <td className="py-2">{testCase.steps}</td>
                            <td className="py-2">{testCase.expectedResult}</td>
                            <td className="py-2">{testCase.actualResult}</td>
                            <td className="py-2">{testCase.status}</td>
                            <td className="py-2">{testCase.priority}</td>
                            <td className="py-2 flex space-x-2">
                                <BtnSecondary onClick={() => { setEditCaseId(testCase._id); setIsModalOpen(true); }}>Edit</BtnSecondary>
                                <BtnSecondary onClick={() => handleDelete(testCase._id)}>Delete</BtnSecondary>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <TestCaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} edit={!!editCaseId} caseId={editCaseId} />
        </div>
    );
};

export default TestCaseList;