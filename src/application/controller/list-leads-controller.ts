import { IController, IRequest, IResponse } from '../interface/IController'

export class ListLeadsController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    console.log({ request })
    return {
      statusCode: 200,
      body: {
        leads: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '1234567890',
            status: 'active',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '9876543210',
            status: 'inactive',
          },
          {
            id: '3',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            phone: '5555555555',
            status: 'active',
          },
        ],
      },
    }
  }
}
