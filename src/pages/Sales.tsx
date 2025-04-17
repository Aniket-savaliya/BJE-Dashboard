// import { 
//   Box, 
//   Typography, 
//   // Removed Paper import as it's no longer used directly here
// } from '@mui/material';
// import { 
//   AttachMoney, 
//   ShoppingCart, 
//   ReceiptLong, 
//   TrendingUp
// } from '@mui/icons-material';
// // Import the new SalesStatsCard
// import SalesStatsCard from '../components/sales/SalesStatsCard'; 
// // Removed StatsCard import

// // Sample Sales Metrics Data - Added colors
// const salesStats = [
//   { title: 'Total Sales', value: '$57,463.92', change: '+15.5% from last month', icon: <AttachMoney />, color: 'success.main' },
//   { title: 'Avg. Order Value', value: '$125.45', change: '+3.2% from last month', icon: <ShoppingCart />, color: 'warning.main' },
//   { title: 'Total Orders', value: '458', change: '+12.1% from last month', icon: <ReceiptLong />, color: 'info.main' },
//   { title: 'Conversion Rate', value: '3.8%', change: '+0.5% from last month', icon: <TrendingUp />, color: 'secondary.main' },
// ];

// // Removed topProducts data array
// // Removed recentSales data array

// export default function Sales() {
//   return (
//     <Box sx={{ flexGrow: 1, p: 3 }}>
//       <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
//         Sales Overview
//       </Typography>

//       {/* Sales Stats Cards using the new component */}
//       <Box sx={{ 
//         display: 'grid',
//         gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
//         gap: 3,
//         mb: 4 // Keep margin for spacing below cards
//       }}>
//         {salesStats.map((stat) => (
//           // Use SalesStatsCard here
//           <SalesStatsCard 
//             key={stat.title} 
//             title={stat.title} 
//             value={stat.value} 
//             change={stat.change}
//             icon={stat.icon} 
//             color={stat.color} // Pass the color
//           />
//         ))}
//       </Box>

//       {/* Removed Top Selling Products Table Section */}
//       {/* Removed Recent Sales Table Section */}

//     </Box>
//   );
// } 