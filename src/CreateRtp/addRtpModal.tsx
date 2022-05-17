import { Modal } from 'antd'
import React, { FC } from 'react'
import { useCreateRoutineTransactionPolicy } from '../RtpsList/queries'
import { RtpForm } from '../shared'
type props = {
  showAddModal: boolean
  setShowAddModal: (value: React.SetStateAction<boolean>) => void
}
export const AddRtpModal: FC<props> = ({ showAddModal, setShowAddModal }) => {
  // const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  // const { mutate, isLoading } = useAddRoutineTransactionPolicy()
  const { mutate, isLoading } =useCreateRoutineTransactionPolicy()
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
      <RtpForm onSubmit={onFormSubmit} isLoading={isLoading} />
    </Modal>
  )
}
