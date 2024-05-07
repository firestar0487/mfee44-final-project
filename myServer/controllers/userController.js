const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { email, password, title, lastname, firstname, auth_provider = 'local' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = crypto.randomBytes(3).toString('hex');

  const sqlInsert = 'INSERT INTO users (email, password, title, lastname, firstname, auth_provider, email_verified, verification_code) VALUES (?, ?, ?, ?, ?, ?, false, ?)';
  db.query(sqlInsert, [email, hashedPassword, title, lastname, firstname, auth_provider, verificationCode], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      return res.status(500).json({ message: 'Error registering user' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '墨韻雅筆 個人帳號認證信',
      text: `
        感謝閣下在墨韻雅筆官方網站註冊。登入您的個人帳號便可尊享以下服務：

        * 管理您的個人資料
        * 訂閱墨韻雅筆最新電子通訊
        * 儲存您的願望錄

        請輸入啟用帳號金鑰以完成建立墨韻雅筆個人帳號：${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email'});
      }
      console.log('Verification email sent: ' + info.response);
      res.status(200).json({ message: 'User registered successfully. Verification email sent.' });
    });
  });
};

exports.verify = (req, res) => {
  const { email, code } = req.body;

  const sqlSelect = 'SELECT verification_code FROM users WHERE email = ?';
  db.query(sqlSelect, [email], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ message: 'Error retrieving verification code' });
    }

    if (result.length === 0 || code !== result[0].verification_code) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    const sqlUpdate = 'UPDATE users SET email_verified = true WHERE email = ?';
    db.query(sqlUpdate, [email], (err, result) => {
      if (err) {
        console.error('Error updating user verification status:', err);
        return res.status(500).json({ message: 'Error updating user verification status' });
      }
      res.status(200).json({ message: 'Account successfully verified.' });
    });
  });
};

exports.getProfile = (req, res) => {
  // req.user.id 应该在 authenticateToken 中间件中被赋值
  const userId = req.user.id;

  const sqlSelect = 'SELECT email, title, lastname, firstname FROM users WHERE id = ?';
  db.query(sqlSelect, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user profile:', err);
      return res.status(500).json({ message: 'Error fetching user profile' });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};