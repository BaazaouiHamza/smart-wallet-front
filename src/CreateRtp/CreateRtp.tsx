import { RtpForm } from '../shared'
import * as React from 'react'
import { useHistory } from 'react-router'
import { usePostRtp } from '../RtpsList/queries'
// import { useMutation } from 'react-query'
// import { postRtp } from '../api'
export const CreateRtp: React.FC = () => {
  const history = useHistory()

  // const { mutateAsync, isLoading } = useMutation(postRtp)
  const {mutateAsync,isLoading} = usePostRtp()
  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data })
    history.push('/rtpList')
  }

  return (
    <>
      <h2>Create Routine Transaction Policy</h2>
      <RtpForm defaultValues={""} onFormSubmit={onFormSubmit} isLoading={isLoading} />
    </>
  )
}
