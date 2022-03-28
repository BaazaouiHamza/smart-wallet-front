import * as t from './types'
import * as effects from 'redux-saga/effects'

const initialState: t.State = {
  counter: 0,
}

export const reducer = (s = initialState, a: t.Actions): t.State => {
  switch (a.type) {
    case 'dashboard/increment':
      return { ...s, counter: s.counter + 1 }
    case 'dashboard/decrement':
      return { ...s, counter: s.counter - 1 }
    default:
      return s
  }
}

export function* saga() {
  return effects.all([])
}
