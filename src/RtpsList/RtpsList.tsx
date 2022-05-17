import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { RoutineTransactionPolicy } from '../types'
import { useQueryClient } from 'react-query'
import { useDeleteRoutineTransactionPolicy, useGetRoutineTransactionPolicies } from './queries'
import { ColumnsType } from 'antd/lib/table'
import { pipe } from 'fp-ts/lib/function'
import { record } from 'fp-ts'
import { UpdateRtpModal } from '../UpdateRtp/updateRtpModal'
import { useUnits } from '@library/react-toolkit'
import moment from 'moment'

type Props = {
  nymId: string
}

export const RtpsList: React.FC<Props> = ({ nymId }) => {
  const units = useUnits()
  const [showUpdateModal, setShowUpateModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useGetRoutineTransactionPolicies(nymId, {
    page: page,
    itemsPerPage: 5,
  })
  // const unitName = data?.data.map((policy) => units[Object.keys(policy.amount)[0]].name)
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loadingDelete } = useDeleteRoutineTransactionPolicy()
  const remove = async (id: number) => {
    await mutateAsync(id, {})
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
                {value} {units[unitID]?.name}
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
    },
    {
      title: 'Start Date',
      dataIndex: 'scheduleStartDate',
      key: 'schedule_start_date',
      render: (value) => <span>{moment(value).format('MMM Do YY, h:mm:ss a').toString()}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'scheduleEndDate',
      key: 'schedule_end_date',
      render: (value) => <span>{moment(value).format('MMM Do YY, h:mm:ss a').toString()}</span>,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, item) => (
        <>
          <Button loading={loadingDelete} onClick={() => remove(item.id)} type="primary">
            Delete
          </Button>
          <Button
            onClick={() => {
              setShowUpateModal(true)
            }}
          >
            Update
          </Button>
          <UpdateRtpModal
            id={item.id}
            showUpdateModal={showUpdateModal}
            setShowUpdateModal={setShowUpateModal}
          />
        </>
      ),
    },
  ]
  console.log(data)

  if (isError) {
    return <span>Error:something went wrong</span>
  }

  return (
    <>
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
