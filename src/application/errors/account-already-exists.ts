export class AccountAlreadyExistsException extends Error {
  constructor(message = 'Account already exists') {
    super(message)
    this.name = 'AccountAlreadyExistsException'
  }
}
