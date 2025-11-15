import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { InvalidCredentialsException } from '../errors/invalid-credentials'
import { prismaClient } from '../libs/prisma-client'
import { env } from '../config/env'

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
}

export class SignInUseCase {
  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email, password },
    })

    if (!account) throw new InvalidCredentialsException()

    const isPasswordValid = await compare(password, account.password)

    if (!isPasswordValid) throw new InvalidCredentialsException()

    const accessToken = sign({ sub: account.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    })

    return { accessToken }
  }
}
