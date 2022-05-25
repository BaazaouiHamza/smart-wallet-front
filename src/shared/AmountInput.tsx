import React, { FC } from 'react'
import { TranslatedMessage, useUnits } from '@library/react-toolkit'
import { InputNumber, Select, Form } from 'antd'
import { Amount } from '../types/TransactionTriggerPolicy'

type Props = {
  initialValue?: Amount
}

export const AmountInput: FC<Props> = ({ initialValue: amount }) => {
  const units = useUnits()
  return (
    <Form.Item
      name="amount"
      label="Amount"
      initialValue={amount ? Object.values(amount)[0] : ''}
      rules={[{ required: true, message: 'Amount is required' }]}
    >
      <InputNumber
        addonAfter={
          <Form.Item
            name="unitID"
            label={<TranslatedMessage id="asset" />}
            initialValue={amount ? Object.keys(amount)[0] : ''}
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
  )
}
