import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CustomThemeProvider } from './context/ThemeContext';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import ProductManagement from './pages/ProductManagement';

const App: React.FC = () => {
  return (
    <CustomThemeProvider>
      <Router>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Orders />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
};

export default App;
