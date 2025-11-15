import jwt from 'jsonwebtoken'

export class TokenGenerator {
  generateToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '1h' })
  }
}
