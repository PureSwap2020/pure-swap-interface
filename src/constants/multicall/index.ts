import { ChainId } from '@pureswap-libs/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.BSCTESTNET]: '0x8A5eFF2BDb0b2B64160cFCFb9001e70f34293A16'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
