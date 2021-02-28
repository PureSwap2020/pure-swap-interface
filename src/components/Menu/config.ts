import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: 'http://pureswap.finance/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: 'http://pureswap.finance/pools',
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: 'http://pureswap.finance/ifo',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/pancakeswap',
      },
    ],
  },
]

export default config
