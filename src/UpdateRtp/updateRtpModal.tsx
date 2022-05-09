import { Modal, Spin } from 'antd'
import React, { FC } from 'react'
import {
  useGetRoutineTransactionPolicyById,
  useUpdateRoutineTransactionPolicy,
} from '../RtpsList/queries'
import { RtpForm } from '../shared'
type props = {
  showUpdateModal: boolean
  setShowUpdateModal: (value: React.SetStateAction<boolean>) => void
  id: number
}
export const UpdateRtpModal: FC<props> = ({ showUpdateModal, setShowUpdateModal, id }) => {
  // const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const { isError, isLoading, data } = useGetRoutineTransactionPolicyById(id)
  const { mutate, isLoading: isMutating } = useUpdateRoutineTransactionPolicy()
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
      <RtpForm initialValues={data} isLoading={isMutating} onSubmit={onFormSubmit} />
    </Modal>
  )
}
