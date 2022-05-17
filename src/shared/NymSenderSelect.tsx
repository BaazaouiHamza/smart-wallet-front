import { useOrganization } from '@library/react-toolkit'
import { Select, Spin,Form } from 'antd'
import React from 'react'
import { useGetOrganisationWallets } from '../RtpsList/queries'

export const NymSenderSelect = () => {
  const org = useOrganization()
  console.log(org?.name)
  const { data, isLoading, isError } = useGetOrganisationWallets(org?.name)
  if (isLoading) {
    return <Spin size="default" />
  }
  if (isError) {
    return <p>Something went wrong</p>
  }
  return (
    <Form.Item
    rules={[{ required: true, message: 'nymId is required' }]}
    name="nymID"
    label="Sender"
    required
    tooltip="This is a required field"
  >
    <Select>
      {data.data.map((wallet) => (
        <Select.Option value={wallet.nym} key={wallet.nym}>
          {wallet.firstName}
        </Select.Option>
      ))}
    </Select>
    </Form.Item >
  )
}
