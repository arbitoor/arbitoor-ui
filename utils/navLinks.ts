import { faChartLine, faFile, faShuffle, faBullhorn } from '@fortawesome/free-solid-svg-icons';

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

  },
  // {
  //   id: 5,
  //   text: 'Socials',
  //   url: '',
  //   icon: faBullhorn,
  //   external: false

  // }
];