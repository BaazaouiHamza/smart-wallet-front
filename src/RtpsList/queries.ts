import { pipe } from 'fp-ts/lib/function'
import { getRtp, getRtps, createRtp, updateRtp, deleteRtp } from './api'
import { useMutation, useQuery } from 'react-query'
import { taskEither, task, either } from 'fp-ts'
import { PaginationRequest, RoutineTransactionPolicy } from '../types'
export const throwLeft: <L, R>(ma: taskEither.TaskEither<L, R>) => task.Task<R> = task.map(
  either.fold(
    (e) => {
      throw e
    },
    (x) => x
  )
)

export const useGetRtpsList = (nymId: string, req: PaginationRequest) => {
  return useQuery(['rtps'], pipe(getRtps(nymId, req), throwLeft))
}
export const useGetRtp = (id: number) => {
  return useQuery(['rtp'], pipe(getRtp(id), throwLeft))
}
export const usePostRtp = () => {
  return useMutation((data: RoutineTransactionPolicy) => pipe(createRtp(data), throwLeft)())
}

export const useUpdateRtp = () => {
  return useMutation((data: RoutineTransactionPolicy) => pipe(updateRtp(data), throwLeft)())
}

export const useDeleteRtp = () => {
  return useMutation((id:number) => pipe(deleteRtp(id), throwLeft)())
}
