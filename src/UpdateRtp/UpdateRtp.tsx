import React from 'react'
import {
  useGetRoutineTransactionPolicyById,
  useUpdateRoutineTransactionPolicy,
} from '../RtpsList/queries'
import { useHistory, useParams } from 'react-router'
import { Spin } from 'antd'
import { RtpForm } from '../shared'
// import { useMutation } from 'react-query'
// import { updateRtp } from '../api'

export const UpdateRtp = () => {
  const history = useHistory()
  const { id }: any = useParams()
  const { isError, isLoading, data } = useGetRoutineTransactionPolicyById(id)
  // const {mutateAsync,isLoading:isMutating} = useMutation(updateRtp)
  const { mutateAsync, isLoading: isMutating } = useUpdateRoutineTransactionPolicy()
  const onFormSubmit = async (formData) => {
    await mutateAsync({ ...formData, id })
    history.push('/rtpList')
  }
  if (isLoading) {
    return <Spin size="large" />
  }
  if (isError) {
    <p>Something went wrong</p>
  }
  return (
    <>
      <h1>Update Routine Transaction Policy</h1>
      <RtpForm initialValues={data} isLoading={isMutating} onSubmit={onFormSubmit} />
    </>
  )
}
