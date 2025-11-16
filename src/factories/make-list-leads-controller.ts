import { ListLeadsController } from 'src/application/controller/list-leads-controller'

export const makeListLeadsController = (): ListLeadsController =>
  new ListLeadsController()
