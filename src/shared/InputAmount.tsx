import React from 'react'
import { useUnits } from '@library/react-toolkit'
import { Input, Select } from 'antd'

export const InputAmount = () => {
  const units = useUnits()

  return (
    <Input.Group compact>
      <Input
        name="amount"
        placeholder="amount"
        addonAfter={
          <Select>
            {Object.keys(units).map((unit) => (
              <Select.Option value={unit} key={unit}>
                {units[unit].name}
              </Select.Option>
            ))}
          </Select>
        }
      />
    </Input.Group>
  )
}
