import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CloseCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { State } from '../store'
import { closeNotification, lookup } from './types'
import { array, option } from 'fp-ts'
import { pipe } from 'fp-ts/lib/function'

const mapStateToProps = ({ notifications }: State) => ({
  notification: array.head(notifications),
})

type StateProps = ReturnType<typeof mapStateToProps>

const dispatchProps = { close: closeNotification }

type DispatchProps = typeof dispatchProps

type Props = StateProps & DispatchProps

const NotificationBox = styled.div<{ open: boolean }>`
  max-width: calc(100vw - 32px);
  position: fixed;
  z-index: 1010;
  bottom: ${(props) => props.theme.paddingUnit * 2}px;
  left: ${(props) => props.theme.paddingUnit * 5}px;
  transform: translateY(${(props) => (props.open ? 0 : 64)}px);
  opacity: ${(props) => (props.open ? 1 : 0.1)};
  visibility: ${(props) => (!props.open ? 'hidden' : 'visible')};
  transition: transform 0.2s, opacity 0.18s,
    visibility ${(props) => (props.open ? '0s' : '0s linear 0.2s')};
  font-size: 16px;

  & .ant-notification-notice {
    padding-left: 48px;
  }

  & span.anticon {
    left: 16px;
    top: 16px;
    font-size: 22px;
    position: absolute;
  }
  & span.anticon.anticon-close-circle {
    color: ${(props) => props.theme.colors.red};
  }
  & span.anticon.anticon-check-circle {
    color: ${(props) => props.theme.colors.primary};
  }
`

const duration = 3000

const Notification = ({ notification, close }: Props) => {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (option.isSome(notification)) {
      setOpen(true)
      setTimeout(() => close(), duration + 500)
      setTimeout(() => setOpen(false), duration)
    }
  }, [notification])

  const message = pipe(
    notification,
    option.map(([x, y]) => lookup[x][y]),
    option.toNullable
  )

  return (
    <NotificationBox open={open}>
      <div className="ant-notification-notice ant-notification-notice-closable">
        {option.isSome(notification) && notification.value[1] === 'success' ? (
          <CheckCircleOutlined />
        ) : (
          <CloseCircleOutlined />
        )}
        {message}
      </div>
    </NotificationBox>
  )
}

export default connect(mapStateToProps, dispatchProps)(Notification)
