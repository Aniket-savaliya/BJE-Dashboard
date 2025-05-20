import React, { useRef, useState, useEffect } from 'react';
import {
  Box, Paper, Typography, InputBase, Popper, List, ListItem, Checkbox, ListItemText, ClickAwayListener, IconButton, Button, Stack, Divider, ListItemButton, Chip, TextField, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Layout from '../components/layout/Layout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchIcon from '@mui/icons-material/Search';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Classic Beef Jerky',
    vendor: 'BJE Premium',
    status: 'Active',
    tags: ['Beef', 'Classic', 'Traditional'],
    image: '/logo.png',
    variants: [
      { title: '4oz', sku: 'BJ-CLA-4', price: '14.99', cost: '8.5', stock: '45', weight: '113', grams: 'g', barcode: 'BJ-CLA-4' },
      { title: '8oz', sku: 'BJ-CLA-8', price: '25.99', cost: '15', stock: '30', weight: '227', grams: 'g', barcode: 'BJ-CLA-8' },
    ],
  },
  {
    id: 'p2',
    title: 'Spicy Teriyaki Beef Jerky',
    vendor: 'BJE Premium',
    status: 'Active',
    tags: ['Beef', 'Spicy', 'Teriyaki'],
    image: '/logo.png',
    variants: [], // No variants
  },
  {
    id: 'p3',
    title: 'Gift Box - Jerky Sampler',
    vendor: 'BJE Premium',
    status: 'Active',
    tags: ['Beef', 'Gift Box', 'Sampler'],
    image: '/logo.png',
    variants: [
      { title: 'Sampler', sku: 'BJ-GIFT-1', price: '19.99', cost: '10', stock: '20', weight: '150', grams: 'g', barcode: 'BJ-GIFT-1' },
    ],
  },
  {
    id: 'p4',
    title: 'Honey Garlic Beef Jerky',
    vendor: 'BJE Premium',
    status: 'Active',
    tags: ['Beef', 'Honey Garlic', 'Sweet'],
    image: '/logo.png',
    variants: [
      { title: '4oz', sku: 'BJ-HON-4', price: '14.99', cost: '8.5', stock: '40', weight: '113', grams: 'g', barcode: 'BJ-HON-4' },
    ],
  },
  {
    id: 'p5',
    title: 'Peppered Beef Jerky',
    vendor: 'BJE Premium',
    status: 'Active',
    tags: ['Beef', 'Peppered', 'Spicy'],
    image: '/logo.png',
    variants: [
      { title: '4oz', sku: 'BJ-PEP-4', price: '14.99', cost: '8.5', stock: '45', weight: '113', grams: 'g', barcode: 'BJ-PEP-4' },
      { title: '8oz', sku: 'BJ-PEP-8', price: '25.99', cost: '15', stock: '30', weight: '227', grams: 'g', barcode: 'BJ-PEP-8' },
    ],
  },
];

const sampleStores = [
  { id: "store1", name: "0000 Beef Jerky Experience Franchise (93847)" },
  { id: "store2", name: "0001 Beef Jerky Experience Demo Store (93956)" },
  { id: "store3", name: "0002 Beef Jerky Experience Kodak, TN (94954)" },
  { id: "store4", name: "0003 Beef Jerky Experience Tanger Sevierville, TN (94544)" },
  { id: "store5", name: "0004 Beef Jerky Experience Pigeon Forge, TN (94952)" },
  { id: "store6", name: "0005 Beef Jerky Experience Gatlinburg, TN (94953)" },
  { id: "store7", name: "0006 Beef Jerky Experience The Island PF, TN (94955)" },
  { id: "store8", name: "0010 Beef Jerky Experience Destin, FL (94985)" },
];

const FILTERS = {
  status: ['All Status', 'Active', 'Inactive'],
  vendor: ['All Vendors', 'BJE Premium', 'Other Vendor'],
  tags: ['Filter by tags', 'Beef', 'Spicy', 'Classic', 'Gift Box', 'Sampler', 'Sweet', 'Peppered', 'Teriyaki'],
};

