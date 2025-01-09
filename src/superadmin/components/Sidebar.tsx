import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Groups as GroupsIcon,
  PersonAdd as PersonAddIcon,
  Article as ArticleIcon,
  AddCircle as AddCircleIcon,
  PendingActions as PendingActionsIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowRight as ArrowRightIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [openUser, setOpenUser] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const location = useLocation();
  const token = useSelector((state: any) => state.auth.token);

  const handleUserClick = () => setOpenUser(!openUser);
  const handleBlogClick = () => setOpenBlog(!openBlog);

  return (
    <Box
      sx={{
        height: '100%',
        backgroundColor: '#f4f4f4',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease-in-out',
      }}
    >
      {/* Sidebar Header */}
      <Box
        sx={{
          padding: 2,
          fontWeight: 'bold',
          fontSize: 18,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Super Admin
      </Box>

      {/* Sidebar Navigation */}
      <List>
        {/* Dashboard */}
        <ListItemButton
          component={Link}
          to="/admin"
          selected={location.pathname === '/admin'}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* User Management */}
        <ListItemButton onClick={handleUserClick}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="User Management" />
          {openUser ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </ListItemButton>
        <Collapse in={openUser} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton
              component={Link}
              to="/superadmin/users"
              selected={location.pathname === '/superadmin/users'}
            >
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="All Users" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/superadmin/add-user"
              selected={location.pathname === '/superadmin/add-user'}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItemButton>
          </Box>
        </Collapse>

        {/* Blog Management */}
        <ListItemButton onClick={handleBlogClick}>
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Blog Management" />
          {openBlog ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </ListItemButton>
        <Collapse in={openBlog} timeout="auto" unmountOnExit>
          <Box sx={{ pl: 4 }}>
            <ListItemButton
              component={Link}
              to="/admin/blogs"
              selected={location.pathname === '/admin/blogs'}
            >
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="All Blogs" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/admin/add-blog"
              selected={location.pathname === '/admin/add-blog'}
            >
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Blog" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/admin/pending-blogs"
              selected={location.pathname === '/admin/pending-blogs'}
            >
              <ListItemIcon>
                <PendingActionsIcon />
              </ListItemIcon>
              <ListItemText primary="Pending Blogs" />
            </ListItemButton>
          </Box>
        </Collapse>
      </List>

      {/* Menu Icon for Mobile */}
      <IconButton
        sx={{
          display: 'block',
          position: 'absolute',
          top: 16,
          left: 16,
        }}
        onClick={() => { }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Sidebar;
