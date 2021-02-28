import { Currency, CurrencyAmount, Fraction, Percent } from '@forever9/mxswap-sdk'
import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import { RowBetween, RowFixed } from '../../components/Row'
import CurrencyLogo from '../../components/CurrencyLogo'
import { Field } from '../../state/mint/actions'
import { TYPE } from '../../components/Shared'

const { body: Body } = TYPE

export function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  return (
    <>
      <RowBetween>
        <Body fontSize={14} color="#366061">{currencies[Field.CURRENCY_A]?.symbol} Deposited</Body>
        <RowFixed>
          <Body fontSize={14}>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Body>
          <CurrencyLogo size="14px" currency={currencies[Field.CURRENCY_A]} style={{ marginLeft: '8px' }} />
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Body fontSize={14} color="#366061">{currencies[Field.CURRENCY_B]?.symbol} Deposited</Body>
        <RowFixed>
          <Body fontSize={14}>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Body>
          <CurrencyLogo size="14px" currency={currencies[Field.CURRENCY_B]} style={{ marginLeft: '8px' }} />
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Body fontSize={14} color="#366061">Rates</Body>
        <Body fontSize={14}>
          {`1 ${currencies[Field.CURRENCY_A]?.symbol} = ${price?.toSignificant(4)} ${
            currencies[Field.CURRENCY_B]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Body fontSize={14}>
          {`1 ${currencies[Field.CURRENCY_B]?.symbol} = ${price?.invert().toSignificant(4)} ${
            currencies[Field.CURRENCY_A]?.symbol
          }`}
        </Body>
      </RowBetween>
      <RowBetween>
        <Body fontSize={14} color="#366061">Share of Pool:</Body>
        <Body fontSize={14}>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Body>
      </RowBetween>
      <Button mt="20px" onClick={onAdd}>
        {noLiquidity ? 'Create Pool & Supply' : 'Confirm Supply'}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
