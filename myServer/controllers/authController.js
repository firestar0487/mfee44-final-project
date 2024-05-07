const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
        return res.status(400).send('需要電子郵件和密碼');
      }
  
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) {
        console.error('資料庫錯誤：', err);
        return res.status(500).send('資料庫錯誤');
      }
  
      if (results.length === 0) {
        return res.status(401).send('Invalid credentials');
      }
  
      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).send('Invalid credentials');
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token: token });
    });
  };