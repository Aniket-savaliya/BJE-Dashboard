// import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
// import { Work, Person, Assignment } from '@mui/icons-material';

// const activities = [
//   {
//     id: 1,
//     type: 'project',
//     title: 'New Project Created',
//     description: 'Project X has been created by John Doe',
//     time: '2 hours ago',
//   },
//   {
//     id: 2,
//     type: 'user',
//     title: 'New User Registered',
//     description: 'Jane Smith has joined the platform',
//     time: '4 hours ago',
//   },
//   {
//     id: 3,
//     type: 'task',
//     title: 'Task Completed',
//     description: 'Task #123 has been completed by Mike Johnson',
//     time: '6 hours ago',
//   },
// ];

// const getIcon = (type: string) => {
//   switch (type) {
//     case 'project':
//       return <Work />;
//     case 'user':
//       return <Person />;
//     case 'task':
//       return <Assignment />;
//     default:
//       return <Work />;
//   }
// };

// export default function RecentActivity() {
//   return (
//     <List sx={{ width: '100%' }}>
//       {activities.map((activity) => (
//         <ListItem key={activity.id} alignItems="flex-start">
//           <ListItemAvatar>
//             <Avatar sx={{ bgcolor: 'primary.main' }}>
//               {getIcon(activity.type)}
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText
//             primary={activity.title}
//             secondary={
//               <>
//                 <Typography
//                   sx={{ display: 'inline' }}
//                   component="span"
//                   variant="body2"
//                   color="text.primary"
//                 >
//                   {activity.description}
//                 </Typography>
//                 {` — ${activity.time}`}
//               </>
//             }
//           />
//         </ListItem>
//       ))}
//     </List>
//   );
// } 