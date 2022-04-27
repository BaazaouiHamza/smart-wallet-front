import { useUnits, getDCNNym } from '@library/react-toolkit'
import { Button, Spin, Table } from 'antd'
import React from 'react'
import { RoutineTransactionPolicy } from '../types'
import { useQueryClient } from 'react-query'
// import { getRtps } from '../api'
import { useDeleteRtp, useGetRtpsList } from './queries'
import { ColumnsType } from 'antd/lib/table'
// import { useMutation, useQueryClient } from 'react-query'
// import { deleteRtp } from '../api'
import { useHistory } from 'react-router'
export const RtpsList: React.FC = () => {
  const history = useHistory()
  const nymId = 'BjsvbVTryg2EVjPXM4Sin9d11tTGvgG1dEMA58hdCu4x'
  const units = useUnits()
  console.log(units)
  const dcnNymID = getDCNNym()
  console.log('NymID', dcnNymID)
  const { data, isLoading, isError } = useGetRtpsList(nymId, { page: 1, itemsPerPage: 10 })
  // const { data, isLoading, isError } = useQuery<any, Error>(['rtps', { nymId }], getRtps)
  // console.log(data?.data[9].Amount)
  // data?.data.map((rtp) => console.log(Object.keys(rtp).flatMap(r=>Object(obj[k]) === obj[k]
  // ? [k, ...getKeys(obj[k])]
  // : k))))
  // function getKeyByValue(object, value) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }
  const queryClient = useQueryClient()
  // const { mutateAsync, isLoading: loadingDelete } = useMutation(deleteRtp)
  const {mutateAsync,isLoading:loadingDelete} = useDeleteRtp()
  const remove = async (id: number) => {
    await mutateAsync(id)
    queryClient.invalidateQueries('rtps')
  }
  const updateRoute = (id: number) => {
    let path = `/rtp/update/${id}`
    history.push(path)
  }
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
        <span>{Object.values(item.amount ?? ({} as Record<string, number>))}</span>
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
      dataIndex: 'schedule_start_date',
      key: 'schedule_start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'schedule_end_date',
      key: 'schedule_end_date',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, item) => (
        <>
          <Button onClick={() => remove(item.id)} type="primary">
            {loadingDelete ? <Spin size="default" /> : 'Delete'}
          </Button>
          <Button onClick={() => updateRoute(item.id)} type="link">
            Update
          </Button>
        </>
      ),
    },
  ]
  console.log(data)
  if (isLoading) {
    ;<Spin size="default" />
  }
  if (isError) {
    return <span>Error:something went wrong</span>
  }

  return (
    <Table size={'small'} loading={isLoading} columns={columns} dataSource={data?.data}></Table>
  )
}
