import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestCase = () => {
  const [testCases, setTestCases] = useState([]);
  const [form, setForm] = useState({ testPlanId: '', name: '', description: '', steps: '', expectedResult: '', actualResult: '', status: '', priority: '' });

  useEffect(() => {
    fetchTestCases();
  }, []);

  const fetchTestCases = async () => {
    const response = await axios.get('/api/test-cases');
    setTestCases(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form._id) {
      await axios.put(`/api/test-cases/${form._id}`, form);
    } else {
      await axios.post('/api/test-cases', form);
    }
    fetchTestCases();
    setForm({ testPlanId: '', name: '', description: '', steps: '', expectedResult: '', actualResult: '', status: '', priority: '' });
  };

  const handleEdit = (testCase) => {
    setForm(testCase);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/test-cases/${id}`);
    fetchTestCases();
  };

  return (
    <div>
      <h1>Casos de Prueba</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Plan de Prueba ID" value={form.testPlanId} onChange={(e) => setForm({ ...form, testPlanId: e.target.value })} required />
        <input type="text" placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <textarea placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
        <textarea placeholder="Pasos" value={form.steps} onChange={(e) => setForm({ ...form, steps: e.target.value })}></textarea>
        <textarea placeholder="Resultado Esperado" value={form.expectedResult} onChange={(e) => setForm({ ...form, expectedResult: e.target.value })}></textarea>
        <textarea placeholder="Resultado Real" value={form.actualResult} onChange={(e) => setForm({ ...form, actualResult: e.target.value })}></textarea>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Blocked">Blocked</option>
        </select>
        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {testCases.map(testCase => (
          <li key={testCase._id}>
            {testCase.name} - {testCase.status}
            <button onClick={() => handleEdit(testCase)}>Editar</button>
            <button onClick={() => handleDelete(testCase._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestCase;