import { AccountAlreadyExistsException } from '../errors/account-already-exists'
import { prismaClient } from '../libs/prisma-client'
import { PasswordHasher } from '../services/password-hasher'

interface IInput {
  name: string
  email: string
  password: string
}

type IOutput = void

export class SignUpUseCase {
  constructor(private readonly passwordHasher: PasswordHasher) {}

  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    })

    if (accountAlreadyExists)
      throw new AccountAlreadyExistsException('Account already exists')

    const hashedPassword = await this.passwordHasher.createHash(password)

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
