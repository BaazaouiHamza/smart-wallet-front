import { RtpForm } from '../shared'
import * as React from 'react'
import { useHistory } from 'react-router'
import { useCreateRoutineTransactionPolicy } from '../RtpsList/queries'
// import { useMutation } from 'react-query'
// import { postRtp } from '../api'
export const CreateRtp: React.FC = () => {
  const history = useHistory()

  // const { mutateAsync, isLoading } = useMutation(postRtp)
  // const { mutateAsync, isLoading } = useAddRoutineTransactionPolicy()
  const { mutateAsync, isLoading } = useCreateRoutineTransactionPolicy()
  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data })
    history.push('/rtpList')
  }

  return (
    <>
      <h2>Create Routine Transaction Policy</h2>
      <RtpForm onSubmit={onFormSubmit} isLoading={isLoading} />
    </>
  )
}
