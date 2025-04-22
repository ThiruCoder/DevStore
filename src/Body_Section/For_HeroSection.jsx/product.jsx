import React, { useState } from 'react';
import { Box, Container, Typography, Button, useMediaQuery, IconButton, MenuItem, Toolbar, AppBar } from '@mui/material';
import { motion } from 'framer-motion';
import { Phone, ShoppingBag, Menu, MenuIcon, User, ShoppingCart, Music, Volume2 } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const ProductShowcase = ({ card }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // Removed unused isTablet variable
    const navigate = useNavigate()

    return (
        <>
            {card?.map((item, index) => {
                return (
                    <Box
                        sx={{
                            minHeight: '100vh',
                            background: 'linear-gradient(135deg, #0d9488 0%, #155e75 50%, #0f172a 100%)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        key={index}
                    >
                        {/* Background wave shape */}
                        <Box
                            component="div"
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '20%',
                                background: '#fff',
                                borderTopLeftRadius: '50% 50px',
                                borderTopRightRadius: '50% 50px',
                                zIndex: 1,
                            }}
                        />

                        {/* Decorative patterns */}
                        {/* {item?.colors?.map((color, index) => ( */}
                        <>
                            <Box sx={{ position: 'absolute', top: '15%', right: '20%', opacity: 0.2 }}>
                                <Typography sx={{ color: '#fff', fontSize: '4rem' }}>
                                    {item?.colors[0]} <br />{item?.colors[1]}
                                </Typography>
                            </Box>

                            <Box sx={{ position: 'absolute', bottom: '30%', left: '50%', opacity: 0.2 }}>
                                <Typography sx={{ color: '#fff', fontSize: '4rem' }}>
                                    {item?.colors[3]} <br />{item?.colors[4]}
                                </Typography>
                            </Box>

                        </>
                        {/* ))} */}
                        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                            <Navbar />

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    py: { xs: 4, md: 6 },
                                    mt: { xs: 2, md: 4 },
                                    mb: { xs: 10, md: 15 },
                                }}
                            >
                                {/* Product Image */}
                                <Box sx={{
                                    width: { xs: '100%', md: '40%' },
                                    position: 'relative',
                                    order: { xs: 2, md: 1 }
                                }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <ProductImage images={item?.images} />
                                    </motion.div>

                                    <Box sx={{ position: 'absolute', top: -40, right: isMobile ? '5%' : '20%' }}>
                                        <DiscountBadge discount={item?.discount} />
                                    </Box>
                                </Box>

                                {/* Product Text */}
                                <Box sx={{
                                    width: { xs: '100%', md: '55%' },
                                    textAlign: { xs: 'center', md: 'right' },
                                    order: { xs: 1, md: 2 },
                                    mb: { xs: 6, md: 0 }
                                }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                    >
                                        <Typography
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                color: '#fff',
                                                fontStyle: 'italic',
                                                fontFamily: '"Playfair Display", serif',
                                                mb: 1
                                            }}
                                        >
                                            Best Quality
                                        </Typography>

                                        <Typography
                                            variant="h1"
                                            component="h1"
                                            sx={{
                                                color: '#fff',
                                                fontSize: { xs: '3.5rem', sm: '4.5rem', md: '6rem' },
                                                fontWeight: 700,
                                                letterSpacing: '-0.02em',
                                                lineHeight: 1.1,
                                                mb: 3
                                            }}
                                        >
                                            {item?.name}
                                        </Typography>
                                    </motion.div>
                                </Box>
                            </Box>

                            {/* Bottom Bar */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    position: 'relative',
                                    zIndex: 3,
                                    py: { xs: 3, md: 4 },
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    gap: { xs: 2, sm: 0 }
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                borderRadius: '50%',
                                                width: 48,
                                                height: 48,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mr: 2
                                            }}
                                        >
                                            <Phone size={24} color="#fff" />
                                        </Box>
                                        <Box>
                                            <Typography variant="body2" sx={{ color: '#64748b' }}>
                                                Contact Info
                                            </Typography>
                                            <Typography variant="h6" sx={{ color: '#334155', fontWeight: 600 }}>
                                                0000 000 000
                                            </Typography>
                                        </Box>
                                    </Box>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        startIcon={<ShoppingBag />}
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            backgroundColor: '#334155',
                                            '&:hover': {
                                                backgroundColor: '#0f172a',
                                                transform: 'translateY(-3px)'
                                            },
                                            transition: 'all 0.3s ease'
                                        }}
                                        onClick={() => navigate('/Products/' + item?._id)}
                                    >
                                        SHOP NOW
                                    </Button>
                                </motion.div>
                            </Box>
                        </Container>
                    </Box>
                );
            }).slice(0, 1)}
        </>
    );
};

export default ProductShowcase;


const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navItems = [
        { icon: <User size={24} />, label: 'Account' },
        { icon: <ShoppingCart size={24} />, label: 'Cart' },
        { icon: <Music size={24} />, label: 'Products' }
    ];

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'transparent',
                pt: 2
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Music size={32} color="#fff" />
                        <Box
                            component="span"
                            sx={{
                                color: '#fff',
                                ml: 1,
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                letterSpacing: '0.02em'
                            }}
                        >
                            DevStore
                        </Box>
                    </Box>
                </motion.div>

                {isMobile ? (
                    <Box>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                            sx={{ color: '#fff' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                elevation: 3,
                                sx: {
                                    mt: 1.5,
                                    borderRadius: 2,
                                    minWidth: 180
                                }
                            }}
                        >
                            {navItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={handleMenuClose}
                                    sx={{
                                        py: 1.5,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1.5
                                    }}
                                >
                                    {item.icon}
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                            >
                                <IconButton
                                    sx={{
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        color: '#fff',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                        },
                                        width: 44,
                                        height: 44
                                    }}
                                    aria-label={item.label}
                                >
                                    {item.icon}
                                </IconButton>
                            </motion.div>
                        ))}
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};


const ProductImage = ({ images }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <motion.div
                animate={{
                    y: [0, -15, 0],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                }}
                style={{ display: 'inline-block' }}
            >
                <Box
                    component="img"
                    src={images[0]}
                    alt="Wireless Speaker"
                    sx={{
                        width: { xs: 200, sm: 250, md: 300 },
                        height: 'auto',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0px 25px 25px rgba(0, 0, 0, 0.2))',
                        borderRadius: '8px',
                        backgroundColor: '#1f1f1f',
                        p: 2
                    }}
                />
            </motion.div>
        </Box>
    );
};

const DiscountBadge = ({ discount }) => {
    const val = discount ? discount % 100 : 0; // Default to 0 if discount is not provided
    return (
        <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.5
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    py: 1,
                    px: 2,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    transform: 'rotate(-5deg)'
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#f97316',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Volume2 size={18} color="#fff" />
                </Box>

                <Box>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            fontWeight: 700,
                            color: '#f97316',
                            fontSize: { xs: '1rem', md: '1.25rem' },
                            display: 'block',
                            lineHeight: 1.2
                        }}
                    >
                        {val.toFixed(0)} %
                    </Typography>
                    <Typography
                        variant="body2"
                        component="span"
                        sx={{
                            fontWeight: 600,
                            color: '#64748b',
                            fontSize: { xs: '0.7rem', md: '0.8rem' },
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase'
                        }}
                    >
                        DISCOUNT
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
};
