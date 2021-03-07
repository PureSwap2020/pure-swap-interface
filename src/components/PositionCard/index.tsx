import React, { useState } from 'react'
import { JSBI, Pair, Percent } from '@pancakeswap-libs/sdk'
import { Button, Card as UIKitCard, CardBody, Text } from '@pancakeswap-libs/uikit'
import { darken } from 'polished'
import { ChevronDown, ChevronUp } from 'react-feather'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTotalSupply } from '../../data/TotalSupply'

import { useActiveWeb3React } from '../../hooks'
import { useTokenBalance } from '../../state/wallet/hooks'
import { currencyId } from '../../utils/currencyId'
import { unwrappedToken } from '../../utils/wrappedCurrency'
import Card from '../Card'
import { AutoColumn } from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween, RowFixed } from '../Row'
import { Dots } from '../swap/styleds'
import { PurePrimaryText, PureText } from '../styles'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  // border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
  border: 1px solid ${({ theme }) => '#366061'};
  :hover {
    //border: 1px solid ${({ theme }) => darken(0.06, theme.colors.invertedContrast)};
    border: 1px solid ${({ theme }) => darken(0.06, '#366061')};
  }
`

interface PositionCardProps {
  pair: Pair
  // eslint-disable-next-line react/no-unused-prop-types
  showUnwrapped?: boolean
}

export function MinimalPositionCard({ pair, showUnwrapped = false }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = showUnwrapped ? pair.token0 : unwrappedToken(pair.token0)
  const currency1 = showUnwrapped ? pair.token1 : unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <>
      {userPoolBalance && (
        <UIKitCard>
          <CardBody style={{backgroundColor: '#082f33'}}>
            <AutoColumn gap="8px">
              <FixedHeightRow>
                <RowFixed>
                  <Text style={{ textTransform: 'uppercase', fontWeight: 600 }} fontSize="14px" color="textSubtle">
                    LP Tokens in your Wallet
                  </Text>
                </RowFixed>
              </FixedHeightRow>
              <FixedHeightRow onClick={() => setShowMore(!showMore)}>
                <RowFixed>
                  <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
                  <Text fontSize="14px">
                    {currency0.symbol}/{currency1.symbol}
                  </Text>
                </RowFixed>
                <RowFixed>
                  <PurePrimaryText fontSize="14px">{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</PurePrimaryText>
                </RowFixed>
              </FixedHeightRow>
              <AutoColumn gap="4px">
                <FixedHeightRow>
                  <PureText fontSize="14px">{currency0.symbol}:</PureText>
                  {token0Deposited ? (
                    <RowFixed>
                      <PurePrimaryText ml="6px" fontSize="14px">
                        {token0Deposited?.toSignificant(6)}
                      </PurePrimaryText>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
                <FixedHeightRow>
                  <PureText fontSize="14px">{currency1.symbol}:</PureText>
                  {token1Deposited ? (
                    <RowFixed>
                      <PurePrimaryText ml="6px" fontSize="14px">
                        {token1Deposited?.toSignificant(6)}
                      </PurePrimaryText>
                    </RowFixed>
                  ) : (
                    '-'
                  )}
                </FixedHeightRow>
              </AutoColumn>
            </AutoColumn>
          </CardBody>
        </UIKitCard>
      )}
    </>
  )
}

export default function FullPositionCard({ pair }: PositionCardProps) {
  const { account } = useActiveWeb3React()

  const currency0 = unwrappedToken(pair.token0)
  const currency1 = unwrappedToken(pair.token1)

  const [showMore, setShowMore] = useState(false)

  const userPoolBalance = useTokenBalance(account ?? undefined, pair.liquidityToken)
  const totalPoolTokens = useTotalSupply(pair.liquidityToken)

  const poolTokenPercentage =
    !!userPoolBalance && !!totalPoolTokens && JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? new Percent(userPoolBalance.raw, totalPoolTokens.raw)
      : undefined

  const [token0Deposited, token1Deposited] =
    !!pair &&
    !!totalPoolTokens &&
    !!userPoolBalance &&
    // this condition is a short-circuit in the case where useTokenBalance updates sooner than useTotalSupply
    JSBI.greaterThanOrEqual(totalPoolTokens.raw, userPoolBalance.raw)
      ? [
          pair.getLiquidityValue(pair.token0, totalPoolTokens, userPoolBalance, false),
          pair.getLiquidityValue(pair.token1, totalPoolTokens, userPoolBalance, false),
        ]
      : [undefined, undefined]

  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow onClick={() => setShowMore(!showMore)} style={{ cursor: 'pointer' }}>
          <RowFixed>
            <DoubleCurrencyLogo currency0={currency0} currency1={currency1} margin size={20} />
            <PureText>{!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}</PureText>
          </RowFixed>
          <RowFixed>
            {showMore ? (
              <ChevronUp size="20" style={{ marginLeft: '10px' }} />
            ) : (
              <ChevronDown size="20" style={{ marginLeft: '10px' }} />
            )}
          </RowFixed>
        </FixedHeightRow>
        {showMore && (
          <AutoColumn gap="8px">
            <FixedHeightRow>
              <RowFixed>
                <PureText>Pooled {currency0.symbol}:</PureText>
              </RowFixed>
              {token0Deposited ? (
                <RowFixed>
                  <PureText ml="6px">{token0Deposited?.toSignificant(6)}</PureText>
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency0} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>

            <FixedHeightRow>
              <RowFixed>
                <PureText>Pooled {currency1.symbol}:</PureText>
              </RowFixed>
              {token1Deposited ? (
                <RowFixed>
                  <PureText ml="6px">{token1Deposited?.toSignificant(6)}</PureText>
                  <CurrencyLogo size="20px" style={{ marginLeft: '8px' }} currency={currency1} />
                </RowFixed>
              ) : (
                '-'
              )}
            </FixedHeightRow>
            <FixedHeightRow>
              <PureText>Your pool tokens:</PureText>
              <Text>{userPoolBalance ? userPoolBalance.toSignificant(4) : '-'}</Text>
            </FixedHeightRow>
            <FixedHeightRow>
              <PureText>Your pool share:</PureText>
              <Text>{poolTokenPercentage ? `${poolTokenPercentage.toFixed(2)}%` : '-'}</Text>
            </FixedHeightRow>

            <RowBetween marginTop="10px">
              <Button variant="secondary" as={Link} to={`/add/${currencyId(currency0)}/${currencyId(currency1)}`} style={{ width: '48%' }}>
                Add
              </Button>
              <Button
                variant="secondary"
                as={Link}
                style={{ width: '48%' }}
                to={`/remove/${currencyId(currency0)}/${currencyId(currency1)}`}
              >
                Remove
              </Button>
            </RowBetween>
          </AutoColumn>
        )}
      </AutoColumn>
    </HoverCard>
  )
}
