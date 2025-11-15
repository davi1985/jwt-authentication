import { hash, compare } from 'bcryptjs'

export class PasswordHasher {
  private readonly SALT_ROUNDS = 10

  createHash(password: string): Promise<string> {
    return hash(password, this.SALT_ROUNDS)
  }

  verifyHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash)
  }
}
