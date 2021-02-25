import { ChainId } from '@forever9/mxswap-sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb', // TODO
  [ChainId.BSCTESTNET]: '0x9cB55890237545614150Ff84FF521Dc980592d4c'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
