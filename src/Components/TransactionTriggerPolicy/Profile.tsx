import { PeerWithNym } from '@library/react-toolkit'
import React from 'react'
import { useGetProfileNames } from '~/src/CustomHooks/ExternalQueries/queries'

type props = {
  nymID: string
}

const Profile = ({ nymID }: props) => {
  const profileQuery = useGetProfileNames(nymID)
  return profileQuery.data ? (
    <PeerWithNym
      nym={nymID}
      firstName={profileQuery.data[nymID]?.firstName ?? ''}
      lastName={profileQuery.data[nymID]?.lastName ?? ''}
    />
  ) : (
    <div>Not Existing</div>
  )
}
export default Profile
