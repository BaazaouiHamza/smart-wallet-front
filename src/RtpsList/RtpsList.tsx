import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { RoutineTransactionPolicy } from '../types'
import { useQueryClient } from 'react-query'
import { useDeleteRoutineTransactionPolicy, useGetRoutineTransactionPolicies } from './queries'
import { ColumnsType } from 'antd/lib/table'
import { pipe } from 'fp-ts/lib/function'
import { record, string } from 'fp-ts'
import { UpdateRtpModal } from '../UpdateRtp/updateRtpModal'
import { useOrganizationPermissions } from '@library/react-toolkit'
import Profile from '../Components/TransactionTriggerPolicy/Profile'
import Amount from '../Components/Amount'
import { FormattedDate } from 'react-intl'

type Props = {
  nymId: string
}

export const RtpsList: React.FC<Props> = ({ nymId }) => {
  let contributor: boolean
  const walletPermission = useOrganizationPermissions()?.walletPermissions
  if (walletPermission) {
    walletPermission[nymId] === 'CONTRIBUTOR' ? (contributor = true) : (contributor = false)
  }
  const [showUpdateModal, setShowUpateModal] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [updateId, setUpdateId] = useState(0)
  const [updateNymID, setUpdateNymID] = useState('')
  const { data, isLoading, isError } = useGetRoutineTransactionPolicies(nymId, {
    page,
    itemsPerPage: 5,
  })
  // const unitName = data?.data.map((policy) => units[Object.keys(policy.amount)[0]].name)
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loadingDelete } = useDeleteRoutineTransactionPolicy()
  const remove = async (nymID: string, id: number) => {
    await mutateAsync({ nymID, id }, {})
    queryClient.invalidateQueries('rtps')
  }

  const columns: ColumnsType<RoutineTransactionPolicy> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, item) => (
        <span>
          {pipe(
            item.amount,
            record.collect(string.Ord)((unitID, value) => (
              <Amount amount={value} unitID={unitID} key={unitID} />
            ))
          )}
        </span>
      ),
    },
    {
      title: 'Frequence',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: 'Recipient',
      dataIndex: 'recipient',
      key: 'recipient',
      render: (_, item) => <Profile nymID={item.recipient} />,
    },
    {
      title: 'Start Date',
      dataIndex: 'scheduleStartDate',
      key: 'schedule_start_date',
      render: (_, item) => (
        <FormattedDate value={item.scheduleStartDate} year="2-digit" month="short" day="2-digit" />
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'scheduleEndDate',
      key: 'schedule_end_date',
      render: (_, item) => (
        <FormattedDate value={item.scheduleEndDate} year="2-digit" month="short" day="2-digit" />
      ),
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
        <UpdateRtpModal
          id={updateId}
          nymID={updateNymID}
          visible={showUpdateModal}
          close={() => setShowUpateModal(false)}
        />
      )}
      <Table
        size="small"
        loading={isLoading}
        columns={columns}
        dataSource={data?.data.map((o) => ({ key: o.id, ...o }))}
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
