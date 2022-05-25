import { getReq } from '~/src/types/TransactionTriggerPolicy'
import { any, unknown } from 'io-ts'
import * as axios from '../axios'
import { PaginationRequest, TransactionPolicies, RoutineTransactionPolicy } from '../types'

export const getGetOrganisationWallets = (org?: string) =>
  axios.get(`/api/web-wallet/wallets/${org}`, { decoder: any })

export const getRtps = (nymId: string, req: PaginationRequest) =>
  axios.get(`/smart-wallet/api/${nymId}/routine-transaction-policy`, {
    params: req,
    decoder: TransactionPolicies,
  })

export const removeRtp = (id: string) =>
  axios.delete_(`/smart-wallet/api/user-policy/${id}`, { decoder: unknown })

export const getRtp = (nymID: string, id: number) =>
  axios.get(`/smart-wallet/api/${nymID}/routine-transaction-policy/${id}`, {
    decoder: RoutineTransactionPolicy,
  })

export const createRtp = (rtp: RoutineTransactionPolicy) =>
  axios.post(`/smart-wallet/api/policy/routineTransactionPolicy`, rtp, {
    decoder: unknown,
    encoder: RoutineTransactionPolicy,
  })
export const addRtp = ({ ...data }: RoutineTransactionPolicy) =>
  axios.post(`/smart-wallet/api/${data.nymID}/routine-transaction-policy`, data, {
    decoder: unknown,
    encoder: RoutineTransactionPolicy,
  })

export const updateRtp = ({ id, ...data }: RoutineTransactionPolicy) =>
  axios.put(`/smart-wallet/api/${data.nymID}/routine-transaction-policy/${id}`, data, {
    decoder: unknown,
  })

export const deleteRtp = ({ nymID, id }: getReq) =>
  axios.delete_(`/smart-wallet/api/${nymID}/routine-transaction-policy/${id}`, {
    decoder: unknown,
  })
