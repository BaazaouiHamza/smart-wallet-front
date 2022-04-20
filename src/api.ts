export const getRtps = async ({ queryKey }) => {
  /* eslint-disable no-unused-vars */
  const [_key, { nymId }] = queryKey
  const response = await fetch(
    `/smart-wallet/api/policy/routineTransactionPolicy/wallet/${nymId}?page=1&itemsPerPage=6`
  )

  if (!response.ok) {
    throw new Error('Something went wrong.')
  }

  return response.json()
}

export const postRtp = async ({ ...data }) => {
  const response = await fetch(`/smart-wallet/api/policy/routineTransactionPolicy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Something went wrong.')
  }

  return response.json()
}
