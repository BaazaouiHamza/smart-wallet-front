import { useUnits, getDCNNym } from '@library/react-toolkit'
import { Spin, Table } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { getRtps } from '../api'
// import { useGetRtpsList } from './queries'
export const RtpsList: React.FC = () => {
  const nymId = 'BjsvbVTryg2EVjPXM4Sin9d11tTGvgG1dEMA58hdCu4x'
  const units = useUnits()
  console.log(units)
  const dcnNymID = getDCNNym()
  console.log('NymID', dcnNymID)
  // const { data, isLoading, isError } = useGetRtpsList(nymId, { page: 1, itemsPerPage: 5 })
  const { data, isLoading, isError } = useQuery<any, Error>(['rtps', { nymId }], getRtps)
  // console.log(data?.data[9].Amount)
  // data?.data.map((rtp) => console.log(Object.keys(rtp).flatMap(r=>Object(obj[k]) === obj[k]
  // ? [k, ...getKeys(obj[k])]
  // : k))))
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
  ]
  console.log(data?.data)
  if (isLoading) {
    ;<Spin size="default" />
  }
  if (isError) {
    return <span>Error:something went wrong</span>
  }

  return <Table loading={isLoading} columns={columns} dataSource={data?.data}></Table>
}
