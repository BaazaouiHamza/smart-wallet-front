import { NymSelect } from '@library/react-toolkit'
import { Form, Input, Select, DatePicker, FormInstance } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { TranslatedMessage } from '../translations/data'
import { RoutineTransactionPolicy } from '../types'
import { AmountInput } from './AmountInput'
import { NymSenderSelect } from './NymSenderSelect'

type RoutineTransactionPolicyWithoutID = Omit<RoutineTransactionPolicy, 'id'>
// type ConvertDatesToMoment<T> = {
//   [K in keyof T]: T[K] extends Date ? moment.Moment : T[K]
// }
// type RTPWithMoment = ConvertDatesToMoment<RoutineTransactionPolicyWithoutID>

type Props = {
  form: FormInstance
  onSubmit: (data: RoutineTransactionPolicyWithoutID) => void
  initialValues?: RoutineTransactionPolicyWithoutID
}

export const RtpForm: FC<Props> = ({ form, onSubmit, initialValues }) => {
  const [startDate, setStartDate] = React.useState<Date>()
  const currentDate = new Date()
  const dateFormat = 'YYYY/MM/DD'

  return (
    <Form<{
      name: string
      description: string
      scheduleStartDate: moment.Moment
      scheduleEndDate: moment.Moment
      frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY'
      amount: Record<string, number>
      nymID: string
      recipient: { nym: string }
    }>
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onValuesChange={(_, vs) => {
        setStartDate(vs.scheduleStartDate?.toDate())
      }}
      initialValues={
        !!initialValues
          ? {
              ...initialValues,
              scheduleStartDate: moment(initialValues.scheduleStartDate),
              scheduleEndDate: moment(initialValues.scheduleEndDate),
              recipient: { nym: initialValues.recipient },
            }
          : undefined
      }
      onFinish={({ scheduleEndDate, scheduleStartDate, amount, recipient, ...rest }) => {
        console.debug('submitting')
        onSubmit({
          ...rest,
          amount,
          scheduleStartDate: scheduleStartDate.toDate(),
          scheduleEndDate: scheduleEndDate.toDate(),
          recipient: recipient.nym,
        })
      }}
    >
      <Form.Item
        name="name"
        rules={[
          // Any text or value displayed to user should use TranslatedMessage component
          { required: true, message: <TranslatedMessage id="nameInputPrompt" /> },
          { min: 3, message: <TranslatedMessage id="nameMinError" /> },
        ]}
        label={<TranslatedMessage id="name" />}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[{ required: true, message: <TranslatedMessage id="requiredField" /> }]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        rules={[
          {
            message: 'Schedueled start Date is Required',
            required: true,
          },
          {
            message: 'Schedueled start Date should be after current date',
            validator: async (_, d: moment.Moment) => {
              if (d.toDate() < currentDate) {
                throw 'bad date'
              }
            },
          },
        ]}
        label="Schedueled Start Date"
        name="scheduleStartDate"
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        rules={[
          { required: true, message: 'Schedueled end Date is Required' },
          {
            message: 'Schedueled end date must be at least 1 day after Schedueled start date',
            validator: async (_, d: moment.Moment) => {
              if (!!startDate && d.toDate() < moment(startDate).add(1, 'days').toDate()) {
                throw 'bad date'
              }
            },
          },
        ]}
        label="Schedueled End Date"
        name="scheduleEndDate"
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item name="frequency" label="Frequency">
        <Select>
          <Select.Option value="DAILY">DAILY</Select.Option>
          <Select.Option value="WEEKLY">WEEKLY</Select.Option>
          <Select.Option value="MONTHLY">MONTHLY</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Amount is required' }]}
      >
        <AmountInput />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Recipient is required' }]}
        name="recipient"
        label="Recipient"
      >
        <NymSelect />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'nymId is required' }]}
        name="nymID"
        label="Sender"
        required
        tooltip="This is a required field"
      >
        <NymSenderSelect />
      </Form.Item>
    </Form>
  )
}
