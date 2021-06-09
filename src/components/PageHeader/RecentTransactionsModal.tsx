import React, { useMemo } from 'react'
import { CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Text, Modal, Button } from '@pureswap-libs/uikit'
import { useActiveWeb3React } from 'hooks'
import { getEtherscanLink } from 'utils'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import Loader from 'components/Loader'
import styled from 'styled-components'

type RecentTransactionsModalProps = {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color="success" />, color: 'success' }
  }

  return { icon: <ErrorIcon color="failure" />, color: 'failure' }
}

const handleColor = (type: string | undefined) => {
  switch (type) {
    case 'failure':
      return '#D63232'
    default:
      return '#ABDFCC'
  }
}

const PureLinkExternal = styled(LinkExternal)`
  font-weight: 600;
  font-size: 14px;
  margin-left: 10px;
  color: ${props => handleColor(props.color)};
`

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss }: RecentTransactionsModalProps) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  return (
    <Modal title="Recent Transactions" onDismiss={onDismiss}>
      {!account && (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <Text mb="8px" bold>
            Please connect your wallet to view your recent transactions
          </Text>
          <Button variant="tertiary" size="sm" onClick={onDismiss}>
            Close
          </Button>
        </Flex>
      )}
      {account && chainId && sortedRecentTransactions.length === 0 && (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <Text mb="8px" bold>
            No recent transactions
          </Text>
          <Button variant="tertiary" size="sm" onClick={onDismiss}>
            Close
          </Button>
        </Flex>
      )}
      {account &&
        chainId &&
        sortedRecentTransactions.map((sortedRecentTransaction) => {
          const { hash, summary } = sortedRecentTransaction
          const { icon, color } = getRowStatus(sortedRecentTransaction)

          return (
            <>
              <Flex key={hash} alignItems="center" justifyContent="flex-start" mb="6px" pl="20px">
                {icon}
                <PureLinkExternal href={getEtherscanLink(chainId, hash, 'transaction')} color={color}>
                  {summary ?? hash}
                </PureLinkExternal>
              </Flex>
            </>
          )
        })}
    </Modal>
  )
}

export default RecentTransactionsModal
