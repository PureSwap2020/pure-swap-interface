import React, { useState, useCallback } from 'react'
import { Currency, Pair } from '@pancakeswap-libs/sdk'
import { Button, ChevronDownIcon, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { Input as NumericalInput } from '../NumericalInput'
import { useActiveWeb3React } from '../../hooks'
import TranslatedText from '../TranslatedText'
import { TranslateString } from '../../utils/translateTextHelpers'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 30px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
    //color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  color: ${({ selected, theme }) => (selected ? '#ffffff' : '#FFFFFF')};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0;

  :focus,
  :hover {
    color: '#ffffff';
    //background-color: ${({ theme }) => darken(0.01, theme.colors.card)};
  }
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 0rem 0 0rem;
  margin-bottom: 10px;

  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: #082f33;
  // background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = TranslateString(132, 'Input'),
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases
}: CurrencyInputPanelProps) {
  const [modalOpen, setModalOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <Text fontSize='14px'>{label}</Text>
            </RowBetween>
          </LabelRow>
        )}
        <CurrencySelect
          selected={!!currency}
          className='open-currency-select-button'
          onClick={() => {
            if (!disableCurrencySelect) {
              setModalOpen(true)
            }
          }}
        >
          <Aligner>
            {pair ? (
              <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
            ) : currency ? (
              <CurrencyLogo currency={currency} size='24px' style={{ marginRight: '8px' }} />
            ) : null}
            {pair ? (
              <Text style={{ color: '#fff' }}>
                {pair?.token0.symbol}:{pair?.token1.symbol}
              </Text>
            ) : (
              <Text style={{ color: '#fff' }}>
                {(currency && currency.symbol && currency.symbol.length > 20
                  ? `${currency.symbol.slice(0, 4)
                  }...${
                    currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)}`
                  : currency?.symbol) || <TranslatedText translationId={82}>Select a currency</TranslatedText>}
              </Text>
            )}
            {!disableCurrencySelect && <ChevronDownIcon />}
          </Aligner>
        </CurrencySelect>
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {
          border: '1px solid #366061',
          borderRadius: '6px',
          margin: '10px 0'
        }} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className='token-amount-input'
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <Button onClick={onMax} size='sm' variant='text'>
                  MAX
                </Button>
              )}
            </>
          )}
        </InputRow>
        {account && (
          <Text onClick={onMax} fontSize='14px' style={{ display: 'inline', cursor: 'pointer', color: '#f0f0f0' }}>
            {!hideBalance && !!currency && selectedCurrencyBalance
              ? `Balance: ${selectedCurrencyBalance?.toSignificant(6)}`
              : ' -'}
          </Text>
        )}
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
