import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  TablePagination,
  CircularProgress,
  Chip,
  IconButton,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Tooltip
} from '@mui/material';
import { 
  AttachMoney, 
  PeopleAlt, 
  CreditCard, 
  AccessTime,
  Edit as EditIcon,
  DeleteOutline as DeleteIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Person as CustomerIcon,
  Store as StoreIcon,
  CalendarToday as DateIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import StatsCard from '../components/dashboard/StatsCard';
import { useState, useEffect } from 'react';

// Define interfaces
interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  storeName: string;
  orderNumber: string;
  customerName: string;
  dateTime: string;
  paymentStatus: string;
  totalAmount: number;
  discount: number;
  items: OrderItem[];
}

// Sample data for the table
const ordersData: Order[] = [
  {
    id: 1,
    storeName: 'SuperMart',
    orderNumber: 'ORD12345',
    customerName: 'John Doe',
    dateTime: '2024-03-04 12:30 PM',
    paymentStatus: 'Paid',
    totalAmount: 150.00,
    discount: 15.00,
    items: [
      {
        id: 1,
        name: 'Premium Headphones',
        image: 'https://via.placeholder.com/50',
        price: 99.99,
        quantity: 1
      },
      {
        id: 2,
        name: 'Wireless Mouse',
        image: 'https://via.placeholder.com/50',
        price: 25.00,
        quantity: 2
      }
    ]
  },
  {
    id: 2,
    storeName: 'TechGadgets',
    orderNumber: 'ORD12346',
    customerName: 'Sarah Johnson',
    dateTime: '2024-03-04 01:15 PM',
    paymentStatus: 'Pending',
    totalAmount: 299.99,
    discount: 20.00,
    items: [
      {
        id: 3,
        name: 'Smart Watch',
        image: 'https://via.placeholder.com/50',
        price: 199.99,
        quantity: 1
      },
      {
        id: 4,
        name: 'Screen Protector',
        image: 'https://via.placeholder.com/50',
        price: 20.00,
        quantity: 5
      }
    ]
  },
  {
    id: 3,
    storeName: 'FashionHub',
    orderNumber: 'ORD12347',
    customerName: 'Michael Brown',
    dateTime: '2024-03-04 02:00 PM',
    paymentStatus: 'Paid',
    totalAmount: 175.50,
    discount: 10.00,
    items: [
      {
        id: 5,
        name: 'Designer T-Shirt',
        image: 'https://via.placeholder.com/50',
        price: 45.00,
        quantity: 2
      },
      {
        id: 6,
        name: 'Jeans',
        image: 'https://via.placeholder.com/50',
        price: 85.50,
        quantity: 1
      }
    ]
  },
  {
    id: 4,
    storeName: 'HomeDecor',
    orderNumber: 'ORD12348',
    customerName: 'Emily Wilson',
    dateTime: '2024-03-04 03:45 PM',
    paymentStatus: 'Paid',
    totalAmount: 450.00,
    discount: 45.00,
    items: [
      {
        id: 7,
        name: 'Modern Lamp',
        image: 'https://via.placeholder.com/50',
        price: 120.00,
        quantity: 2
      },
      {
        id: 8,
        name: 'Wall Clock',
        image: 'https://via.placeholder.com/50',
        price: 210.00,
        quantity: 1
      }
    ]
  },
  {
    id: 5,
    storeName: 'SportsWorld',
    orderNumber: 'ORD12349',
    customerName: 'David Miller',
    dateTime: '2024-03-04 05:30 PM',
    paymentStatus: 'Pending',
    totalAmount: 275.75,
    discount: 25.00,
    items: [
      {
        id: 9,
        name: 'Running Shoes',
        image: 'https://via.placeholder.com/50',
        price: 120.00,
        quantity: 1
      },
      {
        id: 10,
        name: 'Sports Bag',
        image: 'https://via.placeholder.com/50',
        price: 45.00,
        quantity: 1
      },
      {
        id: 11,
        name: 'Water Bottle',
        image: 'https://via.placeholder.com/50',
        price: 15.00,
        quantity: 2
      }
    ]
  },
  {
    id: 6,
    storeName: 'BeautyCare',
    orderNumber: 'ORD12350',
    customerName: 'Sophia Lee',
    dateTime: '2024-03-04 06:10 PM',
    paymentStatus: 'Paid',
    totalAmount: 180.00,
    discount: 18.00,
    items: [
      {
        id: 12,
        name: 'Skincare Set',
        image: 'https://via.placeholder.com/50',
        price: 80.00,
        quantity: 1
      },
      {
        id: 13,
        name: 'Makeup Kit',
        image: 'https://via.placeholder.com/50',
        price: 100.00,
        quantity: 1
      }
    ]
  },
  {
    id: 7,
    storeName: 'BookStore',
    orderNumber: 'ORD12351',
    customerName: 'Robert Taylor',
    dateTime: '2024-03-04 07:20 PM',
    paymentStatus: 'Paid',
    totalAmount: 95.99,
    discount: 5.00,
    items: [
      {
        id: 14,
        name: 'Programming Book',
        image: 'https://via.placeholder.com/50',
        price: 45.99,
        quantity: 1
      },
      {
        id: 15,
        name: 'Novel',
        image: 'https://via.placeholder.com/50',
        price: 25.00,
        quantity: 2
      }
    ]
  },
  {
    id: 8,
    storeName: 'PetSupplies',
    orderNumber: 'ORD12352',
    customerName: 'Lisa Anderson',
    dateTime: '2024-03-04 08:45 PM',
    paymentStatus: 'Pending',
    totalAmount: 120.50,
    discount: 12.00,
    items: [
      {
        id: 16,
        name: 'Pet Food',
        image: 'https://via.placeholder.com/50',
        price: 40.00,
        quantity: 2
      },
      {
        id: 17,
        name: 'Pet Toy',
        image: 'https://via.placeholder.com/50',
        price: 20.50,
        quantity: 2
      }
    ]
  }
];

