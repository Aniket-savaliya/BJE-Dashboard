import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { ReactNode } from 'react';

interface SalesStatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  color?: string; // Optional color for icon background
}

export default function SalesStatsCard({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'primary.main' // Default color
}: SalesStatsCardProps) {
  return (
    <Card elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
      <Avatar sx={{ bgcolor: color, width: 56, height: 56, mr: 2 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography color="text.secondary" variant="body2">
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {change}
        </Typography>
      </Box>
    </Card>
  );
} 