import React from 'react'
import { WalletBalance } from './WalletBalance'
import { WalletTransactions } from './WalletTransactions'
import { useParams } from 'react-router'

export const Wallet = () => {
  const { nymId } = useParams<{ nymId: string }>()
  return (
    <div>
      <WalletBalance nymId={nymId} />
      <WalletTransactions nymId={nymId} />
    </div>
  )
}
