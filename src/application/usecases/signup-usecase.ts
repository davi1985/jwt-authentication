import { AccountAlreadyExistsError } from '../errors/account-already-exists'
import { prismaClient } from '../libs/prisma-client'
import { hash } from 'bcryptjs'

interface IInput {
  name: string
  email: string
  password: string
}

type IOutput = void

export class SignUpUseCase {
  async execute({ name, email, password }: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    })

    if (accountAlreadyExists)
      throw new AccountAlreadyExistsError('Account already exists')

    const hashedPassword = await hash(password, 10)

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
