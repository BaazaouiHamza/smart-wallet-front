import * as React from 'react'
import { useUnits, getParsedFormat, SimpleUnit } from '@library/react-toolkit'
import { FormattedNumber } from 'react-intl'

const Amount = ({ amount, unitID }: { amount: number; unitID: string }) => {
  const units = useUnits()
  const selectedUnit: SimpleUnit | undefined = units[unitID]
  const { decimalPoints, code } = !!selectedUnit
    ? getParsedFormat(selectedUnit)
    : { decimalPoints: 1, code: '' }

  return (
    <>
      <FormattedNumber
        value={amount / 10 ** decimalPoints}
        minimumFractionDigits={decimalPoints}
        maximumFractionDigits={decimalPoints}
      />{' '}
      {code}
    </>
  )
}

export default Amount
