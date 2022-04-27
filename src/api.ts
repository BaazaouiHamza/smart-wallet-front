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

export const deleteRtp = async (id) => {
  const response = await fetch(`/smart-wallet/api/userPolicy/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Something went wrong')
  }

  return true
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
}

export const updateRtp = async ({ id, ...data }) => {
  const response = await fetch(`/smart-wallet/api/policy/routineTransactionPolicy/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error('Something went wrong.')
  }
}
