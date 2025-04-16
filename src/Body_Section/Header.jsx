import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { CardMedia, Divider } from '@mui/material';
import logo from '../assets/Screenshot (16).png'
import { useNavigate } from 'react-router-dom';
import { AlignJustify, BookUser, HandPlatter, House, PackagePlus, PackageSearch, ShoppingBasket } from 'lucide-react';

const pages = [
    { title: 'Home', link: "/", tip: 'Home', icon: <House /> },
    { title: 'Products', link: '/ProductsPage', tip: 'Products', icon: <ShoppingBasket /> },
    { title: 'Services', link: '#', tip: 'Services', icon: <HandPlatter /> },
    { title: 'About', link: "/about", tip: 'About', icon: <PackageSearch /> },
    { title: 'Contact', link: '#', tip: 'Contact', icon: <BookUser /> }
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.4)', // White with 40% opacity
            backdropFilter: 'blur(6px)', // Optional: adds glass morphism effect
            boxShadow: 'none', // Removes shadow for cleaner look
            color: 'black', // Sets text color to black
            top: 0
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CardMedia component={'img'} image={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height: 40, width: 40, borderRadius: 50, }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                            ml: 2,
                            ':hover': { color: 'brown' }
                        }}
                    >
                        DevStore
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <AlignJustify />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={() => navigate(page.link)}>
                                    <Typography sx={{ textAlign: 'center', color: 'black', bgcolor: 'white' }}>{page.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <CardMedia component={'img'} image={logo} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, height: { xs: 30, lg: 40, sm: 40, md: 40 }, width: { xs: 30, lg: 40, sm: 40, md: 40 }, borderRadius: 50, ml: { xs: 10 } }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 3,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: { xs: '.2rem', lg: '.3rem', sm: '.3rem', md: '.3rem' },
                            color: 'black',
                            textDecoration: 'none',
                            ':hover': { color: 'brown' }
                        }}
                    >
                        DevStore
                    </Typography>
                    <Divider orientation='vertical' sx={{ display: { xs: 'none', md: 'flex' }, bgcolor: 'black', py: 2 }} />
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2, gap: 2 }}>
                        {pages.map((page, index) => (
                            <Tooltip title={page?.tip}>
                                {/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} > */}
                                {/* <span>{page?.icon}</span> */}
                                <Button
                                    key={index}
                                    onClick={handleCloseNavMenu}
                                    href={page.link}
                                    startIcon={page?.icon}
                                    sx={{ my: 2, color: 'black', display: 'flex', fontWeight: 700, ':hover': { color: 'brown' } }}
                                >
                                    {page.title}
                                </Button>
                                {/* </Box> */}
                            </Tooltip>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0, mr: { xs: 0, md: 8 } }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Tooltip title="Add Cart" sx={{ mr: 2 }}>
                                <IconButton onClick={() => navigate('/addCart')}>
                                    <PackagePlus />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Charipalli Thirumalesh" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
