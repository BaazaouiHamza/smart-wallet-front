import { PeerWithNym, useOrganization } from '@library/react-toolkit'
import { Button, Collapse, Spin } from 'antd'
import React, { useState } from 'react'
import { useGetOrganisationWallets } from '~/src/RtpsList/queries'
import { ModalAddTransactionTriggerPolicy } from './ModalAddtransactionTriggerPolicy'
import { TransactionTriggerPolicyTable } from './TransactionTriggerPolicyTable'

export const DisplayTransactionTriggerPolicies = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const org = useOrganization()
  const { data, isLoading, isError } = useGetOrganisationWallets(org?.name)
  const { Panel } = Collapse
  if (isError) {
    return <p>Something went Wrong</p>
  }
  if (isLoading) {
    return <Spin size="large" />
  }
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setShowAddModal(true)
        }}
      >
        Add Transaction Trigger Policy
      </Button>
      <ModalAddTransactionTriggerPolicy
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
      <Collapse>
        {data.data.map((wallet) => (
          <Panel header={<PeerWithNym nym={wallet.nym} firstName={wallet.firstName} />} key={wallet.nym}>
            <TransactionTriggerPolicyTable nymId={wallet.nym} />
          </Panel>
        ))}
      </Collapse>
    </>
  )
}
