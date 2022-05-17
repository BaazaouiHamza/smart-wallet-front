import React from 'react'
import { TranslatedMessage, useUnits } from '@library/react-toolkit'
import { InputNumber, Select, Form } from 'antd'

export const AmountInput = () => {
  const units = useUnits()
  return (
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
  )
}
