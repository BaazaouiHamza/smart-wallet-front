import { WalletBalanceCard } from '@library/react-toolkit'
import { Spin } from 'antd'
import React from 'react'
import { useGetOrganisationWallets } from '~/src/RtpsList/queries'
type Props = {
    nymId:string
}

export const WalletBalance:React.FC<Props> = ({nymId}) => {
 
  const orgWallets = useGetOrganisationWallets().data?.data

  const wallet = orgWallets?.find((wallet) => wallet.nym == nymId)
  if (wallet) {
    return (
      <div>
        <WalletBalanceCard wallet={wallet} />
      </div>
    )
  } else return <Spin size="large" />
}
