import { useUnits, NymSelect} from '@library/react-toolkit'
import { Form, Input, Button, Select, InputNumber, DatePicker } from 'antd'
import moment from 'moment'
import React, { FC } from 'react'
import { TranslatedMessage } from '../translations/data'
import { RoutineTransactionPolicy } from '../types'

type RoutineTransactionPolicyWithoutID = Omit<RoutineTransactionPolicy, 'id'>

type Props = {
  onSubmit: (data: RoutineTransactionPolicyWithoutID) => void
  isLoading: boolean
  initialValues?: RoutineTransactionPolicyWithoutID
}

export const RtpForm: FC<Props> = ({ onSubmit, isLoading }) => {
  const [endDate, setEndDate] = React.useState<Date>()
  const [_startDate, setStartDate] = React.useState<Date>()
  const currentDate = new Date()
  const units = useUnits()
  const dateFormat = "YYYY/MM/DD";
  // const initScheduelStartDate = moment(initialValues?.scheduleStartDate)
  // const initScheduelEndDate = moment(initialValues?.scheduleEndDate)
  // const init = {
  //   scheduleStartDate:initScheduelStartDate,
  //   scheduleEndDate:initScheduelEndDate,
  //   ...initialValues
  // }
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
      recipient: any
    }>
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onValuesChange={(_, vs) => {
        setEndDate(vs.scheduleEndDate?.toDate())
        setStartDate(vs.scheduleStartDate?.toDate())
      }}
      onFinish={({ scheduleEndDate, scheduleStartDate, amount, unitID, recipient, ...rest }) => {
        onSubmit({
          ...rest,
          amount: { [unitID]: amount },
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
        <DatePicker  format={dateFormat} />
      </Form.Item>
      <Form.Item label="Schedueled End Date" name="scheduleEndDate">
        <DatePicker format={dateFormat} />
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
      {/* <Form.Item name="nymID" label="Nym Id" required tooltip="This is a required field">
        <Input placeholder="input placeholder" />
      </Form.Item> */}
      <Form.Item name="recipient" label="Recipient">
        <NymSelect />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'nymId is required' }]}
        name="nymID"
        label="Sender"
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
