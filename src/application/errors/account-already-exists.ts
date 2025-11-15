export class AccountAlreadyExistsException extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'AccountAlreadyExistsException'
  }
}
