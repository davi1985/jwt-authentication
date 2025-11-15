import { StatusCode } from '../constants/status-code'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Body = Record<string, any>

export interface IRequest {
  body: Body
}

export interface IResponse {
  statusCode: StatusCode
  body: Body | null
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>
}
