import { ColumnsType } from 'antd/lib/table'
import React, { useState } from 'react'
import { pipe } from 'fp-ts/lib/function'
import { record } from 'fp-ts'
import { TransactionTriggerPolicy } from '~/src/types/TransactionTriggerPolicy'
import { Button, Table } from 'antd'
import {
  useDeleteTransactionTriggerPolicy,
  useGetTransactionTriggerPolicies,
} from '~/src/CustomHooks/TransactionTriggerPolicyQueries/queries'
import { useOrganizationPermissions } from '@library/react-toolkit'
import { useQueryClient } from 'react-query'
import { ModalUpdateTransactionTriggerPolicy } from './ModalUpdateTransactionTriggerPolicy'
import Profile from './Profile'
import Amount from '../Amount'

type Props = {
  nymId: string
}

export const TransactionTriggerPolicyTable: React.FC<Props> = ({ nymId }) => {
  let contributor: boolean

  const walletPermission = useOrganizationPermissions()?.walletPermissions
  if (walletPermission) {
    walletPermission[nymId] === 'CONTRIBUTOR' ? (contributor = true) : (contributor = false)
  }
  const [showUpdateModal, setShowUpateModal] = useState<boolean>(false)
  const [updateId, setUpdateId] = useState(0)
  const [updateNymID, setUpdateNymID] = useState('')
  const [page, setPage] = useState(0)
  const { data, isLoading, isError } = useGetTransactionTriggerPolicies(nymId, {
    page,
    itemsPerPage: 5,
  })
  const { mutateAsync, isLoading: loadingDelete } = useDeleteTransactionTriggerPolicy()
  const queryClient = useQueryClient()
  const remove = async (nymID: string, id: number) => {
    await mutateAsync({ nymID, id }, {})
    queryClient.invalidateQueries('ttps')
  }
  const columns: ColumnsType<TransactionTriggerPolicy> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'Name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, item) => (
        <span>
          {pipe(
            item.amount,
            record.collect((unitID, value) => (
              <Amount amount={value} key={unitID} unitID={unitID} />
            ))
          )}
        </span>
      ),
    },
    {
      title: 'Targeted Balance',
      dataIndex: 'targetedBalance',
      key: 'targetedBalance',
      render: (_, item) => (
        <span>
          {pipe(
            item.targetedBalance,
            record.collect((unitID, value) => (
              <Amount amount={value} key={unitID} unitID={unitID} />
            ))
          )}
        </span>
      ),
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      render: (_, item) => <Profile nymID={item.recipient} />,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, item) => (
        <div key={item.id}>
          {contributor ? (
            <>
              <Button
                loading={loadingDelete}
                onClick={() => remove(item.nymID, item.id)}
                type="primary"
              >
                Delete
              </Button>
              <Button
                onClick={() => {
                  setUpdateId(item.id)
                  setUpdateNymID(item.nymID)
                  setShowUpateModal(true)
                }}
              >
                Update
              </Button>
            </>
          ) : (
            <span>You are a viewer of this wallet</span>
          )}
        </div>
      ),
    },
  ]

  if (isError) {
    return <span>Error:something went wrong</span>
  }

  return (
    <>
      {showUpdateModal && (
        <ModalUpdateTransactionTriggerPolicy
          nymID={updateNymID}
          id={updateId}
          visible={showUpdateModal}
          close={() => setShowUpateModal(false)}
        />
      )}
      <Table
        size="small"
        loading={isLoading}
        dataSource={data?.data.map((o) => ({ key: o.id, ...o }))}
        columns={columns}
        pagination={{
          total: data?.total,
          pageSize: 5,
          onChange: (page) => {
            setPage(page - 1)
          },
        }}
      />
    </>
  )
}
