import { RtpForm } from '../shared'
import * as React from 'react'
import { useHistory } from 'react-router'
import { useMutation } from 'react-query'
import { postRtp } from '../api'
export const CreateRtp: React.FC = () => {
  const history = useHistory()

  const { mutateAsync, isLoading } = useMutation(postRtp)

  const onFormSubmit = async (data) => {
    console.log(JSON.stringify(data))
    await mutateAsync({ ...data })
    history.push('/')
  }

  return (
    <>
      <h2>Create Routine Transaction Policy</h2>
      <RtpForm onFormSubmit={onFormSubmit} isLoading={isLoading} />
    </>
  )
}
