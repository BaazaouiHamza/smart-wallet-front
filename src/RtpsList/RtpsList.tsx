import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { RoutineTransactionPolicy } from '../types'
import { useQueryClient } from 'react-query'
import { useDeleteRoutineTransactionPolicy, useGetRoutineTransactionPolicies } from './queries'
import { ColumnsType } from 'antd/lib/table'
import { pipe } from 'fp-ts/lib/function'
import { record } from 'fp-ts'
import { UpdateRtpModal } from '../UpdateRtp/updateRtpModal'
import { getParsedFormat, useOrganizationPermissions, useUnits } from '@library/react-toolkit'
import moment from 'moment'
import Profile from '../Components/TransactionTriggerPolicy/Profile'

type Props = {
  nymId: string
}

export const RtpsList: React.FC<Props> = ({ nymId }) => {
  const units = useUnits()
  let contributor: boolean
  const walletPermission = useOrganizationPermissions()?.walletPermissions
  if (walletPermission) {
    walletPermission[nymId] === 'CONTRIBUTOR' ? (contributor = true) : (contributor = false)
  }
  const [showUpdateModal, setShowUpateModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [updateId, setUpdateId] = useState(0)
  const [updateNymID, setUpdateNymID] = useState('')
  const { data, isLoading, isError } = useGetRoutineTransactionPolicies(nymId, {
    page: page,
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
            record.collect((unitID, value) => (
              <div key={unitID}>
                {value.toFixed(getParsedFormat(units[unitID]).decimalPoints)}{' '}
                {getParsedFormat(units[unitID]).code}
              </div>
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
      render:(_,item)=> <Profile nymID={item.recipient} />
    },
    {
      title: 'Start Date',
      dataIndex: 'scheduleStartDate',
      key: 'schedule_start_date',
      render: (_, item) => <span>{moment(item.scheduleStartDate).format('MMM Do YY')}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'scheduleEndDate',
      key: 'schedule_end_date',
      render: (_, item) => <span>{moment(item.scheduleEndDate).format('MMM Do YY')}</span>,
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
          showUpdateModal={showUpdateModal}
          setShowUpdateModal={setShowUpateModal}
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
