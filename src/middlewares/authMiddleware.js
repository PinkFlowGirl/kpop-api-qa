const jwt = require('jsonwebtoken');
const JWT_SECRET = "kpop-secret-key";

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

const token = authHeader.startsWith('Bearer ')
  ? authHeader.split(' ')[1]
  : authHeader;

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

module.exports = authMiddleware;