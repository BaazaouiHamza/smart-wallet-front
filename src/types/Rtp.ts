import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types'

export type PaginationRequest = {
  page: number
  itemsPerPage: number
}
export const RoutineTransactionPolicy = t.type({
  id: t.number,
  amount: t.record(t.string, t.number),
  name: t.string,
  description: t.string,
  scheduleEndDate: t.union([t.string,DateFromISOString]),
  scheduleStartDate: t.union([t.string,DateFromISOString]),
  nymID: t.string,
  recipient: t.string,
  frequency: t.union([t.literal('DAILY'), t.literal('WEEKLY'), t.literal('MONTHLY')]),
})

export type RoutineTransactionPolicy = t.TypeOf<typeof RoutineTransactionPolicy>

export const TransactionPolicies = t.type({
  total: t.number,
  data: t.array(RoutineTransactionPolicy),
})
