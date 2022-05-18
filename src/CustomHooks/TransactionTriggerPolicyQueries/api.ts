import { TransactionTriggerPolicies } from './../../types/TransactionTriggerPolicy'
import { PaginationRequest } from './../../types/Rtp'
import { unknown } from 'io-ts'
import * as axios from '~/src/axios'
import { TransactionTriggerPolicy, getReq } from '~/src/types/TransactionTriggerPolicy'

export const addTransactionTriggerPolicy = ({ ...data }: TransactionTriggerPolicy) =>
  axios.post(`/smart-wallet/api/${data.nymID}/transaction-trigger-policy`, data, {
    decoder: unknown,
    encoder: TransactionTriggerPolicy,
  })

export const getTransacionTriggerPolicies = (nymID: string, req: PaginationRequest) =>
  axios.get(`/smart-wallet/api/${nymID}/transaction-trigger-policy`, {
    params: req,
    decoder: TransactionTriggerPolicies,
  })

export const deleteTransactionTriggerPolicy = ({ nymID, id }: getReq) =>
  axios.delete_(`/smart-wallet/api/${nymID}/transaction-trigger-policy/${id}`, { decoder: unknown })

export const getransactionTriggerPolicyById = (nymID: string, id: number) =>
  axios.get(`/smart-wallet/api/${nymID}/transaction-trigger-policy/${id}`, {
    decoder: TransactionTriggerPolicy,
  })

export const updateTransactionTriggerPolicy = ({ id, ...data }: TransactionTriggerPolicy) =>
  axios.put(`/smart-wallet/api/${data.nymID}/transaction-trigger-policy/${id}`, data, {
    decoder: unknown,
  })
