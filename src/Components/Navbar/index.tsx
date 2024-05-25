import { Menu as MenuIcon } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PAGES = [
  {
    label: "Home",
    route: "/",
  },
  { label: "Tier List", route: "/heroes" },
  { label: "Preparations", route: "/preparations" },
  { label: "Patch Notes", route: "/patch_notes" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (to: string) => {
    if (to) {
      navigate(to);
      setAnchorElNav(null);
    } else {
      setAnchorElNav(null);
    }
  };

  console.log(location);

  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleOpenNavMenu}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {PAGES.map((page: any) => (
            <MenuItem
              key={page.label}
              onClick={() => handleCloseNavMenu(page.route)}
            >
              <Typography
                textAlign="center"
                style={{
                  color:
                    location.pathname === page.route ? "#C7A600" : "inherit",
                }}
              >
                {page.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {PAGES.map((page: any) => (
            <Link
              style={{
                textDecoration: "none",
                padding: "6px 16px",
                margin: "0px 8px",
                border: "1px solid white",
                boxShadow:
                  " 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                color: "white",
                borderRadius: 6,
                background:
                  location.pathname === page.route ? "#C7A600" : "inherit",
              }}
              key={page.label}
              to={page.route}
            >
              {page.label}
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
