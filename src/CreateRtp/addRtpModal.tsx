import { Form, Modal } from 'antd'
import React, { FC } from 'react'
import { useCreateRoutineTransactionPolicy } from '../RtpsList/queries'
import { RtpForm } from '../shared'

type Props = {
  visible: boolean
  close: () => void
}

const AddRtpModal: FC<Props> = ({ visible, close }) => {
  const [form] = Form.useForm()
  const createRtp = useCreateRoutineTransactionPolicy()
  return (
    <Modal
      confirmLoading={createRtp.isLoading}
      onOk={() => {
        console.debug('ok')
        form.submit()
      }}
      visible={visible}
      onCancel={() => close()}
    >
      <RtpForm
        onSubmit={(data) => {
          createRtp.mutate(data, {
            onSuccess: () => close(),
          })
        }}
        form={form}
      />
    </Modal>
  )
}

export default AddRtpModal
