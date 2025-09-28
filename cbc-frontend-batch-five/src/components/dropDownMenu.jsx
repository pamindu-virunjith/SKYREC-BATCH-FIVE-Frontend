import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export default function AccountMenu({user}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  //check user role equal to admin

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
    handleClose();
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1, mr: 3 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 50, height: 50 }} src={user?.img}>
            {user?.firstName?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Box>
      {
        //if user not loged in show login button
        !user ? (
          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
            <MenuItem sx={{ color: "#866ff7", fontWeight: "bold",padding: "12px 50px" }} onClick={() => navigate("/login")}>Login</MenuItem>
          </Menu>
        ) : (
            <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              padding: "10px 30px",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <img src={user?.img} alt="User" className="w-[80px] h-[80px] object-cover rounded-full mx-auto mt-3" />
        <h1 className="px-3 text-lg font-bold text-center w-full text-accent">
          {user?.firstName} ({user?.role})
        </h1>
        <h2 className="px-3 text-sm text-center w-full text-gray-500 mb-3">
            {user?.email}
        </h2>
        
        <Divider />
          <MenuItem sx={user.role === "Customer" ? {display: "none"} : { color: "#866ff7", fontWeight: "bold" }} onClick={()=>{navigate(user?.role === "admin" ? "/admin" : "/home")}}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {user?.role === "admin" ? "Admin Panel" : "Home Page"}
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: "red",}}>
          <ListItemIcon sx={{ color: "red" }}>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
        )
      }
    </React.Fragment>
  );
}
