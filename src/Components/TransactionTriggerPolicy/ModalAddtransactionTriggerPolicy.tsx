import React, { FC } from 'react'
import { Modal } from 'antd'
import { TransactionTriggerPolicyForm } from '~/src/shared/TransactionTriggerPolicyForm'
import { useAddTransactionTriggerPolicy } from '~/src/CustomHooks/TransactionTriggerPolicyQueries/queries'
type Props = {
  showAddModal: boolean
  setShowAddModal: (value: React.SetStateAction<boolean>) => void
}
export const ModalAddTransactionTriggerPolicy: FC<Props> = ({ showAddModal, setShowAddModal }) => {
  const { mutate, isLoading } = useAddTransactionTriggerPolicy()
  const onFormSubmit = async (data) => {
    mutate({ ...data })
    setShowAddModal(false)
  }
  return (
    <Modal
      confirmLoading={isLoading}
      onOk={onFormSubmit}
      visible={showAddModal}
      onCancel={() => setShowAddModal(false)}
    >
      <TransactionTriggerPolicyForm onSubmit={onFormSubmit} isLoading={isLoading} />
    </Modal>
  )
}
