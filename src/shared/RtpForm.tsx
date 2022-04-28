import { useUnits } from '@library/react-toolkit'
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd'
import React, { FC } from 'react'
import { TranslatedMessage } from '../translations/data'
import { RoutineTransactionPolicy } from '../types'

type RoutineTransactionPolicyWithoutID = Omit<RoutineTransactionPolicy, 'id'>

type Props = {
  onSubmit: (data: RoutineTransactionPolicyWithoutID) => void
  isLoading: boolean
  initialValues?: RoutineTransactionPolicyWithoutID
}

export const RtpForm: FC<Props> = ({ initialValues, onSubmit, isLoading }) => {
  const [endDate, setEndDate] = React.useState<Date>()
  const [_startDate, setStartDate] = React.useState<Date>()
  const currentDate = new Date()
  const units = useUnits()

  return (
    <Form<{
      name: string
      description: string
      scheduleStartDate: moment.Moment
      scheduleEndDate: moment.Moment
      frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY'
      amount: number
      unitID: string
      nymID: string
      recipient: string
    }>
      initialValues={initialValues}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onValuesChange={(_, vs) => {
        setEndDate(vs.scheduleEndDate?.toDate())
        setStartDate(vs.scheduleStartDate?.toDate())
      }}
      onFinish={({ scheduleEndDate, scheduleStartDate, amount, unitID, ...rest }) => {
        onSubmit({
          ...rest,
          amount: { [unitID]: amount },
          scheduleStartDate: scheduleStartDate.toDate(),
          scheduleEndDate: scheduleEndDate.toDate(),
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
      <Form.Item label="description" tooltip="This is a required field" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        rules={[
          {
            message: 'some message',
            required: true,
          },
          {
            message: 'some message',
            validator: async (_, d: moment.Moment) => {
              if (d.toDate() < currentDate) {
                throw 'bad date'
              }
            },
          },
          {
            message: 'some message',
            validator: async (_, d: moment.Moment) => {
              if (!!endDate && d.toDate() > endDate) {
                throw 'bad date'
              }
            },
          },
        ]}
        label="Schedueled Start Date"
        name="scheduleStartDate"
      >
        <DatePicker />
      </Form.Item>
      <Form.Item label="Schedueled End Date" name="scheduleEndDate">
        <DatePicker />
      </Form.Item>
      <Form.Item name="frequency" label="Frequency">
        <Select>
          <Select.Option value="DAILY">DAILY</Select.Option>
          <Select.Option value="WEEKLY">WEEKLY</Select.Option>
          <Select.Option value="MONTHLY">MONTHLY</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="amount" label="Amount">
        <InputNumber
          addonAfter={
            <Form.Item name="unitID" label={<TranslatedMessage id="asset" />}>
              <Select>
                {Object.keys(units).map((unit) => (
                  <Select.Option value={unit} key={unit}>
                    {units[unit].name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          }
        />
      </Form.Item>
      <Form.Item name="nymID" label="Nym Id" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Recipient is required' }]}
        name="recipient"
        label="Recipient"
        required
        tooltip="This is a required field"
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} htmlType="submit" type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
