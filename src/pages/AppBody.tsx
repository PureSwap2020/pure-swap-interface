import React from 'react'
import styled from 'styled-components'
import { Card } from '@pureswap-libs/uikit'

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 400px;
  width: 100%;
  z-index: 5;
  background: #082F33;
  overflow: visible !important;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
