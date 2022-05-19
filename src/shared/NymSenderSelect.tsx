import { useOrganization } from '@library/react-toolkit'
import { Select, Spin, Form } from 'antd'
import React, { FC } from 'react'
import { useGetOrganisationWallets } from '../RtpsList/queries'

type Props = {
  initialValue?: string
}

export const NymSenderSelect: FC<Props> = ({ initialValue: nymSender }) => {
  const org = useOrganization()
  const { data, isLoading, isError } = useGetOrganisationWallets(org?.name)
  if (isLoading) {
    return <Spin size="default" />
  }
  if (isError) {
    return <p>Something went wrong</p>
  }
  return (
    <Form.Item
      initialValue={nymSender}
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
    </Form.Item>
  )
}
