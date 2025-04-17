import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Select,
  MenuItem,
  // FormControl,
  // InputLabel,
  InputAdornment,
  // Link,
  Stack,
  Button,
  Grid as MuiGrid,
  Collapse,
} from '@mui/material';
import Layout from '../components/layout/Layout';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Grid = MuiGrid as any;

interface OrderItem {
  image: string;
  name: string;
  quantity: number;
  price: string;
  total: string;
}

interface Order {
  store: string;
  orderNo: string;
  customer: {
    name: string;
    id: string;
    email: string;
    phone: string;
  };
  discount: string | null;
  channel: string;
  paymentType: string;
  total: string;
  dateTime: string;
  shipping: {
    method: string;
    address: string;
  };
  payment: {
    method: string;
    subtotal: string;
    shipping: string;
    tax: string;
  };
  items: OrderItem[];
}

const mockOrders: Order[] = [
  {
    store: 'beefje-dev',
    orderNo: '#1001',
    customer: {
      name: 'Working User',
      id: '1',
      email: 'john.smith@gmail.com',
      phone: '+1 (555) 123-4567',
    },
    discount: 'SUMMER23',
    channel: 'shopify_draft_order',
    paymentType: 'manual',
    total: '$89.95',
    dateTime: '08/15/2023, 02:40 PM EDT',
    shipping: {
      method: 'Express Shipping',
      address: '123 Main St, New York, NY 10001',
    },
    payment: {
      method: 'manual',
      subtotal: '$79.95',
      shipping: '$10.00',
      tax: '$0',
    },
    items: [
      {
        image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
        name: 'Original Beef Jerky - Large Pack',
        quantity: 2,
        price: '$24.99',
        total: '$49.98',
      },
      {
        image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
        name: 'Spicy Buffalo Wings Jerky',
        quantity: 1,
        price: '$29.97',
        total: '$29.97',
      },
    ],
  },
  {
    store: 'bje-test',
    orderNo: '#1002',
    customer: {
      name: 'Sarah diwan',
      id: '2',
      email: 'sarah.j@outlook.com',
      phone: '+1 (555) 987-6543',
    },
    discount: null,
    channel: 'Test_order',
    paymentType: 'Card',
    total: '$145.90',
    dateTime: '08/14/2023, 11:23 AM EDT',
    shipping: {
      method: 'Standard Shipping',
      address: '456 Oak Avenue, Los Angeles, CA 90001',
    },
    payment: {
      method: 'Card',
      subtotal: '$135.90',
      shipping: '$10.00',
      tax: '$0',
    },
    items: [
      {
        image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
        name: 'Teriyaki Beef Jerky Bundle',
        quantity: 3,
        price: '$35.30',
        total: '$105.90',
      },
      {
        image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
        name: 'Buffalo Peanuts - Family Size',
        quantity: 2,
        price: '$15.00',
        total: '$30.00',
      },
    ],
  },
  {
    store: 'beef-dev',
    orderNo: '#1003',
    customer: {
      name: 'Main Chen',
      id: '3',
      email: 'mchen@company.com',
      phone: '+1 (555) 234-5678',
    },
    discount: 'FIRSTORDER',
    channel: 'shopify_order',
    paymentType: 'manual',
    total: '$199.85',
    dateTime: '08/13/2023, 09:15 AM EDT',
    shipping: {
      method: 'Next Day Delivery',
      address: '789 Pine Street, Chicago, IL 60601',
    },
    payment: {
      method: 'manual',
      subtotal: '$174.85',
      shipping: '$25.00',
      tax: '$0',
    },
    items: [
      {
        image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
        name: 'Premium Jerky Gift Box',
        quantity: 1,
        price: '$99.95',
        total: '$99.95',
      },
      {
        image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
        name: 'Honey BBQ Beef Jerky',
        quantity: 2,
        price: '$37.45',
        total: '$74.90',
      },
    ],
  },
];

