import { pipe } from 'fp-ts/lib/function'
import { array, option, record } from 'fp-ts'
import { Actions } from '../store'
import * as t from './types'
import { result } from '@library/react-toolkit'
import { isUndefined } from 'util'

export const initialState: t.State = []

const isFailableAction = (a: Actions): a is t.FailableActions =>
  pipe(record.lookup(a.type, t.lookup), option.isSome)

const shouldNotify = (a: t.FailableActions): boolean => {
  const messages = t.lookup[a.type]

  if (result.isOk(a.payload) && !isUndefined(messages.success)) {
    return true
  }

  if (result.isErr(a.payload) && !isUndefined(messages.error)) {
    return true
  }

  return false
}

export const reducer = (s: t.State = initialState, a: Actions | t.Actions): t.State => {
  if (a.type === 'close_notification') {
    return pipe(
      s,
      array.tail,
      option.getOrElse(() => s)
    )
  } else if (!isFailableAction(a) || !shouldNotify(a)) {
    return s
  }

  return [...s, [a.type, result.isOk(a.payload) ? 'success' : 'error']]
}
