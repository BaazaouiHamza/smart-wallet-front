import { UserStateWithName, WalletBalancesCarousel } from '@library/react-toolkit'
import { array, record, semigroup } from 'fp-ts'
import React from 'react'
import { useGetOrganisationWallets } from '~/src/RtpsList/queries'

export const Wallets:React.FC = () => {
  const wallets = useGetOrganisationWallets()
    const wallet = wallets.data ?   record.fromFoldableMap(semigroup.last<UserStateWithName>(),array.Foldable)(
        wallets.data.data,
        (w: UserStateWithName): [string, UserStateWithName] => [w.nym, w]
      ) : {}


  return <WalletBalancesCarousel wallets={wallet} loading={wallets.isLoading}  />
}
