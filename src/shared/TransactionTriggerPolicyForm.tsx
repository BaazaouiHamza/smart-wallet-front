import { NymSelect } from '@library/react-toolkit'
import { Form, Input, FormInstance } from 'antd'
import React, { FC } from 'react'
import { TranslatedMessage } from '../translations/data'
import { TransactionTriggerPolicy } from '../types/TransactionTriggerPolicy'
import { AmountInput } from './AmountInput'
import { NymSenderSelect } from './NymSenderSelect'

type TransactionTriggerPolicyWithoutId = Omit<TransactionTriggerPolicy, 'id'>

type Props = {
  onSubmit: (data: TransactionTriggerPolicyWithoutId) => void
  initialValues?: TransactionTriggerPolicyWithoutId
  form: FormInstance<FormData>
}

type FormData = {
  name: string
  description: string
  amount: Record<string, number>
  targetedBalance: Record<string, number>
  nymID: string
  recipient: { nym: string }
}

const TransactionTriggerPolicyForm: FC<Props> = ({ form, onSubmit, initialValues }) => (
  <Form<FormData>
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    autoComplete="off"
    form={form}
    initialValues={
      !!initialValues
        ? { ...initialValues, recipient: { nym: initialValues.recipient } }
        : undefined
    }
    onFinish={({ amount, targetedBalance, recipient, ...rest }) => {
      onSubmit({
        ...rest,
        amount,
        targetedBalance,
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
    <Form.Item
      name="amount"
      label="Amount"
      rules={[{ required: true, message: 'Amount is required' }]}
    >
      <AmountInput />
    </Form.Item>
    <Form.Item
      name="targetedBalance"
      label="Targeted Balance"
      rules={[{ required: true, message: 'Targeted Balance is required' }]}
    >
      <AmountInput />
    </Form.Item>
    <Form.Item
      name="nymID"
      label="Sender"
      rules={[{ required: true, message: 'Recipient is required' }]}
    >
      <NymSenderSelect />
    </Form.Item>
    <Form.Item
      name="recipient"
      label="Recipient"
      rules={[{ required: true, message: 'Recipient is required' }]}
    >
      <NymSelect />
    </Form.Item>
  </Form>
)

export default TransactionTriggerPolicyForm
