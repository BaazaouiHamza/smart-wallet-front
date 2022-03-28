import { Action, actionCreator } from '@library/react-toolkit'

export type State = {
  counter: number
}

export type IncrementAction = Action<'dashboard/increment'>
export const increment = actionCreator<IncrementAction>('dashboard/increment')

export type DecrementAction = Action<'dashboard/decrement'>
export const decrement = actionCreator<DecrementAction>('dashboard/decrement')

export type Actions = IncrementAction | DecrementAction
