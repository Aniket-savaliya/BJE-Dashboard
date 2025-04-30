import React, { useState } from 'react';
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
  Button,
  IconButton,
  InputAdornment,
  FormControl,
  // InputLabel,
  Select,
  MenuItem,
  Stack,
  Chip,
  Grid,
  Collapse,
  // Popover,
  // Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import Layout from '../components/layout/Layout';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { format } from 'date-fns';

interface Product {
  id: string;
  image: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

const mockProducts: Product[] = [
  {
    id: '1',
    image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
    name: 'Original Beef Jerky - Large Pack',
    sku: 'BJ-ORI-001',
    category: 'Original Flavors',
    price: '$24.99',
    stock: 150,
    status: 'active',
  },
  {
    id: '2',
    image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
    name: 'Spicy Buffalo Wings Jerky',
    sku: 'BJ-SPY-002',
    category: 'Spicy Flavors',
    price: '$29.97',
    stock: 85,
    status: 'active',
  },
  {
    id: '3',
    image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
    name: 'Teriyaki Beef Jerky Bundle',
    sku: 'BJ-TER-003',
    category: 'Bundles',
    price: '$35.30',
    stock: 42,
    status: 'active',
  },
  {
    id: '4',
    image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
    name: 'Premium Jerky Gift Box',
    sku: 'BJ-GFT-004',
    category: 'Gift Sets',
    price: '$99.95',
    stock: 25,
    status: 'active',
  },
  {
    id: '5',
    image: 'https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png',
    name: 'Honey BBQ Beef Jerky',
    sku: 'BJ-BBQ-005',
    category: 'Sweet Flavors',
    price: '$37.45',
    stock: 0,
    status: 'draft',
  }
];

interface ExpandableRowProps {
  product: Product;
  expanded: boolean;
  onExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({ 
  product, 
  expanded, 
  onExpand,
  onEdit,
  onDelete 
}) => {
  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return {
          color: '#2e7d32',
          backgroundColor: '#e8f5e9'
        };
      case 'draft':
        return {
          color: '#ed6c02',
          backgroundColor: '#fff3e0'
        };
      case 'archived':
        return {
          color: '#d32f2f',
          backgroundColor: '#ffebee'
        };
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return '#d32f2f';
    if (stock < 50) return '#ed6c02';
    return '#2e7d32';
  };

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
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: 50,
                height: 50,
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}
            />
          </Box>
        </TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{product.sku}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell>
          <Typography variant="body2" fontWeight={500}>
            {product.price}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography 
            variant="body2" 
            sx={{ 
              color: getStockColor(product.stock),
              fontWeight: 500
            }}
          >
            {product.stock} units
          </Typography>
        </TableCell>
        <TableCell>
          <Chip
            label={product.status}
            size="small"
            sx={{
              ...getStatusColor(product.status),
              textTransform: 'capitalize',
              fontWeight: 500,
              borderRadius: '4px',
              height: '24px'
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton 
            size="small"
            sx={{
              color: '#1976d2',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            size="small"
            sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                color: '#d32f2f',
                backgroundColor: 'rgba(211, 47, 47, 0.04)'
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={9} sx={{ p: 0, borderBottom: 'none' }}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ 
              py: 3, 
              px: 4, 
              backgroundColor: '#fafafa',
              borderTop: '1px solid #e0e0e0',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <Grid container spacing={4}>
                <Grid item xs={4} component={'div' as any}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Product Details
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">SKU</Typography>
                      <Typography variant="body1">{product.sku}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Category</Typography>
                      <Typography variant="body1">{product.category}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Description</Typography>
                      <Typography variant="body1" sx={{ mt: 0.5 }}>
                        {product.name} A delicious and high-quality snack product.
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={4} component={'div' as any}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Pricing & Inventory
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Base Price</Typography>
                      <Typography variant="body1">{product.price}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Stock Status</Typography>
                      <Chip
                        label={product.status}
                        size="small"
                        sx={{
                          ...getStatusColor(product.status),
                          textTransform: 'capitalize',
                          fontWeight: 500,
                          borderRadius: '4px',
                          height: '24px'
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Available Quantity</Typography>
                      <Typography variant="body1">{product.stock} units</Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={4} component={'div' as any}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500, color: '#1976d2' }}>
                    Variants
                  </Typography>
                  <Stack spacing={2}>
                    <Box sx={{ 
                      p: 2, 
                      backgroundColor: 'white', 
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Default Variant
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          component="img"
                          src={product.image}
                          alt={product.name}
                          sx={{
                            width: 40,
                            height: 40,
                            objectFit: 'cover',
                            borderRadius: '4px',
                          }}
                        />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Regular Size
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            SKU: {product.sku}
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  
  // Dialog states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Product>>({});

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditFormData(product);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (productToEdit && editFormData) {
      setProducts(products.map(p => 
        p.id === productToEdit.id ? { ...p, ...editFormData } : p
      ));
      setEditDialogOpen(false);
      setProductToEdit(null);
      setEditFormData({});
    }
  };

  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Layout>
      <Box sx={{ p: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4, 
          pb: 2
        }}>
          <Typography variant="h5" sx={{ fontWeight: 500, color: '#1a1a1a' }}>Products</Typography>
        </Box>

        {/* Statistics Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
          <Paper 
            elevation={0}
            sx={{ 
              flex: 1, 
              p: 2.5, 
              display: 'flex', 
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                borderColor: '#1976d2',
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Box sx={{ 
              width: 44, 
              height: 44, 
              borderRadius: '8px', 
              backgroundColor: 'rgba(76, 175, 80, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mr: 2
            }}>
              <DriveFileRenameOutlineIcon sx={{ color: '#4caf50', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 0.5, fontSize: '0.8125rem' }}>Total Products</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2 }}>18</Typography>
            </Box>
          </Paper>
          <Paper 
            elevation={0}
            sx={{ 
              flex: 1, 
              p: 2.5, 
              display: 'flex', 
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                borderColor: '#1976d2',
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Box sx={{ 
              width: 44, 
              height: 44, 
              borderRadius: '8px', 
              backgroundColor: 'rgba(33, 150, 243, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mr: 2
            }}>
              <AttachMoneyIcon sx={{ color: '#2196f3', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography color="textSecondary" variant="body2" sx={{ mb: 0.5, fontSize: '0.8125rem' }}>Total Price Updated</Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2 }}>2</Typography>
            </Box>
          </Paper>
        </Box>

        {/* Filters Section */}
        <Paper 
          elevation={0}
          sx={{ 
            mb: 3, 
            overflow: 'hidden',
            border: '1px solid #e0e0e0',
            borderRadius: '10px'
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
              Product Filters
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
            <Box sx={{ p: 2.5 }}>
              <Stack direction="row" spacing={2}>
                <TextField
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  sx={{ 
                    flex: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
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
                <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      height: '40px',
                      '& .MuiSelect-select': {
                        py: 1,
                        color: selectedStore ? 'inherit' : '#666',
                        '&.Mui-focused': {
                          backgroundColor: 'transparent'
                        }
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
                    <MenuItem value="bje-test">bje-test</MenuItem>
                    <MenuItem value="bje-paymore">bje-paymore</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedCollection}
                    onChange={(e) => setSelectedCollection(e.target.value)}
                    displayEmpty
                    IconComponent={KeyboardArrowDownIcon}
                    sx={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      height: '40px',
                      '& .MuiSelect-select': {
                        py: 1,
                        color: selectedCollection ? 'inherit' : '#666',
                        '&.Mui-focused': {
                          backgroundColor: 'transparent'
                        }
                      }
                    }}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span style={{ color: '#666' }}>Choose collections...</span>;
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
                    <MenuItem value="" disabled>Choose collections...</MenuItem>
                    <MenuItem value="snacks">Snacks</MenuItem>
                    <MenuItem value="jerky">Jerky</MenuItem>
                    <MenuItem value="popcorn">Popcorn</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Collapse>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
              sx={{ 
                borderColor: '#e0e0e0',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDeleteConfirm}
              variant="contained"
              color="error"
              sx={{ ml: 1 }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Product Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          aria-labelledby="edit-dialog-title"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="edit-dialog-title" sx={{ pb: 1 }}>
            Edit Product
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Product Name"
                fullWidth
                value={editFormData.name || ''}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              />
              <TextField
                label="SKU"
                fullWidth
                value={editFormData.sku || ''}
                onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
              />
              <TextField
                label="Category"
                fullWidth
                value={editFormData.category || ''}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
              />
              <TextField
                label="Price"
                fullWidth
                value={editFormData.price || ''}
                onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
              />
              <TextField
                label="Stock"
                type="number"
                fullWidth
                value={editFormData.stock || ''}
                onChange={(e) => setEditFormData({ ...editFormData, stock: parseInt(e.target.value) })}
              />
              <FormControl fullWidth>
                <Select
                  value={editFormData.status || 'active'}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as Product['status'] })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button 
              onClick={() => setEditDialogOpen(false)}
              variant="outlined"
              sx={{ 
                borderColor: '#e0e0e0',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: '#1976d2',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditSave}
              variant="contained"
              sx={{ ml: 1 }}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Products Table */}
        <Paper 
          elevation={0}
          sx={{ 
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            overflow: 'hidden'
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#fafafa' }}>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Image</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Product</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>SKU</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Category</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Price</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Stock</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Status</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <ExpandableRow
                    key={product.id}
                    product={product}
                    expanded={expandedProduct === product.id}
                    onExpand={() => setExpandedProduct(
                      expandedProduct === product.id ? null : product.id
                    )}
                    onEdit={() => handleEditClick(product)}
                    onDelete={() => handleDeleteClick(product)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Products;