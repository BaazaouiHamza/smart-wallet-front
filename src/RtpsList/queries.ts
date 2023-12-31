import { getReq } from '~/src/types/TransactionTriggerPolicy'
import { pipe } from 'fp-ts/lib/function'
import {
  getRtp,
  getRtps,
  updateRtp,
  deleteRtp,
  addRtp,
  createRtp,
  getGetOrganisationWallets,
  getLatestTransaction,
  getTransactionsByWallet,
} from './api'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { taskEither, task, either } from 'fp-ts'
import { PaginationRequest, RoutineTransactionPolicy } from '../types'
import { useOrganization } from '@library/react-toolkit'

export const throwLeft: <L, R>(ma: taskEither.TaskEither<L, R>) => task.Task<R> = task.map(
  either.fold(
    (e) => {
      throw e
    },
    (x) => x
  )
)

export const useGetRoutineTransactionPolicies = (nymID: string, req: PaginationRequest) =>
  useQuery(['rtps', nymID, req.page, req.itemsPerPage], pipe(getRtps(nymID, req), throwLeft), {
    keepPreviousData: true,
  })

export const useGetLatestTransactions = () => {
  const org = useOrganization()

  return useQuery(['latestTransactions', org], pipe(getLatestTransaction(org?.name), throwLeft), {
    enabled: !!org,
  })
}

export const useGetOrganisationWallets = () => {
  const org = useOrganization()

  return useQuery(['orgWallets', org], pipe(getGetOrganisationWallets(org?.name), throwLeft), {
    enabled: !!org,
  })
}

export const useGetTransactionsByWallet = (nymId: string) =>
  useQuery(['walletTransactions', nymId], pipe(getTransactionsByWallet(nymId), throwLeft))

export const useGetRoutineTransactionPolicyById = (nymID: string, id: number) =>
  useQuery(['rtp', nymID, id], pipe(getRtp(nymID, id), throwLeft))

export const useAddRoutineTransactionPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation((data: RoutineTransactionPolicy) => pipe(createRtp(data), throwLeft)(), {
    onSuccess: () => {
      queryClient.invalidateQueries('rtps')
    },
  })
}
export const useCreateRoutineTransactionPolicy = () => {
  const queryClient = useQueryClient()

  return useMutation(
    (data: Omit<RoutineTransactionPolicy, 'id'>) => pipe(addRtp(data), throwLeft)(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('rtps')
      },
    }
  )
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

  return useMutation((data: getReq) => pipe(deleteRtp(data), throwLeft)(), {
    onSuccess: (_, d) => {
      queryClient.invalidateQueries('rtps')
      queryClient.invalidateQueries(['rtp', d.id])
    },
  })
}
