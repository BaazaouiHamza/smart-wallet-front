import React, { FC } from 'react'
import { useUnits } from '@library/react-toolkit'
import { InputNumber, Select } from 'antd'
import { Amount } from '../types/TransactionTriggerPolicy'
import { pipe } from 'fp-ts/lib/function'
import { array, option, record } from 'fp-ts'

type Props = {
  value?: Amount
  onChange?: (_: Amount) => void
}

export const AmountInput: FC<Props> = ({ value, onChange }) => {
  console.debug('AmountInput', value)
  const [amount, setAmount] = React.useState<number>()
  const [unit, setUnit] = React.useState<string>()
  const singleValue = !!value
    ? pipe(value, record.toArray, array.head, option.toUndefined)
    : undefined

  const units = useUnits()

  return (
    <InputNumber
      value={singleValue?.[1]}
      onChange={(i) => {
        setAmount(i)
        if (!!unit && i !== undefined) {
          onChange?.({ [unit]: i })
        }
      }}
      addonAfter={
        <Select
          onChange={(u) => {
            setUnit(u)
            if (!!u && amount !== undefined) {
              onChange?.({ [u]: amount })
            }
          }}
          value={singleValue?.[0]}
        >
          {Object.keys(units).map((unit) => (
            <Select.Option value={unit} key={unit}>
              {units[unit].name}
            </Select.Option>
          ))}
        </Select>
      }
    />
  )
}
