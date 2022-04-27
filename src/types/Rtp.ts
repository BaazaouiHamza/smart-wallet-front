import * as t from 'io-ts'

export type PaginationRequest = {
  page: number
  itemsPerPage: number
}
export const RoutineTransactionPolicy = t.type({
  id: t.number,
  amount: t.union([t.record(t.string,t.number),t.undefined,t.null ]),
  name: t.string,
  description: t.string,
  schedule_end_date: t.string,
  schedule_start_date: t.string,
  nym_id: t.string,
  recipient: t.string,
  frequency: t.string,
})
 
export type RoutineTransactionPolicy= t.TypeOf<typeof RoutineTransactionPolicy>

export const TransactionPolicies = t.type({
  total:t.number,
  data : t.array(RoutineTransactionPolicy)
})
