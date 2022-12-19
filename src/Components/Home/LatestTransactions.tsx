import { OverviewTransactionsTable } from '@library/react-toolkit'
import { Card, Spin } from 'antd'
import React from 'react'
import { useGetLatestTransactions } from '~/src/RtpsList/queries'

export const LatestTransactions = () => {
  const transactions = useGetLatestTransactions()
  if (transactions.data) {
    return (
      <Card title="Latest Transactions">
        <OverviewTransactionsTable transactions={transactions.data} />
      </Card>
    )
  } else {
    return <Spin size="large" />
  }
}
