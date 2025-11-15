import { hash, compare } from 'bcryptjs'

export class PasswordHasher {
  createHash(password: string): Promise<string> {
    return hash(password, 10)
  }

  verifyHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
  }
}
