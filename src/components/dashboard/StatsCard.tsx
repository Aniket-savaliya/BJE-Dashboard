// import { Card, CardContent, Typography, Box } from '@mui/material';
// import { ReactNode } from 'react';

// interface StatsCardProps {
//   title: string;
//   value: string;
//   change: string;
//   icon: ReactNode;
// }

// export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
//   return (
//     <Card>
//       <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//           <Typography color="textSecondary" gutterBottom>
//             {title}
//           </Typography>
//           {icon}
//         </Box>
//         <Box>
//           <Typography variant="h5" component="div" sx={{ mb: 1 }}>
//             {value}
//           </Typography>
//           <Typography variant="body2" color="textSecondary">
//             {change}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// } 