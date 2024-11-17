import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import BtnPrimary from './BtnPrimary';
import BtnSecondary from './BtnSecondary';

const AddTaskModal = ({ 
    isAddTaskModalOpen, 
    setAddTaskModal, 
    projectId = null, 
    taskId = null, 
    edit = false, 
    refreshData = () => {} 
}) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [taskType, setTaskType] = useState('PBI');
    const [assignedTo, setAssignedTo] = useState(''); // Añadir este estado
    const [users, setUsers] = useState([]); // Añadir este estado

    useEffect(() => {
        if (edit && isAddTaskModalOpen) {
            axios.get(`http://localhost:9000/project/${projectId}/task/${taskId}`)
                .then((res) => {
                    setTitle(res.data[0].task[0].title);
                    setDesc(res.data[0].task[0].description);
                    setTaskType(res.data[0].task[0].taskType || 'PBI');
                    setAssignedTo(res.data[0].task[0].assignedTo || ''); // Añadir este campo
                })
                .catch((error) => {
                    toast.error('Something went wrong');
                });
        }
    }, [edit, projectId, taskId, isAddTaskModalOpen]);

    useEffect(() => {
        axios.get('http://localhost:9000/api/users')
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                toast.error('Failed to fetch users');
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskData = {
            title,
            description: desc,
            taskType,
            assignedTo // Añadir este campo
        };

        if (!edit) {
            axios.post(`http://localhost:9000/project/${projectId}/task`, taskData)
                .then(() => {
                    toast.success('Task added successfully');
                    if (typeof refreshData === 'function') {
                        refreshData();
                    }
                    setAddTaskModal(false);
                })
                .catch((error) => {
                    toast.error('Failed to add task');
                });
        } else {
            axios.put(`http://localhost:9000/project/${projectId}/task/${taskId}`, taskData)
                .then(() => {
                    toast.success('Task updated successfully');
                    if (typeof refreshData === 'function') {
                        refreshData();
                    }
                    setAddTaskModal(false);
                })
                .catch((error) => {
                    toast.error('Failed to update task');
                });
        }
    };

    return (
        <Transition appear show={isAddTaskModalOpen} as={Fragment}>
            <Dialog as='div' open={isAddTaskModalOpen} onClose={() => setAddTaskModal(false)} className="relative z-50">
                <div className="fixed inset-0 overflow-y-auto">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </Transition.Child>
                    <div className="fixed inset-0 flex items-center justify-center p-4 w-screen h-screen">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="rounded-md bg-white w-6/12">
                                <Dialog.Title as='div' className={'bg-white shadow px-6 py-4 rounded-t-md sticky top-0'}>
                                    {edit ? (<h1>Edit Task</h1>) : (<h1>Add Task</h1>)}
                                    <button onClick={() => setAddTaskModal(false)} className='absolute right-6 top-4 text-gray-500 hover:bg-gray-100 rounded focus:outline-none focus:ring focus:ring-offset-1 focus:ring-indigo-200'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dialog.Title>
                                <form onSubmit={handleSubmit} className='gap-4 px-8 py-4'>
                                    <div className='mb-3'>
                                        <label htmlFor="title" className='block text-gray-600'>Title</label>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className='border border-gray-300 rounded-md w-full text-sm py-2 px-2.5 focus:border-indigo-500 focus:outline-offset-1 focus:outline-indigo-400' placeholder='Task title' />
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="Description" className='block text-gray-600'>Description</label>
                                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className='border border-gray-300 rounded-md w-full text-sm py-2 px-2.5 focus:border-indigo-500 focus:outline-offset-1 focus:outline-indigo-400' rows="6" placeholder='Task description'></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="taskType" className='block text-gray-600'>Task Type</label>
                                        <select value={taskType} onChange={(e) => setTaskType(e.target.value)} className='border border-gray-300 rounded-md w-full text-sm py-2 px-2.5 focus:border-indigo-500 focus:outline-offset-1 focus:outline-indigo-400'>
                                            <option value="PBI">Product Backlog Item</option>
                                            <option value="Bug">Bug</option>
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="assignedTo" className='block text-gray-600'>Assign To</label>
                                        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className='border border-gray-300 rounded-md w-full text-sm py-2 px-2.5 focus:border-indigo-500 focus:outline-offset-1 focus:outline-indigo-400'>
                                            <option value="">Select User</option>
                                            {users.map(user => (
                                                <option key={user._id} value={user._id}>{user.username}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex justify-end items-center space-x-2'>
                                        <BtnSecondary onClick={() => setAddTaskModal(false)}>Cancel</BtnSecondary>
                                        <BtnPrimary>Save</BtnPrimary>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddTaskModal;