import { jwtDecode } from 'jwt-decode'

export default function TestJwt() {
  let decodedToken
  try {
    const testToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJuYW1lIjoi5buWIOWuj-W9rCIsImlhdCI6MTcxMDkzODQyOSwiZXhwIjoxNzEwOTQyMDI5fQ.Jx6_TqP_ADvayNh-6Z078I59Trx04DdxC_mZ_Ci8fQg' // 替换为一个有效的测试 JWT 字符串
    decodedToken = jwtDecode(testToken)
  } catch (error) {
    console.error('Error decoding token:', error)
    decodedToken = '解码错误'
  }

  return (
    <div>
      <h1>JWT Decode 测试</h1>
      <p>解码的 Token: {JSON.stringify(decodedToken)}</p>
    </div>
  )
}
