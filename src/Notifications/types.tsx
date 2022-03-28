import * as React from 'react'

import { Actions as AllActions } from '../store'
import { Action, actionCreator, FailableAction } from '@library/react-toolkit'

export type FailableActions = Extract<AllActions, FailableAction<any, any>>
type FailableActionTypes = FailableActions['type']

export type QueueItem = [FailableActionTypes, 'success' | 'error']

export type State = QueueItem[]
export type CloseNotification = Action<'close_notification'>
export const closeNotification = actionCreator<CloseNotification>('close_notification')

export type Actions = CloseNotification

type ActionsLookup = Record<
  FailableActionTypes,
  {
    success?: React.ReactNode
    error?: React.ReactNode
  }
>

export const lookup: ActionsLookup = {
  '@react-toolkit/logout_result': {},
  '@react-toolkit/get_account_result': {},
  '@react-toolkit/get_current_workspace_result': {},
}