const SelectedProductsSection = ({ products }: { products: typeof DUMMY_PRODUCTS }) => {
  const [page, setPage] = useState(0);
  const [editedProducts, setEditedProducts] = useState<typeof DUMMY_PRODUCTS>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const itemsPerPage = 2;

  // Initialize edited products when products prop changes
  useEffect(() => {
    setEditedProducts(products);
  }, [products]);

  // Add warning when refreshing with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleFieldChange = (productId: string, field: string, value: string | string[]) => {
    setEditedProducts(prev => prev.map(product => {
      if (product.id === productId) {
        if (field === 'tags') {
          return { ...product, [field]: value as string[] };
        }
        return { ...product, [field]: value as string };
      }
      return product;
    }));
    setHasUnsavedChanges(true);
  };

  const handleVariantChange = (productId: string, variantIndex: number, field: string, value: string) => {
    setEditedProducts(prev => prev.map(product => {
      if (product.id === productId) {
        const updatedVariants = [...product.variants];
        updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], [field]: value };
        return { ...product, variants: updatedVariants };
      }
      return product;
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setHasUnsavedChanges(false);
    // Update the original products with edited values
    products.forEach((product, index) => {
      Object.assign(product, editedProducts[index]);
    });
  };

  const handleDiscard = () => {
    setEditedProducts(products);
    setHasUnsavedChanges(false);
  };

  if (!products.length) return null;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const displayedProducts = editedProducts.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <Box sx={{ mt: 1.5, mb: 1 }}>
      {hasUnsavedChanges && (
        <Box sx={{ 
          mb: 1, 
          p: 1, 
          bgcolor: '#fff3cd', 
          border: '1px solid #ffeeba',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography sx={{ color: '#856404', fontSize: '0.9rem' }}>
            You have unsaved changes. Please save or discard your changes.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDiscard}
              sx={{ borderColor: '#856404', color: '#856404' }}
            >
              Discard
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={handleSave}
              sx={{ bgcolor: '#856404', '&:hover': { bgcolor: '#6d5204' } }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      )}
      <Paper elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '12px', p: 2, background: '#fff', boxShadow: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Inventory2Icon sx={{ color: '#222', fontSize: 24, mr: 1 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>Selected Products</Typography>
          <Box sx={{ ml: 'auto', fontWeight: 500, fontSize: '0.9rem', color: '#222', background: '#f6f7fa', px: 1.5, py: 0.3, borderRadius: 2 }}>
            {products.length} product{products.length > 1 ? 's' : ''} selected
          </Box>
        </Box>
        {displayedProducts.map((product) => (
          <Box 
            key={product.id} 
            sx={{ 
              mb: 1.5,
              position: 'relative',
              '&:hover': {
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -2,
                  left: -2,
                  right: -2,
                  bottom: -2,
                  border: '2px solid #black',
                  borderRadius: '12px',
                  pointerEvents: 'none',
                  zIndex: 1
                }
              }
            }}
          >
            {/* Product Header */}
            <Box sx={{ 
              background: '#f8fafc',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              p: 1,
              border: '1px solid #e0e0e0',
              borderBottom: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Box component="img" 
                src="https://beefjerkyx.com/themes/custom/bjov2/images/2022/bje-logo-oval-small.png" 
                alt="Product" 
                sx={{ 
                  width: 60, 
                  height: 40, 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }} 
              />
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: '#222' }}>{product.title}</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                  {product.vendor} • <span style={{ color: '#43a047', fontWeight: 500 }}>{product.status}</span>
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                {product.tags.map((tag, index) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      background: '#e3f2fd',
                      color: '#1976d2',
                      fontSize: '0.75rem',
                      height: 24,
                      '& .MuiChip-label': { px: 1 }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Product Details Section */}
            <Box sx={{ 
              border: '1px solid #e0e0e0', 
              borderTop: 'none',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              background: '#fff', 
              p: 1.5, 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}>
              {/* Title Field */}
              <TextField 
                label="Title" 
                value={product.title} 
                size="small" 
                fullWidth 
                sx={{ background: '#fff' }} 
                InputLabelProps={{ sx: { fontSize: '0.95rem' } }} 
              />

              {/* First Row: Vendor, Status, Type */}
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: '0.95rem' }}>Vendor</InputLabel>
                  <Select
                    value={product.vendor}
                    label="Vendor"
                    sx={{ background: '#fff' }}
                  >
                    <MenuItem value="BJE Premium">BJE Premium</MenuItem>
                    <MenuItem value="Other Vendor">Other Vendor</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: '0.95rem' }}>Status</InputLabel>
                  <Select
                    value={product.status}
                    label="Status"
                    onChange={(e) => handleFieldChange(product.id, 'status', e.target.value)}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel sx={{ fontSize: '0.95rem' }}>Type</InputLabel>
                  <Select
                    value="Physical"
                    label="Type"
                    sx={{ background: '#fff' }}
                  >
                    <MenuItem value="Physical">Physical</MenuItem>
                    <MenuItem value="Digital">Digital</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Second Row: Tags */}
              <TextField 
                label="Tags" 
                value={product.tags.join(', ')} 
                size="small" 
                fullWidth 
                sx={{ background: '#fff' }} 
                InputLabelProps={{ sx: { fontSize: '0.95rem' } }} 
                onChange={(e) => handleFieldChange(product.id, 'tags', e.target.value.split(',').map(tag => tag.trim()))}
              />

              {/* Variants Section */}
              <Box sx={{ 
                background: '#f8fafc', 
                borderRadius: '8px', 
                p: 1.5,
                border: '1px solid #e0e0e0',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#222' }}>Variants</Typography>
                  {product.variants && product.variants.length > 0 && (
                    <Box sx={{ ml: 'auto', fontSize: '0.85rem', color: '#222', background: '#fff', px: 1.5, py: 0.2, borderRadius: 2, fontWeight: 500, border: '1px solid #e0e0e0' }}>
                      {product.variants.length} variant{product.variants.length > 1 ? 's' : ''}
                    </Box>
                  )}
                </Box>
                {product.variants && product.variants.length > 0 ? (
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {product.variants.map((variant, idx) => (
                      <Box key={variant.sku + idx} sx={{ 
                        flex: 1, 
                        background: '#fff', 
                        border: '1px solid #e0e0e0', 
                        borderRadius: '8px', 
                        p: 1.5, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: 0.5,
                      }}>
                        <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5 }}>
                          <TextField label="Title" value={variant.title} size="small" fullWidth InputProps={{ readOnly: true }} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5 }}>
                          <TextField label="SKU" value={variant.sku} size="small" fullWidth InputProps={{ readOnly: true }} />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5 }}>
                          <TextField 
                            label="Price" 
                            value={variant.price} 
                            size="small" 
                            fullWidth 
                            onChange={(e) => handleVariantChange(product.id, idx, 'price', e.target.value)}
                          />
                          <TextField 
                            label="Cost" 
                            value={variant.cost} 
                            size="small" 
                            fullWidth 
                            onChange={(e) => handleVariantChange(product.id, idx, 'cost', e.target.value)}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1.5, mb: 0.5 }}>
                          <TextField 
                            label="Stock" 
                            value={variant.stock} 
                            size="small" 
                            fullWidth 
                            onChange={(e) => handleVariantChange(product.id, idx, 'stock', e.target.value)}
                          />
                          <TextField 
                            label="Weight" 
                            value={variant.weight} 
                            size="small" 
                            fullWidth 
                            onChange={(e) => handleVariantChange(product.id, idx, 'weight', e.target.value)}
                          />
                          <TextField 
                            label="Grams (g)" 
                            value={variant.grams} 
                            size="small" 
                            fullWidth 
                            onChange={(e) => handleVariantChange(product.id, idx, 'grams', e.target.value)}
                          />
                        </Box>
                        <TextField label="Barcode" value={variant.barcode} size="small" fullWidth InputProps={{ readOnly: true }} />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography sx={{ color: '#888', fontSize: '0.95rem', fontStyle: 'italic', mt: 1, mb: 1, textAlign: 'center' }}>No Variant In This Product</Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1.5, gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              size="small"
              sx={{ 
                minWidth: 90,
                borderColor: '#000',
                color: '#000',
                '&:hover': {
                  borderColor: '#303030',
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              Previous
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i ? "contained" : "outlined"}
                  onClick={() => setPage(i)}
                  size="small"
                  sx={{ 
                    minWidth: 35,
                    backgroundColor: page === i ? '#000' : 'transparent',
                    color: page === i ? '#fff' : '#303030',
                    borderColor: '#000',
                    '&:hover': {
                      backgroundColor: page === i ? '#333' : '#f5f5f5',
                      borderColor: '#000',
                    }
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </Box>
            <Button
              variant="outlined"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              size="small"
              sx={{ 
                minWidth: 90,
                borderColor: '#000',
                color: '#303030',
                '&:hover': {
                  borderColor: '#000',
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              Next
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

const ProductManagement: React.FC = () => {
  // Products dropdown state
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [productStatus, setProductStatus] = useState('All Status');
  const [productVendor, setProductVendor] = useState('All Vendors');
  const [productTag, setProductTag] = useState('Filter by tags');
  const selectProductsRef = useRef<HTMLDivElement | null>(null);

  // Stores dropdown state
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [storeSearch, setStoreSearch] = useState('');
  const selectStoresRef = useRef<HTMLDivElement | null>(null);

  // Filtering logic
  const filteredProducts = DUMMY_PRODUCTS.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase());
    const matchesStatus = productStatus === 'All Status' || p.status === productStatus.toLowerCase();
    const matchesVendor = productVendor === 'All Vendors' || p.vendor === productVendor;
    const matchesTag = productTag === 'Filter by tags' || p.tags.includes(productTag);
    return matchesSearch && matchesStatus && matchesVendor && matchesTag;
  });

  const filteredStores = sampleStores.filter((s) =>
    s.name.toLowerCase().includes(storeSearch.toLowerCase())
  );

  // Product selection logic
  const handleProductToggle = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };
  const handleProductSelectAll = () => setSelectedProducts(filteredProducts.map((p) => p.id));
  const handleProductClearAll = () => setSelectedProducts([]);

  // Store selection logic
  const handleStoreToggle = (id: string) => {
    setSelectedStores((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };
  const handleStoreSelectAll = () => setSelectedStores(filteredStores.map((s) => s.id));
  const handleStoreClearAll = () => setSelectedStores([]);

  const handleDropdownClose = () => {
    setProductDropdownOpen(false);
    setStoreDropdownOpen(false);
  };

  return (
    <Layout>
      <Box sx={{ p: 2 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: '1px solid #e0e0e0',
            borderRadius: '16px',
            background: '#fff',
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#222' }}>
              Product Management
            </Typography>
          </Box>

          {/* Side by side sections */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }} id="product-filters-section">
            {/* Section 1: Select Products to Update */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 340,
                maxWidth: 700,
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                background: '#fff',
                mb: 1,
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Inventory2Icon sx={{ color: '#222', fontSize: 24 }} /> Select Products to Update
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, ml: '2px' }}>
                Select which of your products should be updated
              </Typography>
              <Box ref={selectProductsRef}>
                <InputBase
                  value={
                    selectedProducts.length === 0
                      ? 'Select Products'
                      : `${selectedProducts.length} product${selectedProducts.length > 1 ? 's' : ''} selected`
                  }
                  readOnly
                  onClick={() => setProductDropdownOpen((open) => !open)}
                  sx={{
                    width: '100%',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.6,
                    fontWeight: 500,
                    color: '#222',
                    background: '#fafbfc',
                    fontSize: '0.98rem',
                    mb: 1,
                    minHeight: 36,
                    cursor: 'pointer',
                  }}
                />
                <Popper
                  open={productDropdownOpen}
                  anchorEl={selectProductsRef.current}
                  placement="bottom-start"
                  style={{ zIndex: 1302, width: selectProductsRef.current?.offsetWidth || 340 }}
                  modifiers={[
                    { name: 'flip', enabled: false },
                    { name: 'preventOverflow', enabled: true, options: { boundary: 'clippingParents' } },
                  ]}
                >
                  <ClickAwayListener onClickAway={handleDropdownClose}>
                    <Paper
                      elevation={3}
                      sx={{
                        mt: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        maxHeight: 400,
                        overflowY: 'auto',
                        width: selectProductsRef.current?.offsetWidth || 340,
                        minWidth: 320,
                        p: 0,
                      }}
                    >
                      {/* Search and filters */}
                      <Box sx={{ p: 2, pb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <SearchIcon sx={{ color: '#888', fontSize: 20, mr: 1 }} />
                          <InputBase
                            placeholder="Search products by name"
                            value={productSearch}
                            onChange={e => setProductSearch(e.target.value)}
                            sx={{ fontSize: '1rem', width: '100%' }}
                          />
                        </Box>
                        <Stack direction="row" spacing={1.5} sx={{ mb: 1, alignItems: 'center', px: 0.5 }}>
                          <Autocomplete
                            disablePortal
                            disableClearable
                            options={FILTERS.status}
                            value={productStatus}
                            onChange={(e, newValue) => setProductStatus(newValue || 'All Status')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="All Status"
                                size="small"
                                variant="outlined"
                                sx={{
                                  minWidth: 100,
                                  background: '#f6f7fa',
                                  borderRadius: 1.5,
                                  '.MuiOutlinedInput-root': {
                                    px: 1.2,
                                    py: 0.2,
                                    fontSize: '0.98rem',
                                    height: 36,
                                  },
                                }}
                                InputProps={{ ...params.InputProps, style: { paddingRight: 32 } }}
                              />
                            )}
                            sx={{ minWidth: 120 }}
                          />
                          <Autocomplete
                            disablePortal
                            disableClearable
                            options={FILTERS.vendor}
                            value={productVendor}
                            onChange={(e, newValue) => setProductVendor(newValue || 'All Vendors')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="All Vendors"
                                size="small"
                                variant="outlined"
                                sx={{
                                  minWidth: 130,
                                  background: '#f6f7fa',
                                  borderRadius: 1.5,
                                  '.MuiOutlinedInput-root': {
                                    px: 1.2,
                                    py: 0.2,
                                    fontSize: '0.98rem',
                                    height: 36,
                                  },
                                }}
                                InputProps={{ ...params.InputProps, style: { paddingRight: 32 } }}
                              />
                            )}
                            sx={{ minWidth: 130 }}
                          />
                          <Autocomplete
                            disablePortal
                            disableClearable
                            options={FILTERS.tags}
                            value={productTag}
                            onChange={(e, newValue) => setProductTag(newValue || 'Filter by tags')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Filter by tags"
                                size="small"
                                variant="outlined"
                                sx={{
                                  minWidth: 150,
                                  background: '#f6f7fa',
                                  borderRadius: 1.5,
                                  '.MuiOutlinedInput-root': {
                                    px: 1.2,
                                    py: 0.2,
                                    fontSize: '0.98rem',
                                    height: 36,
                                  },
                                }}
                                InputProps={{ ...params.InputProps, style: { paddingRight: 32 } }}
                              />
                            )}
                            sx={{ minWidth: 150 }}
                          />
                        </Stack>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#222' }}>All Products</Typography>
                          <Box>
                            <Button size="small" variant="outlined" sx={{ mr: 1, fontSize: '0.95rem', py: 0.5, px: 1.5 }} onClick={handleProductSelectAll}>✓ Select All</Button>
                            <Button size="small" variant="outlined" color="inherit" sx={{ fontSize: '0.95rem', py: 0.5, px: 1.5 }} onClick={handleProductClearAll}>✕ Clear All</Button>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                      {/* Product list */}
                      <List dense disablePadding>
                        {filteredProducts.map((product) => (
                          <ListItemButton
                            key={product.id}
                            onClick={() => handleProductToggle(product.id)}
                            sx={{
                              px: 2,
                              py: 1.2,
                              alignItems: 'flex-start',
                              background: selectedProducts.includes(product.id) ? '#f3f7fa' : 'transparent',
                              '&:hover': { background: '#f5f7fa' },
                            }}
                          >
                            <Checkbox
                              edge="start"
                              checked={selectedProducts.includes(product.id)}
                              tabIndex={-1}
                              disableRipple
                              sx={{ p: 0.5, mr: 1, mt: 0.5 }}
                            />
                            <Box>
                              <Typography sx={{ fontWeight: 600, fontSize: '1.05rem', color: '#222' }}>{product.title}</Typography>
                              <Typography sx={{ fontSize: '0.93rem', color: '#666', mb: 0.2 }}>
                                {product.vendor} • <span style={{ color: '#43a047', fontWeight: 500 }}>{product.status}</span> • {product.tags.map((tag, i) => <span key={tag} style={{ color: '#888' }}>{tag}{i < product.tags.length - 1 ? ', ' : ''}</span>)}
                              </Typography>
                            </Box>
                          </ListItemButton>
                        ))}
                        {filteredProducts.length === 0 && (
                          <ListItem>
                            <Typography sx={{ color: '#888', fontSize: '0.98rem' }}>No products found.</Typography>
                          </ListItem>
                        )}
                      </List>
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </Box>
            </Paper>
            {/* Section 2: Update Products Across Stores */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 340,
                maxWidth: 700,
                p: 2,
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                background: '#fff',
                mb: 1,
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorefrontIcon sx={{ color: '#222', fontSize: 24 }} /> Select Products Across Stores
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, ml: '2px' }}>
                Select which of your stores should receive these product updates
              </Typography>
              <Box ref={selectStoresRef}>
                <InputBase
                  value={
                    selectedStores.length === 0
                      ? 'Select Stores'
                      : `${selectedStores.length} store${selectedStores.length > 1 ? 's' : ''} selected`
                  }
                  readOnly
                  onClick={() => setStoreDropdownOpen((open) => !open)}
                  sx={{
                    width: '100%',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.6,
                    fontWeight: 500,
                    color: '#222',
                    background: '#fafbfc',
                    fontSize: '0.98rem',
                    mb: 1,
                    minHeight: 36,
                    cursor: 'pointer',
                  }}
                />
                <Popper
                  open={storeDropdownOpen}
                  anchorEl={selectStoresRef.current}
                  placement="bottom-start"
                  style={{ zIndex: 1302, width: selectStoresRef.current?.offsetWidth || 340 }}
                  modifiers={[
                    { name: 'flip', enabled: false },
                    { name: 'preventOverflow', enabled: true, options: { boundary: 'clippingParents' } },
                  ]}
                >
                  <ClickAwayListener onClickAway={handleDropdownClose}>
                    <Paper
                      elevation={3}
                      sx={{
                        mt: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        maxHeight: 400,
                        overflowY: 'auto',
                        width: selectStoresRef.current?.offsetWidth || 340,
                        minWidth: 320,
                        p: 0,
                      }}
                    >
                      {/* Search and select all/clear all */}
                      <Box sx={{ p: 2, pb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <SearchIcon sx={{ color: '#888', fontSize: 20, mr: 1 }} />
                          <InputBase
                            placeholder="Search stores by name"
                            value={storeSearch}
                            onChange={e => setStoreSearch(e.target.value)}
                            sx={{ fontSize: '1rem', width: '100%' }}
                          />
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#222' }}>All Stores</Typography>
                          <Box>
                            <Button size="small" variant="outlined" sx={{ mr: 1, fontSize: '0.95rem', py: 0.5, px: 1.5 }} onClick={handleStoreSelectAll}>✓ Select All</Button>
                            <Button size="small" variant="outlined" color="inherit" sx={{ fontSize: '0.95rem', py: 0.5, px: 1.5 }} onClick={handleStoreClearAll}>✕ Clear All</Button>
                          </Box>
                        </Box>
                      </Box>
                      <Divider />
                      {/* Store list */}
                      <List dense disablePadding>
                        {filteredStores.map((store) => (
                          <ListItemButton
                            key={store.id}
                            onClick={() => handleStoreToggle(store.id)}
                            sx={{
                              px: 2,
                              py: 1.2,
                              alignItems: 'flex-start',
                              background: selectedStores.includes(store.id) ? '#f3f7fa' : 'transparent',
                              '&:hover': { background: '#f5f7fa' },
                            }}
                          >
                            <Checkbox
                              edge="start"
                              checked={selectedStores.includes(store.id)}
                              tabIndex={-1}
                              disableRipple
                              sx={{ p: 0.5, mr: 1, mt: 0.5 }}
                            />
                            <Box>
                              <Typography sx={{ fontWeight: 600, fontSize: '1.05rem', color: '#222' }}>{store.name}</Typography>
                            </Box>
                          </ListItemButton>
                        ))}
                        {filteredStores.length === 0 && (
                          <ListItem>
                            <Typography sx={{ color: '#888', fontSize: '0.98rem' }}>No stores found.</Typography>
                          </ListItem>
                        )}
                      </List>
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </Box>
            </Paper>
          </Box>
          <SelectedProductsSection products={DUMMY_PRODUCTS.filter(p => selectedProducts.includes(p.id))} />
        </Paper>
      </Box>
    </Layout>
  );
};

export default ProductManagement;