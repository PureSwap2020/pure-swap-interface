import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, IconButton, CloseIcon } from '@pureswap-libs/uikit'
import { AutoColumn, ColumnCenter } from '../Column'


export const Wrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  background-color: #1C4346;
  padding: 30px 40px;
  position: relative;
`
export const Section = styled(AutoColumn)`
  padding: 24px;
`

export const ConfirmedIcon = styled(ColumnCenter)`
  padding: 40px 0;
`

export const BottomSection = styled(Section)`
  // background-color: ${({ theme }) => theme.colors.invertedContrast};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`

/**
 * TODO: Remove this when modal system from the UI Kit is implemented
 */
const StyledContentHeader = styled.div`
  align-items: center;
  display: flex;

  & > ${Heading} {
    flex: 1;
  }
`

type ContentHeaderProps = {
  children: ReactNode
  onDismiss: () => void
}

const PureIconButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ACE0CD;
`

const PureHeading = styled(Heading)`
  font-size: 34px;
  text-align: center;
  margin: 20px 0 30px;
  line-height: 40px;
`

export const ContentHeader = ({ children, onDismiss }: ContentHeaderProps) => (
  <StyledContentHeader>
    <PureHeading>{children}</PureHeading>
    <PureIconButton onClick={onDismiss} variant="text">
      <CloseIcon color="primary" />
    </PureIconButton>
  </StyledContentHeader>
)
