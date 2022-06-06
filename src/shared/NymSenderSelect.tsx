import { useOrganizationPermissions } from '@library/react-toolkit'
import { Select } from 'antd'
import React, { FC } from 'react'
import { useGetOrganisationWallets } from '../RtpsList/queries'

type Props = {
  value?: string
  onChange?: (_: string) => void
}

export const NymSenderSelect: FC<Props> = ({ value, onChange }) => {
  const organizationWallets = useGetOrganisationWallets()
  const org = useOrganizationPermissions()
  const wallets = organizationWallets.data?.data.filter(
    ({ nym }) => org?.walletPermissions[nym] === 'CONTRIBUTOR'
  )

  if (organizationWallets.isError) {
    return <p>Something went wrong</p>
  }

  return (
    <Select loading={organizationWallets.isLoading} value={value} onChange={onChange}>
      {wallets?.map((wallet) => (
        <Select.Option value={wallet.nym} key={wallet.nym}>
          {wallet.firstName}
        </Select.Option>
      ))}
    </Select>
  )
}
