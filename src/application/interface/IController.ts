import { StatusCode } from '../constants/status-code'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any>

export interface IRequest {
  body: Body
  params: Record<string, string>
  accountId: string | undefined
}

export interface IResponse {
  statusCode: StatusCode
  body: Body | null
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>
}
