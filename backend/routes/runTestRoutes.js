// backend/routes/runTestRoutes.js
import express from 'express';
import TestPlan from '../models/TestPlan.js';
import { exec } from 'child_process';
import path from 'path';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // Verificar si existen planes de prueba
    const testPlans = await TestPlan.find({ active: true });
    
    if (!testPlans || testPlans.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No se encontraron planes de prueba activos',
        code: 'NO_TEST_PLANS'
      });
    }

    // Validar estructura de los planes
    const invalidPlans = testPlans.filter(plan => !plan.cypressConfig);
    if (invalidPlans.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Algunos planes de prueba no tienen configuración de Cypress válida',
        code: 'INVALID_CONFIG',
        details: invalidPlans.map(p => p.name)
      });
    }

    // Ejecutar pruebas con Cypress
    const cypressPath = path.resolve(process.cwd(), 'node_modules', '.bin', 'cypress');
    
    exec(`${cypressPath} run`, {
      env: {
        ...process.env,
        TEST_PLANS: JSON.stringify(testPlans)
      }
    }, (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({
          status: 'error',
          message: 'Error al ejecutar las pruebas',
          code: 'EXECUTION_ERROR',
          details: {
            error: error.message,
            stdout,
            stderr
          }
        });
      }

      // Procesar resultados
      return res.status(200).json({
        status: 'success',
        message: 'Pruebas ejecutadas correctamente',
        data: {
          output: stdout,
          testPlans: testPlans.map(plan => ({
            id: plan._id,
            name: plan.name,
            status: 'completed'
          }))
        }
      });
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      code: 'SERVER_ERROR',
      details: error.message
    });
  }
});

export default router;