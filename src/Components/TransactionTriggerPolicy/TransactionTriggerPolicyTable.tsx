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
import { useUnits } from '@library/react-toolkit'
import { useQueryClient } from 'react-query'
import { ModalUpdateTransactionTriggerPolicy } from './ModalUpdateTransactionTriggerPolicy'

type Props = {
  nymId: string
}

export const TransactionTriggerPolicyTable: React.FC<Props> = ({ nymId }) => {
  const units = useUnits()
  const [showUpdateModal, setShowUpateModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetTransactionTriggerPolicies(nymId, {
    page: page,
    itemsPerPage: 5,
  })
  const { mutateAsync, isLoading: loadingDelete } = useDeleteTransactionTriggerPolicy()
  const queryClient = useQueryClient()
  const remove = async (nymID: string, id: number) => {
    await mutateAsync({ nymID, id }, {})
    queryClient.invalidateQueries('ttps')
  }
  console.log(units)
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
              <div key={unitID}>
                {value} {units[unitID]?.name}
              </div>
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
              <div key={unitID}>
                {value} {units[unitID]?.name}
              </div>
            ))
          )}
        </span>
      ),
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, item) => (
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
              setShowUpateModal(true)
            }}
          >
            Update
          </Button>
          <ModalUpdateTransactionTriggerPolicy
            nymID={item.nymID}
            id={item.id}
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpateModal}
          />
        </>
      ),
    },
  ]

  if (isError) {
    return <span>Error:something went wrong</span>
  }

  return (
    <>
      <Table
        size="small"
        loading={isLoading}
        dataSource={data?.data.map((o) => ({ key: o.id, ...o }))}
        columns={columns}
        pagination={{
          total: data?.total,
          pageSize: 5,
          onChange: (page) => {
            setPage(page)
          },
        }}
      />
    </>
  )
}
