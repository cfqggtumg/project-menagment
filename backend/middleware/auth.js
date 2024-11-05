import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (Date.now() >= decoded.exp * 1000) {
      throw new Error('Token expired');
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate('role');
      const permission = user.role.permissions.find(p => p.module === module);
      
      if (!permission || !permission[action]) {
        throw new Error('No permission');
      }
      
      next();
    } catch (error) {
      res.status(403).send({ error: 'No tienes permiso para realizar esta acción.' });
    }
  };
};