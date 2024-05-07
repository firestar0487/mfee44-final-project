const jwt = require('jsonwebtoken');

// JWT 驗證中間件
const authenticateToken = (req, res, next) => {
  // 從請求頭部讀取 token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Token is missing' });
  }

  // 驗證 token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Error:', err);
      return res.status(403).json({ message: 'Invalid token' });
    }

    // 將用戶資訊附加到請求對象
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
