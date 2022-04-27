import { useUnits } from '@library/react-toolkit'
import { Form, Input, Button, Select, InputNumber, Spin } from 'antd'
import React, { FC, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { RoutineTransactionPolicy } from '../types'

interface props {
  onFormSubmit: (data: any) => Promise<void>
  isLoading: boolean
  defaultValues:any
}

export const RtpForm: FC<props> = ({defaultValues ,onFormSubmit, isLoading }) => {
  const [amountInput, setAmount] = useState(0)
  const [unitId, setUnitId] = useState('')
  const currentDate = new Date()
  const units = useUnits()
  console.log('units', units)
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RoutineTransactionPolicy>({defaultValues})
  const watchFields = watch('schedule_start_date')
  console.log('watch', watchFields)
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
    console.log(data)
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
          rules={{
            required: 'Name is required',
            minLength: { value: 3, message: 'Min length is 3' },
          }}
          render={({ field: { onChange, value } }) => (
            <Input status={errors.name && 'error'} onChange={onChange} value={value} />
          )}
        />
        <p>{errors.name?.message}</p>
      </Form.Item>
      <Form.Item label="description" tooltip="This is a required field">
        <Controller
          name="description"
          control={control}
          rules={{
            required: 'Description is required',
            minLength: { value: 6, message: 'Min length is 6 charachters' },
          }}
          render={({ field: { onChange, value } }) => (
            <Input.TextArea
              status={errors.description && 'error'}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <p>{errors.description?.message}</p>
      </Form.Item>
      <Form.Item label="Schedueled Start Date">
        <Controller
          name="schedule_start_date"
          control={control}
          rules={{
            required: 'Schedueled Start Date is required',
            validate: {
              value: (startDate) =>
                Date.parse(startDate) > Date.parse(currentDate.toString())
                  ? true
                  : 'Start Date must be after today',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              status={errors.schedule_start_date && 'error'}
              type="date"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <p>{errors.schedule_start_date?.message}</p>
      </Form.Item>
      <Form.Item label="Schedueled End Date">
        <Controller
          name="schedule_end_date"
          control={control}
          rules={{
            required: 'Schedueled End Date is required',
            validate: {
              value: (endDate) =>
                Date.parse(endDate) > Date.parse(watchFields)
                  ? true
                  : 'End Date must be after start Date',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              status={errors.schedule_end_date && 'error'}
              type="date"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <p>{errors.schedule_end_date?.message}</p>
      </Form.Item>
      <Form.Item label="Frequency">
        <Controller
          name="frequency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} value={value}>
              <Select.Option value="DAILY">DAILY</Select.Option>
              <Select.Option value="WEEKLY">WEEKLY</Select.Option>
              <Select.Option value="MONTHLY">MONTHLY</Select.Option>
            </Select>
          )}
        />
      </Form.Item>

      <Form.Item label="Amount">
        <InputNumber
          onChange={(e) => setAmount(parseInt(e.toString()))}
          addonAfter={
            <Select onChange={(e) => setUnitId(e)}>
              {Object.keys(units).map((unit) => (
                <Select.Option value={unit} key={unit}>
                  {units[unit].name}
                </Select.Option>
              ))}
            </Select>
          }
        />
      </Form.Item>
      <Form.Item label="Nym Id" required tooltip="This is a required field">
        <Controller
          name="nym_id"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input placeholder="input placeholder" onChange={onChange} value={value} />
          )}
        />
      </Form.Item>
      <Form.Item label="Recipient" required tooltip="This is a required field">
        <Controller
          name="recipient"
          control={control}
          rules={{ required: 'Recipient is required' }}
          render={({ field: { onChange, value } }) => (
            <Input
              status={errors.recipient && 'error'}
              placeholder="input placeholder"
              onChange={onChange}
              value={value}
            />
          )}
        />
        <p>{errors.recipient?.message}</p>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          {isLoading ? <Spin size="default" /> : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  )
}
