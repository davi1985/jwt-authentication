import jwt from 'jsonwebtoken'

export class JwtService {
  generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1d' })
  }

  verifyToken(token: string) {
    try {
      const [type, accessToken] = token.split(' ')

      if (!type || type !== 'Bearer') {
        throw new Error()
      }

      return jwt.verify(accessToken, process.env.JWT_SECRET!)
    } catch {
      throw new Error('Invalid token')
    }
  }
}
