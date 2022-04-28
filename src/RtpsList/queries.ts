import { pipe } from 'fp-ts/lib/function'
import { getRtp, getRtps, createRtp, updateRtp, deleteRtp } from './api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
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

export const useRoutineTransactionPolicies = (nymID: string, req: PaginationRequest) =>
  useQuery(['rtps', nymID, req.page, req.itemsPerPage], pipe(getRtps(nymID, req), throwLeft), {
    keepPreviousData: true,
  })

export const useRoutineTransactionPolicy = (id: number) =>
  useQuery(['rtp', id], pipe(getRtp(id), throwLeft))

export const useAddRoutineTransactionPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation((data: RoutineTransactionPolicy) => pipe(createRtp(data), throwLeft)(), {
    onSuccess: () => {
      queryClient.invalidateQueries('rtps')
    },
  })
}

export const useUpdateRoutineTransactionPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation((data: RoutineTransactionPolicy) => pipe(updateRtp(data), throwLeft)(), {
    onSuccess: (_, d) => {
      queryClient.invalidateQueries('rtps')
      queryClient.invalidateQueries(['rtp', d.id])
    },
  })
}

export const useDeleteRoutineTransactionPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation((id: number) => pipe(deleteRtp(id), throwLeft)(), {
    onSuccess: (_, id) => {
      queryClient.invalidateQueries('rtps')
      queryClient.invalidateQueries(['rtp', id])
    },
  })
}
