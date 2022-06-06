import { Form, Modal, Spin } from 'antd'
import React, { FC } from 'react'
import {
  useGetRoutineTransactionPolicyById,
  useUpdateRoutineTransactionPolicy,
} from '../RtpsList/queries'
import { RtpForm } from '../shared'

type Props = {
  visible: boolean
  close: () => void
  id: number
  nymID: string
}

export const UpdateRtpModal: FC<Props> = ({ visible, close, id, nymID }) => {
  const [form] = Form.useForm()
  const rtp = useGetRoutineTransactionPolicyById(nymID, id)
  const updateRTP = useUpdateRoutineTransactionPolicy()

  React.useEffect(() => {
    form.resetFields()
  }, [visible && !!rtp.data])

  return (
    <Modal
      confirmLoading={updateRTP.isLoading}
      onOk={form.submit}
      visible={visible}
      onCancel={() => close()}
    >
      {rtp.isError ? (
        <p>Something went wrong</p>
      ) : (
        <Spin size="large" spinning={rtp.isLoading}>
          <RtpForm
            form={form}
            initialValues={rtp.data}
            onSubmit={(formData) => {
              updateRTP.mutate(
                { ...formData, id },
                {
                  onSuccess: () => close(),
                }
              )
            }}
          />
        </Spin>
      )}
    </Modal>
  )
}
