import { NymSelect, useUnits } from '@library/react-toolkit'
import { Form, Input, InputNumber, Select, Button } from 'antd'
import React, { FC } from 'react'
import { TranslatedMessage } from '../translations/data'
import { TransactionTriggerPolicy } from '../types/TransactionTriggerPolicy'
import { AmountInput } from './AmountInput'
import { NymSenderSelect } from './NymSenderSelect'

type TransactionTriggerPolicyWithoutId = Omit<TransactionTriggerPolicy, 'id'>

type Props = {
  onSubmit: (data: TransactionTriggerPolicyWithoutId) => void
  isLoading: boolean
  initialValues?: TransactionTriggerPolicyWithoutId
}

export const TransactionTriggerPolicyForm: FC<Props> = ({ onSubmit, isLoading, initialValues }) => {
  const [form] = Form.useForm()
  const units = useUnits()
  return (
    <Form<{
      name: string
      description: string
      amount: number
      unitID: string
      targetedBalance: number
      balanceUnitID: string
      nymID: string
      recipient: any
    }>
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      onFinish={({ amount, unitID, targetedBalance, balanceUnitID, recipient, ...rest }) => {
        onSubmit({
          ...rest,
          amount: { [unitID]: amount },
          targetedBalance: { [balanceUnitID]: targetedBalance },
          recipient: recipient.nym,
        })
      }}
    >
      <Form.Item
        initialValue={initialValues?.name}
        label={<TranslatedMessage id="name" />}
        name="name"
        rules={[
          // Any text or value displayed to user should use TranslatedMessage component
          { required: true, message: <TranslatedMessage id="nameInputPrompt" /> },
          { min: 3, message: <TranslatedMessage id="nameMinError" /> },
        ]}
      >
        <Input placeholder="Policy name" />
      </Form.Item>
      <Form.Item
        initialValue={initialValues?.description}
        label="description"
        tooltip="This is a required field"
        name="description"
        rules={[
          { required: true, message: <TranslatedMessage id="descriptionInputPrompt" /> },
          { min: 6, message: <TranslatedMessage id="descriptionMinError" /> },
        ]}
      >
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <AmountInput initialValue={initialValues?.amount} />
      <Form.Item
        name="targetedBalance"
        label="Targeted Balance"
        initialValue={
          initialValues?.targetedBalance ? Object.values(initialValues?.targetedBalance)[0] : ''
        }
        rules={[{ required: true, message: 'Targeted Balance is required' }]}
      >
        <InputNumber
          addonAfter={
            <Form.Item
              name="balanceUnitID"
              label={<TranslatedMessage id="asset" />}
              initialValue={
                initialValues?.targetedBalance ? Object.keys(initialValues?.targetedBalance)[0] : ''
              }
              rules={[{ required: true, message: 'Asset is required' }]}
            >
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
      <NymSenderSelect initialValue={initialValues?.nymID} />
      <Form.Item
        name="recipient"
        label="Recipient"
        rules={[{ required: true, message: 'Recipient is required' }]}
      >
        <NymSelect />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={() => form.resetFields}
          loading={isLoading}
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
