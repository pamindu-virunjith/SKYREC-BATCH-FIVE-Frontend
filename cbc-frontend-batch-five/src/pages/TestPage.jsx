// import React, { useState } from 'react'

// function TestPage() {

//     const [count,setCount] = useState(0)
//     const [status,setstatus] = useState("Passed")

//     function plus(){
//         setCount(count+1)
//     }
    
//     function minus(){
//         setCount(count -1)
//     }

//   return (
//     <>
//     <div className='w-full h-screen bg-blue-100'>
//         <div className='flex justify-center items-center h-[300px]'> 
//             <button onClick={plus} className='text-red-300 text-[100px] border-4 w-[100px] mx-[20px] '>+</button>
//             <h1 className='text-red-300 text-[100px]    text-center   mx-[20px]'>{count}</h1>
//             <button  onClick={minus} className='text-red-300 text-[100px] border-4 w-[100px] text-center   mx-[20px] cursor-pointer'>-</button>
//         </div>
//         <div className='w-full text-center text-[40px]'>
//             <span>
//                 {status}
//             </span>
//             <div className='flex flex-row justify-center'>
//                 <button className='text-cyan-600 p-[5px] border-3 cursor-pointer bg-white m-[5px] w-[150px]' onClick={()=>{
//                     setstatus("Passed")
//                 }}>Passed</button>
//                 <button className='text-cyan-600 p-[5px] border-3 cursor-pointer bg-white  m-[5px] w-[150px]' onClick={()=>{
//                     setstatus("Failed")
//                 }}>Failed</button>
//             </div>
//         </div>
//     </div>
    
//     </>
//   )
// }

// export default TestPage











// function TestPage() {
//   return (
//     <div className='md:bg-accent bg-seondary w-full h-screen'>Hii my name is pamindu</div>
//   )
// }

// export default TestPage


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

// export default function AccountMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   return (
//     <React.Fragment>
//       <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//         <Typography sx={{ minWidth: 100 }}>Contact</Typography>
//         <Typography sx={{ minWidth: 100 }}>Profile</Typography>
//         <Tooltip title="Account settings">
//           <IconButton
//             onClick={handleClick}
//             size="small"
//             sx={{ ml: 2 }}
//             aria-controls={open ? 'account-menu' : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? 'true' : undefined}
//           >
//             <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
//           </IconButton>
//         </Tooltip>
//       </Box>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         slotProps={{
//           paper: {
//             elevation: 0,
//             sx: {
//               overflow: 'visible',
//               filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
//               mt: 1.5,
//               '& .MuiAvatar-root': {
//                 width: 32,
//                 height: 32,
//                 ml: -0.5,
//                 mr: 1,
//               },
//               '&::before': {
//                 content: '""',
//                 display: 'block',
//                 position: 'absolute',
//                 top: 0,
//                 right: 14,
//                 width: 10,
//                 height: 10,
//                 bgcolor: 'background.paper',
//                 transform: 'translateY(-50%) rotate(45deg)',
//                 zIndex: 0,
//               },
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem onClick={handleClose}>
//           <Avatar /> Profile
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Avatar /> My account
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <PersonAdd fontSize="small" />
//           </ListItemIcon>
//           Add another account
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Settings fontSize="small" />
//           </ListItemIcon>
//           Settings
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <ListItemIcon>
//             <Logout fontSize="small" />
//           </ListItemIcon>
//           Logout
//         </MenuItem>
//       </Menu>
//     </React.Fragment>
//   );
// }
