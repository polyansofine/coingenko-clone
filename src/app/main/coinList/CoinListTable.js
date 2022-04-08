/* eslint-disable prettier/prettier */
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
// import OrdersStatus from '../order/OrdersStatus';
import { Grid } from '@material-ui/core';
import { selectCoins, getCoins } from './store/coinsSlice';
import CoinListTableHead from './CoinListTableHead';
import { getCoinsList, selectCoinsList } from './store/coinsListSlice';

function CoinListTable(props) {
  const dispatch = useDispatch();
  const orders = useSelector(selectCoins);
  const coinsList = useSelector(selectCoinsList);

  const searchText = useSelector(
    ({ coinList }) => coinList.coinsList.searchText
  );
  const { filterCoinList, search } = useSelector(
    ({ coinList }) => coinList.coinsList
  );

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(orders);
  // const [coinsData, setCoinsData] = useState(coinsList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(getCoinsList()).then(() => {
      dispatch(getCoins(page)).then(() => setLoading(false));
    });
  }, [dispatch, page]);

  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setData(FuseUtils.filterArrayByString(orders, searchText));
    //   setPage(0);
    // } else {
    setData(orders);
    // }
  }, [orders, searchText]);
  useEffect(() => {
    setPage(0);
  }, [search]);
  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.history.push(`/apps/e-commerce/orders/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no orders!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <CoinListTableHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'id': {
                      return parseInt(o.id, 10);
                    }
                    case 'customer': {
                      return o.customer.firstName;
                    }
                    case 'payment': {
                      return o.payment.method;
                    }
                    case 'status': {
                      return o.status[0].name;
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(0, search ? 50 : rowsPerPage)
              .map((n, index) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>
                    <TableCell
                      className="w-40 md:w-64 text-center"
                      padding="none"
                    >
                      {n.market_cap_rank}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <Grid container>
                        <span>
                          <img
                            loading="lazy"
                            width="18"
                            height="18"
                            src={n.image}
                            alt={n.name}
                          />
                        </span>
                        <Typography style={{ marginLeft: 2 }}>
                          {n.name}
                        </Typography>
                      </Grid>
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.symbol.toUpperCase()}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <span>$</span>
                      {n.current_price?.toLocaleString()}
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                      style={{
                        color:
                          n.price_change_percentage_1h_in_currency > 0
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {Math.round(
                        n.price_change_percentage_1h_in_currency * 10
                      ) / 10}
                      %
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      align="right"
                      scope="row"
                      style={{
                        color:
                          n.price_change_percentage_24h_in_currency > 0
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {Math.round(
                        n.price_change_percentage_24h_in_currency * 10
                      ) / 10}
                      %
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                      style={{
                        color:
                          n.price_change_percentage_7d_in_currency > 0
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {/* <OrdersStatus name={n.status[0].name} /> */}
                      {Math.round(
                        n.price_change_percentage_7d_in_currency * 10
                      ) / 10}
                      %
                    </TableCell>

                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <span>$</span>
                      {n.total_volume?.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      <span>$</span>
                      {n.market_cap?.toLocaleString()}
                    </TableCell>
                    <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                    >
                      <img
                        loading="lazy"
                        width="135"
                        height="50"
                        alt={`${n.name} 7d chart`}
                        src={`https://www.coingecko.com/coins/${
                          n.image.split('/')[5]
                        }/sparkline`}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="flex-shrink-0 border-t-1"
        component="div"
        count={
          filterCoinList.length > 0 ? filterCoinList.length : coinsList.length
        }
        rowsPerPage={search ? 50 : rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(CoinListTable);
