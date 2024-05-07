import jsonwebtoken from 'jsonwebtoken'

export default function authenticate(req, res, next) {
  const token = req.cookies.authToken

  // 输出 token 以验证是否成功获取
  console.log('Token received:', token)

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: '授權失敗，沒有訪問令牌',
    })
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('Token verification error:', err)
      return res.status(403).json({
        status: 'error',
        message: '無效的訪問令牌',
      })
    }

    console.log('Decoded user:', user)

    req.user = user
    next()
  })
}
