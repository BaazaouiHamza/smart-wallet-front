import { TransactionsTable } from '@library/react-toolkit'
import { Card, Spin } from 'antd'
import React from 'react'
import { useGetTransactionsByWallet } from '~/src/RtpsList/queries'
type Props = {
  nymId: string
}
export const WalletTransactions: React.FC<Props> = ({ nymId }) => {
  const transactions = useGetTransactionsByWallet(nymId)
  if (transactions.data?.data) {
    return (
      <Card title="Transactions">
        <TransactionsTable
          pagination={{
            itemsPerPage: 5,
            page: 0,
            total: transactions.data.total,
            onPaginate(z) {
              this.page = z.page
              this.itemsPerPage = z.itemsPerPage
            },
          }}
          transactions={transactions.data.data}
          loading={transactions.isLoading}
        />
      </Card>
    )
  } else return <Spin size="large" />
}
