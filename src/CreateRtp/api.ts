import * as axios from '../axios'
import { RoutineTransactionPolicy } from '../types'
export const createRtp = ({ ...data }) => {
  axios.post('/smart-wallet/api/policy/routineTransactionPolicy', data, {
    decoder: RoutineTransactionPolicy,
  })
}
