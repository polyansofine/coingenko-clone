import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';

import React, { memo } from 'react';
import CoinListHeader from './CoinListHeader';
import CoinListTable from './CoinListTable';
import reducer from './store';

const CoinList = () => {
  return (
    <>
      <FusePageCarded
        classes={{
          content: 'flex',
          contentCard: 'overflow-hidden',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
        }}
        header={<CoinListHeader />}
        content={<CoinListTable />}
      />
    </>
  );
};

export default withReducer('coinList', reducer)(memo(CoinList));
