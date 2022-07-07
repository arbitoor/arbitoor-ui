import { faChartLine, faFile, faShuffle } from '@fortawesome/free-solid-svg-icons';


export const links = [
  {
    id: 1,
    text: 'Trade',
    url: '/',
    icon: faShuffle,
    external: false
  },
  {
    id: 3,
    text: 'Docs',
    url: 'https://docs.arbitoor.com',
    icon: faFile,
    external: true

  },
  {
    id: 4,
    text: 'Stats',
    url: '/stats',
    icon: faChartLine,
    external: false

  }
];

export const socials = [
  {
    id: 1,
    text: 'Twitter',
    url: 'https://twitter.com/arbitoor',
    icon: '/assets/social/twitter.svg',
    external: true
  },
  {
    id: 2,
    text: 'Discord',
    url: 'https://discord.gg/yaQFbBs6Hg',
    icon: '/assets/social/discord.svg',
    external: true
  },
  {
    id: 3,
    text: 'Medium',
    url: 'https://medium.com/@Arbitoor',
    icon: '/assets/social/medium.svg',
    external: true
  },
  {
    id: 4,
    text: 'Github',
    url: 'https://github.com/arbitoor',
    icon: '/assets/social/github.svg',
    external: true
  },
]