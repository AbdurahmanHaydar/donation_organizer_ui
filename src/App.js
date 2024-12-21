import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Mosque as MosqueIcon,
  Favorite as FavoriteIcon,
  MonetizationOn as ZakatIcon,
  CalendarMonth as CalendarIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  useNavigate,
  useLocation,
  Outlet,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import ZakatCalculator from './components/ZakatCalculator';
import Sadaqah from './components/Sadaqah';
import Ramadan from './components/Ramadan';

// Create a custom theme with Islamic-inspired colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1F4B3F', // Deep green
      light: '#2E7D32',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#D4AF37', // Gold
      light: '#F4C460',
      dark: '#C5A028',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
});

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Zakat Calculator', icon: <ZakatIcon />, path: '/zakat' },
  { text: 'Sadaqah', icon: <FavoriteIcon />, path: '/sadaqah' },
  { text: 'Ramadan', icon: <CalendarIcon />, path: '/ramadan' },
  { text: 'Donation History', icon: <HistoryIcon />, path: '/history' },
];

const donationCategories = [
  {
    title: 'Zakat',
    icon: <ZakatIcon />,
    description: 'Calculate and track your annual Zakat',
    amount: 0,
    path: '/zakat',
  },
  {
    title: 'Sadaqah',
    icon: <FavoriteIcon />,
    description: 'Voluntary charity for various causes',
    amount: 0,
    path: '/sadaqah',
  },
  {
    title: 'Ramadan',
    icon: <MosqueIcon />,
    description: 'Special Ramadan donations and Zakat al-Fitr',
    amount: 0,
    path: '/ramadan',
  },
];

function DashboardContent() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {donationCategories.map((category) => (
          <Link 
            key={category.title} 
            to={category.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Box
              sx={{
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-4px)' },
                transition: 'transform 0.3s ease',
              }}
            >
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', mr: 2 }}>
                  {React.cloneElement(category.icon, { sx: { fontSize: 40 } })}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{category.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>
                <Typography variant="h5" color="primary.main">
                  R {category.amount.toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </Container>
  );
}

function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              if (isMobile) handleDrawerToggle();
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <MosqueIcon sx={{ mr: 2 }} />
          <Typography variant="h6" noWrap component="div">
            Islamic Donation Organizer
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Box
        component="nav"
        sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              width: 250,
              boxSizing: 'border-box',
              top: ['56px', '64px'],
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${250}px)` },
          mt: ['56px', '64px'],
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardContent />} />
        <Route path="/zakat" element={<ZakatCalculator />} />
        <Route path="/sadaqah" element={<Sadaqah />} />
        <Route path="/ramadan" element={<Ramadan />} />
        <Route path="/history" element={
          <Container>
            <Typography variant="h4" sx={{ mt: 4 }}>
              Donation History
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Coming soon...
            </Typography>
          </Container>
        } />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
