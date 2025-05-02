// import React from 'react';
// import { Box, Grid, Paper, Typography } from '@mui/material';
// import Layout from '../components/layout/Layout';

// const Dashboard: React.FC = () => {
//   return (
//     <Layout>
//       <Box sx={{ flexGrow: 1, p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Dashboard
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3} component={'div' as any}>
//             <Paper 
//               sx={{ 
//                 p: 3, 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 height: 160,
//                 backgroundColor: 'background.paper'
//               }}
//             >
//               <Typography component="h2" variant="h6" gutterBottom>
//                 Total Orders
//               </Typography>
//               <Typography component="p" variant="h4">
//                 24
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3} component={'div' as any}>
//             <Paper 
//               sx={{ 
//                 p: 3, 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 height: 160,
//                 backgroundColor: 'success.light',
//                 color: 'success.contrastText'
//               }}
//             >
//               <Typography component="h2" variant="h6" gutterBottom>
//                 Total Products
//               </Typography>
//               <Typography component="p" variant="h4">
//                 150
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3} component={'div' as any}>
//             <Paper 
//               sx={{ 
//                 p: 3, 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 height: 160,
//                 backgroundColor: 'warning.light',
//                 color: 'warning.contrastText'
//               }}
//             >
//               <Typography component="h2" variant="h6" gutterBottom>
//                 Total Sales
//               </Typography>
//               <Typography component="p" variant="h4">
//                 $12,345
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3} component={'div' as any}>
//             <Paper 
//               sx={{ 
//                 p: 3, 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 height: 160,
//                 backgroundColor: 'secondary.light',
//                 color: 'secondary.contrastText'
//               }}
//             >
//               <Typography component="h2" variant="h6" gutterBottom>
//                 Active Users
//               </Typography>
//               <Typography component="p" variant="h4">
//                 5
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Layout>
//   );
// };

// export default Dashboard; 