import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types'

export type PaginationRequest = {
  page: number
  itemsPerPage: number
}
export type ProfileReq = {
  value: string
}
export const RoutineTransactionPolicy = t.type({
  id: t.number,
  amount: t.record(t.string, t.number),
  name: t.string,
  description: t.string,
  scheduleEndDate: DateFromISOString,
  scheduleStartDate: DateFromISOString,
  nymID: t.string,
  recipient: t.string,
  frequency: t.union([t.literal('daily'), t.literal('weekly'), t.literal('monthly')]),
})

export type RoutineTransactionPolicy = t.TypeOf<typeof RoutineTransactionPolicy>

export const TransactionPolicies = t.type({
  total: t.number,
  data: t.array(RoutineTransactionPolicy),
})
