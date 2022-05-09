import { unknown } from 'io-ts'
import * as axios from '../axios'
import { PaginationRequest, TransactionPolicies, RoutineTransactionPolicy } from '../types'

export const getRtps = (nymId: string, req: PaginationRequest) =>
  axios.get(`/smart-wallet/api/policy/routineTransactionPolicy/wallet/${nymId}`, {
    params: req,
    decoder: TransactionPolicies,
  })

export const removeRtp = (id: string) =>
  axios.delete_(`/smart-wallet/api/userPolicy/${id}`, { decoder: unknown })

export const getRtp = (id: number) =>
  axios.get(`/smart-wallet/api/policy/routineTransactionPolicy/${id}`, {
    decoder: RoutineTransactionPolicy,
  })

export const createRtp = (rtp: RoutineTransactionPolicy) =>
  axios.post(`/smart-wallet/api/policy/routineTransactionPolicy`, rtp, {
    decoder: unknown,
    encoder: RoutineTransactionPolicy,
  })
export const addRtp = ({...data}:RoutineTransactionPolicy) => 
    axios.post(`/smart-wallet/api/${data.nymID}/routine-transaction-policy`, data, {
      decoder: unknown,
      encoder:RoutineTransactionPolicy
    })
  

export const updateRtp = ({ id, ...data }: RoutineTransactionPolicy) =>
  axios.put(`/smart-wallet/api/policy/routineTransactionPolicy/${id}`, data, {
    decoder: unknown,
  })

export const deleteRtp = (id: number) =>
  axios.delete_(`/smart-wallet/api/userPolicy/${id}`, {
    decoder: unknown,
  })
