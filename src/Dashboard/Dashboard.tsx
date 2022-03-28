import { useAccount } from '@library/react-toolkit'
import { Button } from 'antd'
import { decrement, increment } from './types'
import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
  const dispatch = useDispatch()

  const account = useAccount()
  const count = useSelector((s) => s.dashboard.counter)

  return (
    <div>
      Hello {account?.login} I am your analytics dashboard
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      Count is: {count}
    </div>
  )
}

export default Dashboard
