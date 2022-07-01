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
    url: 'https://arbitoor-aggregator.gitbook.io/arbitoor',
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
];