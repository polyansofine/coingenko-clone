import CoinList from './CoinList';
// import CoinListPage from "./CoinLlist";

const CoinListConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/coin_list',
      component: CoinList,
    },
  ],
};

export default CoinListConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};

export default ExampleConfig;

*/
