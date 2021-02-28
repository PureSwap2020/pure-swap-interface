import { ChainId } from '@forever9/mxswap-sdk'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Button, LinkExternal } from '@pancakeswap-libs/uikit'
import { ArrowUpCircle } from 'react-feather'
import { AutoColumn } from '../Column'
import { getEtherscanLink } from '../../utils'
import { Wrapper, Section, ConfirmedIcon, ContentHeader } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId
}

const PureLinkExternal = styled(LinkExternal)`
  color: #366061;
  svg {
    fill: #366061;
    margin-left: 10px;
    margin-top: 3px;
  }
`

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)

  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>Transaction submitted</ContentHeader>
        <ConfirmedIcon>
          <img src='/images/done.png' alt='done' width={280} />
          <ArrowUpCircle style={{display: 'none'}} strokeWidth={0.5} size={97} color={theme.colors.primary} />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <PureLinkExternal href={getEtherscanLink(chainId, hash, 'transaction')}>View on HecoScan</PureLinkExternal>
          )}
          <Button style={{display: 'none'}} onClick={onDismiss} mt="20px">
            Close
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
