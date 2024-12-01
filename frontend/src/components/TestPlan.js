import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestPlan = () => {
  const [testPlans, setTestPlans] = useState([]);
  const [form, setForm] = useState({ name: '', projectId: '', description: '', startDate: '', endDate: '', status: '', requirementCoverage: '' });

  useEffect(() => {
    fetchTestPlans();
  }, []);

  const fetchTestPlans = async () => {
    const response = await axios.get('/api/test-plans');
    setTestPlans(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await axios.put(`/api/test-plans/${form._id}`, form);
    } else {
      await axios.post('/api/test-plans', form);
    }
    fetchTestPlans();
    setForm({ name: '', projectId: '', description: '', startDate: '', endDate: '', status: '', requirementCoverage: '' });
  };

  const handleEdit = (testPlan) => {
    setForm(testPlan);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/test-plans/${id}`);
    fetchTestPlans();
  };

  return (
    <div>
      <h1>Planes de Prueba</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Proyecto ID" value={form.projectId} onChange={(e) => setForm({ ...form, projectId: e.target.value })} required />
        <textarea placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <input type="date" placeholder="Fecha de Inicio" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
        <input type="date" placeholder="Fecha de Fin" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="text" placeholder="Cobertura de Requisitos" value={form.requirementCoverage} onChange={(e) => setForm({ ...form, requirementCoverage: e.target.value })} />
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {testPlans.map(plan => (
          <li key={plan._id}>
            {plan.name} - {plan.status}
            <button onClick={() => handleEdit(plan)}>Editar</button>
            <button onClick={() => handleDelete(plan._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestPlan;