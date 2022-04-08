import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { removeOrders } from "../store/ordersSlice";

const rows = [
  {
    id: 'id',
    align: 'right',
    disablePadding: true,
    label: '#',
    sort: true,
  },
  {
    id: 'coin_name',
    align: 'left',
    disablePadding: false,
    label: 'Asset',
    sort: true,
  },
  {
    id: 'symbol',
    align: 'right',
    disablePadding: false,
    label: 'Symbol',
    sort: true,
  },
  {
    id: 'price',
    align: 'right',
    disablePadding: false,
    label: 'Price',
    sort: true,
  },
  {
    id: '1h',
    align: 'right',
    disablePadding: false,
    label: '1h',
    sort: true,
  },
  {
    id: '24h',
    align: 'right',
    disablePadding: false,
    label: '24h',
    sort: true,
  },
  {
    id: '7d',
    align: 'right',
    disablePadding: false,
    label: '7d',
    sort: true,
  },
  {
    id: '24volume',
    align: 'right',
    disablePadding: false,
    label: '24h Volume',
    sort: true,
  },
  {
    id: 'mkt',
    align: 'right',
    disablePadding: false,
    label: 'Mkt Cap',
    sort: true,
  },
  {
    id: 'last7days',
    align: 'center',
    disablePadding: false,
    label: 'Last 7 Days',
    sort: true,
  },
];

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper,
  },
}));

function OrdersTableHead(props) {
  const classes = useStyles(props);
  const { selectedOrderIds } = props;
  const numSelected = selectedOrderIds.length;

  const [selectedOrdersMenu, setSelectedOrdersMenu] = useState(null);

  const dispatch = useDispatch();

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openSelectedOrdersMenu(event) {
    setSelectedOrdersMenu(event.currentTarget);
  }

  function closeSelectedOrdersMenu() {
    setSelectedOrdersMenu(null);
  }

  // const {onSelectAllClick, order, orderBy, numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow className="h-48 sm:h-64">
        {rows.map((row) => {
          return (
            <TableCell
              className="p-4 md:p-16"
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'normal'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }
            >
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}
                    className="font-semibold"
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </TableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default OrdersTableHead;
