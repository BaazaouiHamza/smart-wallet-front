import { useUnits } from '@library/react-toolkit'
import { Form, Input, Button, Select, DatePicker, InputNumber, Spin } from 'antd'
import React, { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

interface props {
  onFormSubmit: (data: any) => Promise<void>
  isLoading: boolean
}

export const RtpForm: FC<props> = ({ onFormSubmit, isLoading }) => {
  const [amountInput, setAmount] = useState(0)
  const [unitId, setUnitId] = useState('')

  // function disabledStartDate(current) {
  //   // Can not select days before today and today
  //   return current && current.valueOf() < Date.now()
  // }
  // const { Option } = Select
  const units = useUnits()
  const { control, handleSubmit } = useForm()
  const dateFormatList = ['YYYY-MM-DD', 'YY-MM-DD']
  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    // console.log(amount)
    // console.log(unitId)
    let amount = {}
    amount[unitId] = amountInput
    data = {
      ...data,
      amount,
    }
    onFormSubmit(data)
    // console.log(data)
  })

  // Object.keys(units).map((unit) =>
  //   // <Select.Option value={unit} key={unit}>
  //   //   {units[unit].name}
  //   // </Select.Option>
  //   console.log(unit)
  // )

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onSubmit}
    >
      <Form.Item
        rules={[
          { required: true, message: `Please input Name ` },
          { min: 3, message: 'min is 3 charachters long' },
        ]}
        label="Name"
      >
        <Controller
          name="name"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => <Input onChange={onChange} value={value} />}
        />
        {/* <Input {...register('name')} name="name" /> */}
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Please input Description' }]}
        label="description"
        tooltip="This is a required field"
      >
        <Controller
          name="description"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.TextArea onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Form.Item
        htmlFor="schedule_start_date"
        label="Schedueled Start Date"
        tooltip="This is a required field"
      >
        <Controller
          name="schedule_start_date"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker onChange={onChange} value={value} format={dateFormatList} />
          )}
        />
      </Form.Item>
      <Form.Item label="Schedueled End Date" tooltip="This is a required field">
        <Controller
          name="schedule_end_date"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker onChange={onChange} value={value} format={dateFormatList} />
          )}
        />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Please pick a Frequency' }]} label="Frequency">
        <Controller
          name="frequency"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} value={value}>
              <Select.Option value="WEEKLY">WEEKLY</Select.Option>
              <Select.Option value="MONTHLY">MONTHLY</Select.Option>
              <Select.Option value="YEARLY">YEARLY</Select.Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item label="Unit">
        <Select onChange={(e) => setUnitId(e)}>
          {Object.keys(units).map((unit) => (
            <Select.Option value={unit} key={unit}>
              {units[unit].name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Amount">
        <InputNumber onChange={(e) => setAmount(parseInt(e.toString()))} />
      </Form.Item>
      {/* <Form.Item label="Amount">
        <InputAmount />
      </Form.Item> */}
      <Form.Item label="Nym Id" required tooltip="This is a required field">
        <Controller
          name="nym_id"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input placeholder="input placeholder" onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Form.Item label="Recipient" required tooltip="This is a required field">
        <Controller
          name="recipient"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input placeholder="input placeholder" onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          {isLoading ? <Spin size="default" /> : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  )
}
