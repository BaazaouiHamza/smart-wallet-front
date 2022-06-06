import { Form, Modal, Spin } from 'antd'
import React, { FC } from 'react'
import {
  useGetTransactionTriggerPolicyById,
  useUpdateTransactionTriggerPolicy,
} from '~/src/CustomHooks/TransactionTriggerPolicyQueries/queries'
import TransactionTriggerPolicyForm from '~/src/shared/TransactionTriggerPolicyForm'

type Props = {
  visible: boolean
  close: () => void
  id: number
  nymID: string
}

export const ModalUpdateTransactionTriggerPolicy: FC<Props> = ({ visible, close, id, nymID }) => {
  const ttp = useGetTransactionTriggerPolicyById(nymID, id)
  const updateTTP = useUpdateTransactionTriggerPolicy()
  const [form] = Form.useForm()

  if (ttp.isError) {
    return <p>Something went wrong</p>
  }

  React.useEffect(() => {
    form.resetFields()
  }, [visible && !!ttp.data])

  return (
    <Modal
      confirmLoading={updateTTP.isLoading}
      onOk={() => form.submit()}
      visible={visible}
      onCancel={() => close()}
    >
      <Spin size="large" spinning={ttp.isLoading}>
        <TransactionTriggerPolicyForm
          form={form}
          initialValues={ttp.data}
          onSubmit={(formData) => {
            updateTTP.mutate(
              { ...formData, id },
              {
                onSuccess: () => close(),
              }
            )
          }}
        />
      </Spin>
    </Modal>
  )
}
