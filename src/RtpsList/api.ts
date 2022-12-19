import { Transaction, UserStateWithName } from '@library/react-toolkit'
import { getReq } from '~/src/types/TransactionTriggerPolicy'
import * as axios from '../axios'
import * as t from 'io-ts'
import { PaginationRequest, TransactionPolicies, RoutineTransactionPolicy } from '../types'

const Wallets = t.type({
  data: t.array(UserStateWithName),
})

const WalletTransactions = t.type({
  data: t.array(Transaction),
  total: t.number,
})

export const getTransactionsByWallet = (nymId: string) =>
  axios.get(`/api/web-wallet/transactions/${nymId}`, { decoder:WalletTransactions})

export const getLatestTransaction = (org?: string) =>
  axios.get(`/api/web-wallet/last-transactions/${org}`, { decoder: t.array(Transaction) })

export const getGetOrganisationWallets = (org?: string) =>
  axios.get(`/api/web-wallet/wallets/${org}`, { decoder: Wallets, params: { itemsPerPage: 20 } })

export const getRtps = (nymId: string, req: PaginationRequest) =>
  axios.get(`/smart-wallet/api/${nymId}/routine-transaction-policy`, {
    params: req,
    decoder: TransactionPolicies,
  })

export const removeRtp = (id: string) =>
  axios.delete_(`/smart-wallet/api/user-policy/${id}`, { decoder: t.unknown })

export const getRtp = (nymID: string, id: number) =>
  axios.get(`/smart-wallet/api/${nymID}/routine-transaction-policy/${id}`, {
    decoder: RoutineTransactionPolicy,
  })

export const createRtp = (rtp: RoutineTransactionPolicy) =>
  axios.post(`/smart-wallet/api/policy/routineTransactionPolicy`, rtp, {
    decoder: t.unknown,
    encoder: RoutineTransactionPolicy,
  })

export const addRtp = (data: Omit<RoutineTransactionPolicy, 'id'>) =>
  axios.post(`/smart-wallet/api/${data.nymID}/routine-transaction-policy`, data, {
    decoder: t.unknown,
  })

export const updateRtp = ({ id, ...data }: RoutineTransactionPolicy) =>
  axios.put(`/smart-wallet/api/${data.nymID}/routine-transaction-policy/${id}`, data, {
    decoder: t.unknown,
  })

export const deleteRtp = ({ nymID, id }: getReq) =>
  axios.delete_(`/smart-wallet/api/${nymID}/routine-transaction-policy/${id}`, {
    decoder: t.unknown,
  })
