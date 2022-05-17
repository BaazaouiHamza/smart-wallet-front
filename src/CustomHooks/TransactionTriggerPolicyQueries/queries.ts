import { useQueryClient, useMutation, useQuery } from 'react-query'
import { taskEither, task, either } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'
import { TransactionTriggerPolicy } from '~/src/types/TransactionTriggerPolicy'
import {
  addTransactionTriggerPolicy,
  deleteTransactionTriggerPolicy,
  getTransacionTriggerPolicies,
  updateTransactionTriggerPolicy,
  getransactionTriggerPolicyById
} from './api'
import { PaginationRequest } from '~/src/types'

type deleteReq = {
  id:number
  nymID:string
}

export const throwLeft: <L, R>(ma: taskEither.TaskEither<L, R>) => task.Task<R> = task.map(
  either.fold(
    (e) => {
      throw e
    },
    (x) => x
  )
)

export const useAddTransactionTriggerPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (data: TransactionTriggerPolicy) => pipe(addTransactionTriggerPolicy(data), throwLeft)(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('ttps')
      },
    }
  )
}

export const useGetTransactionTriggerPolicies = (nymID: string, req: PaginationRequest) =>
  useQuery(
    ['ttps', nymID, req.page, req.itemsPerPage],
    pipe(getTransacionTriggerPolicies(nymID, req), throwLeft),
    { keepPreviousData: true }
  )

export const useGetTransactionTriggerPolicyById = (nymID: string, id: number) =>
  useQuery(['ttp', nymID, id], pipe(getransactionTriggerPolicyById(nymID, id), throwLeft))

export const useUpdateTransactionTriggerPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (data: TransactionTriggerPolicy) => pipe(updateTransactionTriggerPolicy(data), throwLeft)(),
    {
      onSuccess: (_, d) => {
        queryClient.invalidateQueries('ttps')
        queryClient.invalidateQueries(['ttp', d.id])
      },
    }
  )
}

export const useDeleteTransactionTriggerPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation(
    ({nymID,id}:deleteReq) =>
      pipe(deleteTransactionTriggerPolicy(nymID,id), throwLeft)(),
    {
      onSuccess: (_, id) => {
        queryClient.invalidateQueries('ttps')
        queryClient.invalidateQueries(['ttps', id])
      },
    }
  )
}
