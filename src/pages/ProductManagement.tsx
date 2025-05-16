import React, { useRef, useState } from 'react';
import {
  Box, Paper, Typography, InputBase, Popper, List, ListItem, Checkbox, ListItemText, ClickAwayListener, IconButton, Button, Stack, Divider, ListItemButton, Chip, TextField, MenuItem
} from '@mui/material';
import Layout from '../components/layout/Layout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import SearchIcon from '@mui/icons-material/Search';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'Classic Beef Jerky',
    vendor: 'BJE Premium',
    status: 'active',
    tags: ['Beef', 'Classic', 'Traditional'],
  },
  {
    id: 'p2',
    title: 'Spicy Teriyaki Beef Jerky',
    vendor: 'BJE Premium',
    status: 'active',
    tags: ['Beef', 'Spicy', 'Teriyaki'],
  },
  {
    id: 'p3',
    title: 'Gift Box - Jerky Sampler',
    vendor: 'BJE Premium',
    status: 'active',
    tags: ['Beef', 'Gift Box', 'Sampler'],
  },
  {
    id: 'p4',
    title: 'Honey Garlic Beef Jerky',
    vendor: 'BJE Premium',
    status: 'active',
    tags: ['Beef', 'Honey Garlic', 'Sweet'],
  },
  {
    id: 'p5',
    title: 'Peppered Beef Jerky',
    vendor: 'BJE Premium',
    status: 'active',
    tags: ['Beef', 'Peppered', 'Spicy'],
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
      <Box sx={{ p: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid #e0e0e0',
            borderRadius: '16px',
            background: '#fff',
            maxWidth: 1400,
            mx: 'auto',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#222', mb: 3 }}>
            Product Management
          </Typography>

          {/* Side by side sections */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {/* Section 1: Select Products to Update */}
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                minWidth: 340,
                maxWidth: 700,
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                background: '#fff',
                mb: 2,
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Inventory2Icon sx={{ color: '#222', fontSize: 28 }} /> Select Products to Update
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: '2px' }}>
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
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <TextField
                            select
                            size="small"
                            value={productStatus}
                            onChange={e => setProductStatus(e.target.value)}
                            sx={{ minWidth: 120, background: '#f6f7fa', borderRadius: 1 }}
                          >
                            {FILTERS.status.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                          </TextField>
                          <TextField
                            select
                            size="small"
                            value={productVendor}
                            onChange={e => setProductVendor(e.target.value)}
                            sx={{ minWidth: 120, background: '#f6f7fa', borderRadius: 1 }}
                          >
                            {FILTERS.vendor.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                          </TextField>
                          <TextField
                            select
                            size="small"
                            value={productTag}
                            onChange={e => setProductTag(e.target.value)}
                            sx={{ minWidth: 140, background: '#f6f7fa', borderRadius: 1 }}
                          >
                            {FILTERS.tags.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                          </TextField>
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
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                background: '#fff',
                mb: 2,
                position: 'relative',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StorefrontIcon sx={{ color: '#222', fontSize: 28 }} /> Update Products Across Stores
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2, ml: '2px' }}>
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
        </Paper>
      </Box>
    </Layout>
  );
};

export default ProductManagement; 