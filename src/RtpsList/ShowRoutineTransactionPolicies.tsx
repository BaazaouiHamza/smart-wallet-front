import { Spin, Collapse, Button } from 'antd'
import React, { useState } from 'react'
import { useGetOrganisationWallets } from './queries'
import AddRtpModal from '../CreateRtp/addRtpModal'
import { PeerWithNym } from '@library/react-toolkit'
import { RtpsList } from './RtpsList'

export const ShowRoutineTransactionPolicies: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const organizationWallets = useGetOrganisationWallets()

  if (organizationWallets.isError) {
    return <p>Something went Wrong</p>
  }

  return (
    <Spin spinning={organizationWallets.isLoading}>
      <Button type="primary" onClick={() => setShowAddModal(true)}>
        Add RTp
      </Button>
      <AddRtpModal visible={showAddModal} close={() => setShowAddModal(false)} />
      <Collapse>
        {organizationWallets.data?.data.map((wallet) => (
          <Collapse.Panel
            header={<PeerWithNym nym={wallet.nym} firstName={wallet.firstName} />}
            key={wallet.nym}
          >
            <RtpsList nymId={wallet.nym} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </Spin>
  )
}
