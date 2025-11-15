import bcrypt from 'bcryptjs/umd/types'

export class PasswordHasher {
  createHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  verifyHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