interface ExpandableRowProps {
  order: Order;
  expanded: boolean;
  onExpand: () => void;
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({ order, expanded, onExpand }) => {
  return (
    <>
      <TableRow 
        sx={{ 
          '&:hover': { 
            backgroundColor: '#f5f5f5',
          },
          transition: 'background-color 0.2s',
          cursor: 'pointer'
        }}
        onClick={onExpand}
      >
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              size="small" 
              sx={{ 
                mr: 1,
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            {order.store}
          </Box>
        </TableCell>
        <TableCell>{order.orderNo}</TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {order.customer.name}
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <ContentCopyIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </TableCell>
        <TableCell>
          {order.discount !== '-' && (
            <Chip
              label={order.discount}
              size="small"
              sx={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                borderRadius: '4px',
                height: '24px',
                fontWeight: 500
              }}
            />
          )}
          {order.discount === '-' && '-'}
        </TableCell>
        <TableCell>
          <Chip
            label={order.channel}
            size="small"
            sx={{
              backgroundColor: '#fff3e0',
              color: '#ed6c02',
              borderRadius: '4px',
              height: '24px',
              fontWeight: 500
            }}
          />
        </TableCell>
        <TableCell>{order.paymentType}</TableCell>
        <TableCell>{order.total}</TableCell>
        <TableCell sx={{ whiteSpace: 'pre-line', color: 'text.secondary' }}>{order.dateTime}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={8} sx={{ p: 0, borderBottom: 'none' }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ 
              py: 3, 
              px: 4, 
              backgroundColor: '#fafafa',
              borderTop: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <Grid container spacing={4}>
                <Grid xs={4}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Customer Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{order.customer.email}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{order.customer.phone}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Shipping Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Method</Typography>
                      <Typography variant="body1">{order.shipping.method}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Address</Typography>
                      <Typography variant="body1">{order.shipping.address}</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid xs={4}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Payment Information
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Method</Typography>
                      <Typography variant="body1">{order.payment.method}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                      <Typography variant="body1">{order.payment.subtotal}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Shipping</Typography>
                      <Typography variant="body1">{order.payment.shipping}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Tax</Typography>
                      <Typography variant="body1">{order.payment.tax}</Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>

              {order.items.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Order Items
                  </Typography>
                  <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 1 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: '#fafafa' }}>
                          <TableCell sx={{ fontWeight: 500 }}>Product</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>Quantity</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>Price</TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>Total</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {order.items.map((item, itemIndex) => (
                          <TableRow key={itemIndex}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                  component="img"
                                  src={item.image}
                                  alt={item.name}
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    border: '1px solid #e0e0e0',
                                    mr: 2
                                  }}
                                />
                                {item.name}
                              </Box>
                            </TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.total}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell colSpan={3} align="right" sx={{ fontWeight: 500 }}>
                            Total
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>{order.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Orders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Filter orders based on search term and dropdown selections
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        order.orderNo.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.name.toLowerCase().includes(searchLower));

      // Store filter
      const matchesStore = selectedStore === '' || order.store === selectedStore;

      // Payment filter
      const matchesPayment = selectedPayment === '' || order.paymentType === selectedPayment;

      // Channel filter
      const matchesChannel = selectedChannel === '' || 
        (selectedChannel === 'shopify' && order.channel === 'shopify_draft_order');

      return matchesSearch && matchesStore && matchesPayment && matchesChannel;
    });
  }, [searchTerm, selectedStore, selectedPayment, selectedChannel]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStore('');
    setSelectedPayment('');
    setSelectedChannel('');
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          borderBottom: '1px solid #e0e0e0',
          pb: 2
        }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>Orders</Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={handleResetFilters}
            sx={{
              borderColor: '#e0e0e0',
              color: 'text.secondary',
              '&:hover': {
                borderColor: '#1976d2',
                backgroundColor: 'transparent'
              }
            }}
          >
            Reset Filters
          </Button>
        </Box>

        {/* Filters Section */}
        <Paper 
          elevation={0}
          sx={{ 
            mb: 3, 
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            borderRadius: 1
          }}
        >
          <Box
            sx={{
              px: 2.5,
              py: 2,
              borderBottom: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: '#fafafa'
            }}
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          >
            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500, color: '#2f2f2f' }}>
              Order Filters
            </Typography>
            <IconButton 
              size="small"
              sx={{
                transform: isFiltersExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>

          <Collapse in={isFiltersExpanded}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Search Orders
                </Typography>
                <TextField
                  placeholder="Search by order #, customer, product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  fullWidth
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      height: '40px',
                      '&:hover fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Grid container spacing={2.5}>
                <Grid item xs={4} component={'div' as any}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Stores
                    </Typography>
                    <Select
                      value={selectedStore}
                      onChange={(e) => setSelectedStore(e.target.value)}
                      displayEmpty
                      fullWidth
                      size="small"
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        height: '40px',
                        '& .MuiSelect-select': {
                          color: selectedStore ? 'inherit' : '#666'
                        }
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#666' }}>Choose stores...</span>;
                        }
                        return selected;
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: '8px',
                            marginTop: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }
                        }
                      }}
                    >
                      <MenuItem value="" disabled>Choose stores...</MenuItem>
                      <MenuItem value="beefje-dev">beefje-dev</MenuItem>
                      <MenuItem value="bje-test">bje-test</MenuItem>
                    </Select>
                  </Box>
                </Grid>

                <Grid item xs={4} component={'div' as any}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Payment Methods
                    </Typography>
                    <Select
                      value={selectedPayment}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      displayEmpty
                      fullWidth
                      size="small"
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        height: '40px',
                        '& .MuiSelect-select': {
                          color: selectedPayment ? 'inherit' : '#666'
                        }
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#666' }}>Choose Payment Methods...</span>;
                        }
                        return selected;
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: '8px',
                            marginTop: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }
                        }
                      }}
                    >
                      <MenuItem value="" disabled>Choose Payment Methods...</MenuItem>
                      <MenuItem value="manual">Manual</MenuItem>
                    </Select>
                  </Box>
                </Grid>

                <Grid item xs={4} component={'div' as any}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Sales Channels
                    </Typography>
                    <Select
                      value={selectedChannel}
                      onChange={(e) => setSelectedChannel(e.target.value)}
                      displayEmpty
                      fullWidth
                      size="small"
                      IconComponent={KeyboardArrowDownIcon}
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        height: '40px',
                        '& .MuiSelect-select': {
                          color: selectedChannel ? 'inherit' : '#666'
                        }
                      }}
                      renderValue={(selected) => {
                        if (!selected) {
                          return <span style={{ color: '#666' }}>Choose Sales Channels...</span>;
                        }
                        return selected;
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: '8px',
                            marginTop: '4px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                          }
                        }
                      }}
                    >
                      <MenuItem value="" disabled>Choose Sales Channels...</MenuItem>
                      <MenuItem value="shopify">Shopify Draft Order</MenuItem>
                    </Select>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Paper>

        {/* Orders Table */}
        <Paper 
          elevation={0}
          sx={{ 
            border: '1px solid #e0e0e0',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell sx={{ fontWeight: 500 }}>Store</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Order No</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Discount</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Channel</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Payment Type</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>Date/Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <ExpandableRow
                    key={order.orderNo}
                    order={order}
                    expanded={expandedOrder === order.orderNo}
                    onExpand={() => setExpandedOrder(
                      expandedOrder === order.orderNo ? null : order.orderNo
                    )}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredOrders.length} of {mockOrders.length} orders
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button 
              disabled 
              variant="outlined" 
              size="small"
              sx={{
                borderColor: '#e0e0e0',
                '&.Mui-disabled': {
                  borderColor: '#e0e0e0',
                }
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ 
                minWidth: '40px', 
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              1
            </Button>
            <Button 
              disabled 
              variant="outlined" 
              size="small"
              sx={{
                borderColor: '#e0e0e0',
                '&.Mui-disabled': {
                  borderColor: '#e0e0e0',
                }
              }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Orders; 