const jwt = require('jsonwebtoken');

const User = require('../models/User');

const authHandler = async (req, res, next) => {
  let bearerToken = req.headers.authorization;

  if (bearerToken && bearerToken.startsWith('Bearer')) {
    try {
      // Берем все, что после слова Bearer
      let token = bearerToken.split(' ')[1];

      // Верифицируем токен
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Берем пользователя из токена
      req.verifiedUser = await User.findById(decodedToken.userId).select(
        '-password'
      );

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

module.exports = authHandler;
