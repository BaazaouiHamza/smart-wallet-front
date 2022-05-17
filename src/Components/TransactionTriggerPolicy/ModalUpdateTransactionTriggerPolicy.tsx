import { Modal, Spin } from 'antd'
import React, { FC } from 'react'
import {
  useGetTransactionTriggerPolicyById,
  useUpdateTransactionTriggerPolicy,
} from '~/src/CustomHooks/TransactionTriggerPolicyQueries/queries'
import { TransactionTriggerPolicyForm } from '~/src/shared/TransactionTriggerPolicyForm'

type props = {
  showUpdateModal: boolean
  setShowUpdateModal: (value: React.SetStateAction<boolean>) => void
  id: number
  nymID: string
}

export const ModalUpdateTransactionTriggerPolicy: FC<props> = ({
  showUpdateModal,
  setShowUpdateModal,
  id,
  nymID,
}) => {
  const { isError, isLoading, data } = useGetTransactionTriggerPolicyById(nymID,id)
  const { mutate, isLoading: isMutating } = useUpdateTransactionTriggerPolicy()
  const onFormSubmit = async (formData) => {
    mutate({ ...formData, id })
    setShowUpdateModal(false)
  }
  if (isLoading) {
    return <Spin size="large" />
  }
  if (isError) {
    <p>Something went wrong</p>
  }
  return (
    <Modal
      confirmLoading={isLoading}
      onOk={onFormSubmit}
      visible={showUpdateModal}
      onCancel={() => setShowUpdateModal(false)}
    >
      <TransactionTriggerPolicyForm initialValues={data} isLoading={isMutating} onSubmit={onFormSubmit} />
    </Modal>
  )
}
