import React, { FC } from 'react'
import { Form, Modal } from 'antd'
import TransactionTriggerPolicyForm from '~/src/shared/TransactionTriggerPolicyForm'
import { useAddTransactionTriggerPolicy } from '~/src/CustomHooks/TransactionTriggerPolicyQueries/queries'

type Props = {
  visible: boolean
  close: () => void
}

export const ModalAddTransactionTriggerPolicy: FC<Props> = ({ visible, close }) => {
  const [form] = Form.useForm()
  const addTTP = useAddTransactionTriggerPolicy()

  return (
    <Modal confirmLoading={addTTP.isLoading} onOk={form.submit} visible={visible} onCancel={close}>
      <TransactionTriggerPolicyForm
        onSubmit={(data) => addTTP.mutate(data, { onSuccess: () => close() })}
        form={form}
      />
    </Modal>
  )
}