// Stats data
const stats = [
  { title: 'Total Revenue', value: '$45,231.89', change: '+20.1% from last month', icon: <AttachMoney /> },
  { title: 'Subscriptions', value: '+2350', change: '+180.1% from last month', icon: <PeopleAlt /> },
  { title: 'Sales', value: '+12,234', change: '+19% from last month', icon: <CreditCard /> },
  { title: 'Active Now', value: '+573', change: '+201 since last hour', icon: <AccessTime /> },
];

interface ViewOrderDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

function ViewOrderDialog({ open, onClose, order }: ViewOrderDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order Details</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Order Header */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StoreIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Store</Typography>
                  <Typography variant="body1">{order.storeName}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CustomerIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Customer</Typography>
                  <Typography variant="body1">{order.customerName}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DateIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Order Date</Typography>
                  <Typography variant="body1">{order.dateTime}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PaymentIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Payment Status</Typography>
                  <Chip 
                    label={order.paymentStatus} 
                    color={order.paymentStatus === 'Paid' ? 'success' : 'error'} 
                    size="small" 
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Order Items */}
          <Typography variant="h6" sx={{ mb: 2 }}>Order Items</Typography>
          <List>
            {order.items.map((item: OrderItem) => (
              <ListItem key={item.id} sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.name} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} | Price: $${item.price}`}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          {/* Order Summary */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>${order.totalAmount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Discount</Typography>
                <Typography color="error">-${order.discount.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>$5.00</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${(order.totalAmount - order.discount + 5).toFixed(2)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <ShippingIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Shipping Address</Typography>
                  <Typography variant="body1">
                    123 Main St, Apt 4B<br />
                    New York, NY 10001<br />
                    United States
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PaymentIcon color="primary" />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">Payment Method</Typography>
                  <Typography variant="body1">Credit Card (**** **** **** 1234)</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} startIcon={<CloseIcon />}>Close</Button>
        <Button variant="contained" color="primary" startIcon={<EditIcon />}>
          Edit Order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Orders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    try {
      // In a real app, you would fetch data here
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders data');
      setLoading(false);
    }
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (order: Order) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  const handleEditClick = (order: Order) => {
    // Implement edit functionality
    console.log('Edit order:', order);
  };

  const handleDeleteClick = (orderId: number) => {
    // Implement delete functionality
    console.log('Delete order:', orderId);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Orders
      </Typography>
      
      {/* Stats Cards Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
        gap: 3,
        mb: 3
      }}>
        {stats.map((stat) => (
          <StatsCard 
            key={stat.title} 
            title={stat.title} 
            value={stat.value} 
            change={stat.change}
            icon={stat.icon} 
          />
        ))}
      </Box>

      {/* Orders Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="orders table">
            <TableHead>
              <TableRow>
                <TableCell>STORE</TableCell>
                <TableCell>ORDER NO</TableCell>
                <TableCell>CUSTOMER</TableCell>
                <TableCell>VIEW ORDER</TableCell>
                <TableCell>DISCOUNT</TableCell>
                <TableCell>CHANNEL</TableCell>
                <TableCell>TOTAL</TableCell>
                <TableCell>DATE/TIME</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography color="error">{error}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      hover
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.storeName}</TableCell>
                      <TableCell>{row.orderNumber}</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>
                        <Button 
                          size="small" 
                          variant="text"
                          sx={{ textTransform: 'none' }}
                          onClick={() => handleViewClick(row)}
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell>${row.discount.toFixed(2)}</TableCell>
                      <TableCell>Online</TableCell>
                      <TableCell>${row.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{row.dateTime}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEditClick(row)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" onClick={() => handleDeleteClick(row.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* View Order Dialog */}
      <ViewOrderDialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        order={selectedOrder}
      />
    </Box>
  );
} 