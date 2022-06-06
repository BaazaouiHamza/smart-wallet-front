import { PeerWithNym } from '@library/react-toolkit'
import { Button, Collapse, Spin } from 'antd'
import React, { useState } from 'react'
import { useGetOrganisationWallets } from '~/src/RtpsList/queries'
import { ModalAddTransactionTriggerPolicy } from './ModalAddtransactionTriggerPolicy'
import { TransactionTriggerPolicyTable } from './TransactionTriggerPolicyTable'

export const DisplayTransactionTriggerPolicies = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const organizationWallets = useGetOrganisationWallets()

  if (organizationWallets.isError) {
    return <p>Something went Wrong</p>
  }

  return (
    <Spin spinning={organizationWallets.isLoading}>
      <Button type="primary" onClick={() => setShowAddModal(true)}>
        Add Transaction Trigger Policy
      </Button>
      <ModalAddTransactionTriggerPolicy
        visible={showAddModal}
        close={() => setShowAddModal(false)}
      />
      <Collapse>
        {organizationWallets.data?.data.map((wallet) => (
          <Collapse.Panel
            header={<PeerWithNym nym={wallet.nym} firstName={wallet.firstName} />}
            key={wallet.nym}
          >
            <TransactionTriggerPolicyTable nymId={wallet.nym} />
          </Collapse.Panel>
        ))}
      </Collapse>
    </Spin>
  )
}
