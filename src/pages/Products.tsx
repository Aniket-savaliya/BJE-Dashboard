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
  TablePagination,
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
import CloseIcon from '@mui/icons-material/Close';
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
  onVariantClick: (product: Product) => void;
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({ 
  product, 
  expanded, 
  onExpand,
  onEdit,
  onDelete,
  onVariantClick
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
        <TableCell>
          {/* Show real variant count if available, else mock */}
          {(() => {
            const liveVariants = product.variants ? (product.variants.filter(v => v.live !== false).length) : null;
            const variantCount = liveVariants !== null ? liveVariants : (product.sku.length % 4); // fallback mock
            if (variantCount === 0) {
              return (
                <span style={{ color: '#9e9e9e', fontWeight: 500, fontSize: '0.97rem' }}>No variants</span>
              );
            } else {
              return (
                <span
                  style={{
                    color: '#1976d2',
                    fontWeight: 500,
                    fontSize: '0.97rem',
                    cursor: 'pointer',
                    background: '#e3f2fd',
                    borderRadius: 999,
                    padding: '4px 16px',
                    display: 'inline-block',
                    lineHeight: 1.6,
                    transition: 'background 0.2s',
                    boxShadow: '0 1px 2px rgba(25, 118, 210, 0.04)',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#bbdefb'}
                  onMouseOut={e => e.currentTarget.style.background = '#e3f2fd'}
                  onClick={e => { e.stopPropagation(); onVariantClick(product); }}
                >
                  {variantCount} variant{variantCount > 1 ? 's' : ''} <span style={{fontSize:'1.1em',marginLeft:2,verticalAlign:'middle'}}>&#8594;</span>
                </span>
              );
            }
          })()}
        </TableCell>
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [variantProduct, setVariantProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let data = await productApi.getAllProducts();
      // Add dummy variants if missing, with randomization
      function getRandomVariants(product: Product, idx: number) {
        const variantCount = 2 + (idx % 3); // 2, 3, or 4 variants
        const colors = ['White', 'Black', 'Red', 'Blue', 'Green'];
        const sizes = ['S', 'M', 'L', 'XL'];
        return Array.from({ length: variantCount }).map((_, vIdx) => {
          const color = colors[(idx + vIdx) % colors.length];
          const size = sizes[(vIdx) % sizes.length];
          return {
            image: product.image,
            price: (product.price + (vIdx * 2) - 1).toFixed(2),
            title: `${size} / ${color}`,
            sku: `${size}-${color}-${product.sku || idx}`,
            stock: 3 + ((idx + vIdx) % 10),
            barcode: '-',
            live: true
          };
        });
      }
      data = data.map((product, idx) => ({
        ...product,
        variants: product.variants && product.variants.length > 0 ? product.variants : getRandomVariants(product, idx)
      }));
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const handleVariantClick = (product: Product) => {
    setVariantProduct(product);
    setVariantModalOpen(true);
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
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2 }}>{products.length}</Typography>
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
              <Typography variant="h5" sx={{ fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.2 }}>{products.filter(product => product.price > 0).length}</Typography>
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

        {/* Product Variants Modal */}
        <Dialog
          open={variantModalOpen}
          onClose={() => setVariantModalOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: '14px', p: 0, overflow: 'visible' }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 3, pb: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.35rem' }}>Product Variants</Typography>
            <IconButton onClick={() => setVariantModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent sx={{ pt: 1, pb: 2, px: 3 }}>
            <Box sx={{ mt: 2, border: '1px solid #e3e6ef', borderRadius: 2, overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ background: '#f8fafc' }}>
                      <TableCell sx={{ fontWeight: 600, color: '#222', width: 40 }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>Image</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>SKU</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>Stock</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>Barcode</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#222' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(variantProduct?.variants && variantProduct.variants.length > 0 ? variantProduct.variants : []).map((variant, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          <Box component="img" src={variant.image || variantProduct?.image} alt="variant" sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover', border: '1px solid #e0e0e0' }} />
                        </TableCell>
                        <TableCell>{variant.price ?? '-'}</TableCell>
                        <TableCell>{variant.title ?? '-'}</TableCell>
                        <TableCell>{variant.sku ?? '-'}</TableCell>
                        <TableCell>{variant.stock ?? '-'}</TableCell>
                        <TableCell>{variant.barcode ?? '-'}</TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!variantProduct?.variants || variantProduct.variants.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={8} align="center" sx={{ color: '#888', py: 4 }}>
                          No variants found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContent>
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
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Variant</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Price</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Stock</TableCell>
                  <TableCell sx={{ py: 1.5, fontSize: '0.875rem', fontWeight: 500, color: '#2f2f2f' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product) => (
                    <ExpandableRow
                      key={product._id}
                      product={product}
                      expanded={expandedProductId === product._id}
                      onExpand={() => setExpandedProductId(expandedProductId === product._id ? null : product._id)}
                      onEdit={() => handleEditClick(product)}
                      onDelete={() => handleDeleteClick(product)}
                      onVariantClick={handleVariantClick}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: '1px solid #e0e0e0',
              '& .MuiTablePagination-selectLabel': {
                fontSize: '0.875rem',
                color: '#2f2f2f'
              },
              '& .MuiTablePagination-displayedRows': {
                fontSize: '0.875rem',
                color: '#2f2f2f'
              },
              '& .MuiTablePagination-select': {
                fontSize: '0.875rem'
              }
            }}
          />
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