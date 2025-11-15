import { InvalidCredentialsException } from '../errors/invalid-credentials'
import { prismaClient } from '../libs/prisma-client'
import { PasswordHasher } from '../services/password-hasher'
import { TokenGenerator } from '../services/token-generator'

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
}

export class SignInUseCase {
  constructor(
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenGenerator: TokenGenerator,
  ) {}

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email, password },
    })

    if (!account) throw new InvalidCredentialsException()

    const isPasswordValid = await this.passwordHasher.verifyHash(
      password,
      account.password,
    )

    if (!isPasswordValid) throw new InvalidCredentialsException()

    const accessToken = this.tokenGenerator.generateToken(account.id)

    return { accessToken }
  }
}
