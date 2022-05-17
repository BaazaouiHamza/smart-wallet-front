import * as t from 'io-ts'

export const TransactionTriggerPolicy = t.type({
  id: t.number,
  name: t.string,
  description: t.string,
  amount: t.record(t.string, t.number),
  targetedBalance: t.record(t.string, t.number),
  nymID: t.string,
  recipient: t.string,
})
export type TransactionTriggerPolicy = t.TypeOf<typeof TransactionTriggerPolicy>

export const Amount = t.record(t.string,t.number)

export type Amount = t.TypeOf<typeof Amount>

export const TransactionTriggerPolicies = t.type({
  total: t.number,
  data: t.array(TransactionTriggerPolicy),
})

export type getReq = {
  id: number
  nymID: string
}