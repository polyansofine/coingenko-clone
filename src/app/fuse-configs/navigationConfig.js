import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'home-component',
        title: 'Home',
        translate: 'Home',
        type: 'item',
        icon: 'whatshot',
        url: '/home',
      },
      {
        id: 'coin_list-component',
        title: 'Assets',
        translate: 'Assets',
        type: 'item',
        icon: 'money',
        url: '/assets',
      },
    ],
  },
];

export default navigationConfig;
