import { any, } from 'io-ts'
import * as axios from '~/src/axios'
export const getProfileName = (nymID?:string) =>
  axios.get(`/dis/dis/1.0/names`, { params: {nyms:nymID}, decoder: any })
