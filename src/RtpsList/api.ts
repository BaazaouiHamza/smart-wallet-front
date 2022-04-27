import { unknown } from 'io-ts'
import * as axios from '../axios'
import { PaginationRequest, TransactionPolicies, RoutineTransactionPolicy } from '../types'

export const getRtps = (nymId: string, req: PaginationRequest) =>
  axios.get(`/smart-wallet/api/policy/routineTransactionPolicy/wallet/${nymId}`, {
    params: req,
    decoder: TransactionPolicies,
  })

export const removeRtp = (id: string) => {
  return axios.delete_(`/smart-wallet/api/userPolicy/${id}`, { decoder: unknown })
}

export const getRtp = (id: number) =>
  axios.get(`/smart-wallet/api/policy/routineTransactionPolicy/${id}`, {
    decoder: RoutineTransactionPolicy,
  })
export const createRtp = ({ ...data }) =>
  axios.post(`/smart-wallet/api/policy/routineTransactionPolicy`, data, {
    decoder: unknown,
  })
export const updateRtp = ({ id, ...data }) =>
  axios.put(`/smart-wallet/api/policy/routineTransactionPolicy/${id}`, data, {
    decoder: unknown,
  })
export const deleteRtp = (id) =>
  axios.delete_(`/smart-wallet/api/userPolicy/${id}`, {
    decoder: unknown,
  })
