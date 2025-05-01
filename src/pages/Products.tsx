import React, { useState, useEffect } from 'react';
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
  Snackbar,
  Alert,
} from '@mui/material';
import Layout from '../components/layout/Layout';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { format } from 'date-fns';
import { productApi, Product } from '../api/productApi';

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

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  sku: string;
}

type CreateProductData = Omit<Product, '_id'>;

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<CreateProductData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    sku: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editFormData, setEditFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    sku: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productApi.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0,
      sku: ''
    });
    setFormErrors({});
    setCreateDialogOpen(true);
  };

  const handleCreateSave = async () => {
    if (!validateForm(newProduct)) {
      return;
    }

    try {
      const createdProduct = await productApi.createProduct(newProduct);
      setProducts([...products, createdProduct]);
      setCreateDialogOpen(false);
      setSuccessMessage('Product created successfully');
    } catch (err) {
      if (err.response?.data?.message?.includes('duplicate')) {
        setError('SKU already exists. Please use a unique SKU.');
      } else {
        setError('Failed to create product. Please try again.');
      }
      console.error('Error creating product:', err);
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await productApi.deleteProduct(productToDelete._id);
        setProducts(products.filter(p => p._id !== productToDelete._id));
        setDeleteDialogOpen(false);
        setProductToDelete(null);
        setSuccessMessage('Product deleted successfully');
      } catch (err) {
        setError('Failed to delete product. Please try again.');
        console.error('Error deleting product:', err);
      }
    }
  };

  const validateForm = (data: CreateProductData | ProductFormData): boolean => {
    const errors: Partial<Record<keyof ProductFormData, string>> = {};
    
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!data.description.trim()) {
      errors.description = 'Description is required';
    }
    if (data.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    if (!data.category.trim()) {
      errors.category = 'Category is required';
    }
    if (data.stock < 0) {
      errors.stock = 'Stock cannot be negative';
    }
    if (!data.sku || !data.sku.trim()) {
      errors.sku = 'SKU is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
      sku: product.sku || ''
    });
    setFormErrors({});
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!productToEdit) return;

    if (!validateForm(editFormData)) {
      return;
    }

    try {
      const updatedProduct = await productApi.updateProduct(productToEdit._id, editFormData);
      setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
      setEditDialogOpen(false);
      setProductToEdit(null);
      setSuccessMessage('Product updated successfully');
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    }
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <Typography>Loading products...</Typography>
        </Box>
      </Layout>
    );
  }

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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Create Product
          </Button>
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
        {/* <Paper 
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
          >
            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 500, color: '#2f2f2f' }}>
              Product Filter
            </Typography>
          </Box>
        </Paper> */}

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
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={editFormData.name}
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                error={!!formErrors.name}
                helperText={formErrors.name}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                error={!!formErrors.description}
                helperText={formErrors.description}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={editFormData.price}
                onChange={(e) => setEditFormData({ ...editFormData, price: Number(e.target.value) })}
                error={!!formErrors.price}
                helperText={formErrors.price}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={editFormData.stock}
                onChange={(e) => setEditFormData({ ...editFormData, stock: Number(e.target.value) })}
                error={!!formErrors.stock}
                helperText={formErrors.stock}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Category"
                value={editFormData.category}
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                error={!!formErrors.category}
                helperText={formErrors.category}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Image URL"
                value={editFormData.image}
                onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="SKU"
                value={editFormData.sku}
                onChange={(e) => setEditFormData({ ...editFormData, sku: e.target.value })}
                error={!!formErrors.sku}
                helperText={formErrors.sku}
                sx={{ mb: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Create Product Dialog */}
        <Dialog
          open={createDialogOpen}
          onClose={() => setCreateDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Create New Product</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                error={!!formErrors.description}
                helperText={formErrors.description}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="SKU"
                value={newProduct.sku}
                onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                error={!!formErrors.sku}
                helperText={formErrors.sku}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                error={!!formErrors.price}
                helperText={formErrors.price}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                error={!!formErrors.stock}
                helperText={formErrors.stock}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                error={!!formErrors.category}
                helperText={formErrors.category}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateSave} variant="contained">Create</Button>
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
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <ExpandableRow
                    key={product._id}
                    product={product}
                    expanded={expandedProductId === product._id}
                    onExpand={() => setExpandedProductId(expandedProductId === product._id ? null : product._id)}
                    onEdit={() => handleEditClick(product)}
                    onDelete={() => handleDeleteClick(product)}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Snackbar for notifications */}
        <Snackbar
          open={!!error || !!successMessage}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? 'error' : 'success'}
            sx={{ width: '100%' }}
          >
            {error || successMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Layout>
  );
};

export default Products;