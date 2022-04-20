// import { unknown } from 'io-ts'
import * as axios from '../axios'
import { PaginationRequest, RoutineTransactionPolicy } from './types'

export const getRtps = (nymId: string, req: PaginationRequest) =>
  axios.get(`/smart-wallet/api/policy/routineTransactionPolicy/wallet/${nymId}`, {
    params: req,
    decoder: RoutineTransactionPolicy,
  })
