import { useUnits, getDCNNym } from '@library/react-toolkit'
import { Button, Table } from 'antd'
import React, { useState } from 'react'
import { RoutineTransactionPolicy } from '../types'
import { useQueryClient } from 'react-query'
// import { getRtps } from '../api'
import { useDeleteRoutineTransactionPolicy, useGetRoutineTransactionPolicies } from './queries'
import { ColumnsType } from 'antd/lib/table'
// import { useMutation, useQueryClient } from 'react-query'
// import { deleteRtp } from '../api'
// import { useHistory } from 'react-router'
import { pipe } from 'fp-ts/lib/function'
import { record } from 'fp-ts'
import { AddRtpModal } from '../CreateRtp/addRtpModal'
import { UpdateRtpModal } from '../UpdateRtp/updateRtpModal'

export const RtpsList: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [showUpdateModal, setShowUpateModal] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  // const history = useHistory()
  const nymId = 'BjsvbVTryg2EVjPXM4Sin9d11tTGvgG1dEMA58hdCu4x'
  const units = useUnits()
  console.log(units)
  const dcnNymID = getDCNNym()
  console.log('NymID', dcnNymID)
  const { data, isLoading, isError } = useGetRoutineTransactionPolicies(nymId, {
    page: page,
    itemsPerPage: 5,
  })
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading: loadingDelete } = useDeleteRoutineTransactionPolicy()
  const remove = async (id: number) => {
    await mutateAsync(id, {})
    queryClient.invalidateQueries('rtps')
  }
  // const updateRoute = (id: number) => {
  //   let path = `/rtp/update/${id}`
  //   history.push(path)
  // }

  const columns: ColumnsType<RoutineTransactionPolicy> = [
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
                {unitID} {value}
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
    },
    {
      title: 'End Date',
      dataIndex: 'scheduleEndDate',
      key: 'schedule_end_date',
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
          {/* <Button onClick={() => updateRoute(item.id)} type="link">
            Update
          </Button> */}
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
      <Button
        type="primary"
        onClick={() => {
          setShowAddModal(true)
        }}
      >
        Add RTp
      </Button>
      <AddRtpModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
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
