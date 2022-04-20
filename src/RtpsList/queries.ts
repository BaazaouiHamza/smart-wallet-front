import { pipe } from 'fp-ts/lib/function'
import { getRtps } from './api'
import { useQuery } from 'react-query'
import { taskEither, task, either } from 'fp-ts'
import { PaginationRequest } from './types'
export const throwLeft: <L, R>(ma: taskEither.TaskEither<L, R>) => task.Task<R> = task.map(
  either.fold(
    (e) => {
      throw e
    },
    (x) => x
  )
)

export const useGetRtpsList = (nymId: string, req: PaginationRequest) => {
  return useQuery(['rtps'], pipe(getRtps(nymId, req), throwLeft), { keepPreviousData: true })
}
