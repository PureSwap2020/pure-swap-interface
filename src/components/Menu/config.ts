import { MenuEntry } from '@pureswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'http://pureswap.finance'
  },
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
  // {
  //   label: 'IFO',
  //   icon: 'NewIFOIcon',
  //   href: 'https://www.pureswap.finance/ifo',
  // },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/PureSwap2020',
      },
    ],
  },
]

// {
//   label: 'IFO',
//     icon: 'IfoIcon',
//   href: 'http://pureswap.finance/ifo',
// },

export default config
