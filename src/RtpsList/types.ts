import * as t from 'io-ts'

export type PaginationRequest = {
  page: number
  itemsPerPage: number
}
export const RoutineTransactionPolicy = t.type({
  ID: t.number,
  Amount: t.UnknownRecord,
  Name: t.string,
  Description: t.string,
  ScheduleEndDate: t.string,
  ScheduleStartDate: t.string,
  NymID: t.string,
  Recipient: t.string,
  Frequency: t.string,
})
