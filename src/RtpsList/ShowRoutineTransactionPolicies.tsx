import { Spin, Collapse, Button } from 'antd'
import React, { useState } from 'react'
import { useGetOrganisationWallets } from './queries'
import { AddRtpModal } from '../CreateRtp/addRtpModal'
import { useOrganization } from '@library/react-toolkit'
import { RtpsList } from './RtpsList'

export const ShowRoutineTransactionPolicies: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const { Panel } = Collapse
  const org = useOrganization()
  const { data, isLoading, isError } = useGetOrganisationWallets(org?.name)
  if (isError) {
    return <p>Something went Wrong</p>
  }
  if (isLoading) {
    return <Spin size="large" />
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setShowAddModal(true)
        }}
      >
        {' '}
        Add RTp
      </Button>
      <AddRtpModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
      <Collapse>
        {data.data.map((wallet) => (
          <Panel header={wallet.firstName} key={wallet.nym}>
            <RtpsList nymId={wallet.nym} />
          </Panel>
        ))}
      </Collapse>
    </div>
  )
}
