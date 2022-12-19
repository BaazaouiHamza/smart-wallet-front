import { UserStateWithName } from '@library/react-toolkit'
import * as t from 'io-ts'

export const Wallet = t.record(t.string, UserStateWithName)

export type Wallet = t.TypeOf<typeof Wallet>
