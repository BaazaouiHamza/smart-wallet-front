import React from 'react'
import { useGetRtp, useUpdateRtp } from '../RtpsList/queries'
import { useHistory, useParams } from 'react-router'
import { Spin } from 'antd'
import { RtpForm } from '../shared'
// import { useMutation } from 'react-query'
// import { updateRtp } from '../api'

export const UpdateRtp = () => {
  const history = useHistory()
  const { id }: any = useParams()
  const { data, isError, isLoading } = useGetRtp(id)
  // const {mutateAsync,isLoading:isMutating} = useMutation(updateRtp)
  const { mutateAsync, isLoading: isMutating } = useUpdateRtp()
  const onFormSubmit = async (formData) => {
    await mutateAsync({ ...formData, id })
    history.push('/rtpList')
  }
  console.log(data)
  console.log(id)
  if (isLoading) {
    return <Spin size="large" />
  }
  if (isError) {
    ;<p>Something went wrong</p>
  }
  return (
    <>
      <h1>Update Routine Transaction Policy</h1>
      <RtpForm defaultValues={data} isLoading={isMutating} onFormSubmit={onFormSubmit} />
    </>
  )
}
