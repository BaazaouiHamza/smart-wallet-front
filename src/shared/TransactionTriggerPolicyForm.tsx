import { NymSelect, useUnits } from '@library/react-toolkit'
import { Form, Input, InputNumber, Select,Button } from 'antd'
import React, { FC } from 'react'
import { TranslatedMessage } from '../translations/data'
import { TransactionTriggerPolicy } from '../types/TransactionTriggerPolicy'
import { AmountInput } from './AmountInput'
import { NymSenderSelect } from './NymSenderSelect'

type TransactionTriggerPolicyWithoutId = Omit<TransactionTriggerPolicy, 'id'>

type Props = {
  onSubmit: (data: TransactionTriggerPolicyWithoutId) => void
  isLoading:boolean
  initialValues?:any
}

export const TransactionTriggerPolicyForm: FC<Props> = ({ onSubmit,isLoading,initialValues }) => {
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
      onFinish={({ amount, unitID, targetedBalance, balanceUnitID,recipient, ...rest }) => {
        onSubmit({
          ...rest,
          amount: { [unitID]: amount },
          targetedBalance: { [balanceUnitID]: targetedBalance },
          recipient:recipient.nym
        })
      }}
      initialValues={initialValues}
    >
      <Form.Item
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
      <AmountInput />
      <Form.Item name="targetedBalance" label="Targeted Balance">
        <InputNumber
          addonAfter={
            <Form.Item name="balanceUnitID" label={<TranslatedMessage id="asset" />}>
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
      <NymSenderSelect />
      <Form.Item
        name="recipient"
        label="Recipient"
        rules={[{ required: true,message:"Recipient is required" }]}
      >
        <NymSelect />
        </Form.Item>
        <Form.Item>
          <Button loading={isLoading} htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
    </Form>
  )
}
