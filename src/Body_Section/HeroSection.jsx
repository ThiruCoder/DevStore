import { Box, Button, Card, CardMedia, Container, Grid, Icon, IconButton, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import Catagories from './For_HeroSection.jsx/Catagory';
import Products from './For_HeroSection.jsx/Products';
import logo from '../assets/photo-1607082352121-fa243f3dde32(1).jpeg';
import { BaggageClaim, MessagesSquare, ShieldCheck, Truck } from 'lucide-react';
import gif from '../assets/Outer Space GIF by BBC.gif'

const features = [
    {
        icon: <Truck fontSize="medium" color="black" />,
        title: "Fast Shipping",
        description: "Free shipping on orders over $50"
    },
    {
        icon: <ShieldCheck fontSize="medium" color="black" />,
        title: "Secure Payments",
        description: "Safe & encrypted checkout"
    },
    {
        icon: <BaggageClaim fontSize="medium" color="black" />,
        title: "Easy Returns",
        description: "30-day money back guarantee"
    },
    {
        icon: <MessagesSquare fontSize="medium" color="black" />,
        title: "24/7 Support",
        description: "Customer service available 24/7"
    }
];

const HeroSection = ({ products }) => {
    const theme = useTheme();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box component="section" sx={{ position: 'relative', width: '100%' }}>
            <Box
                sx={{
                    position: 'relative',
                    height: '80vh',
                    maxHeight: '700px',
                    width: '100%',
                    overflow: 'hidden',

                }}
            >
                {/* Background Image */}
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <CardMedia
                        component="img"
                        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero"
                        sx={{ objectFit: 'cover', height: '100%', backgroundImage: 'linear-gradient(to top, rgba(0, 10, 0, 4.6), transparent)' }}
                    />
                </Box>

                {/* Gradient Overlay */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to right, ${theme.palette.common.black}70, ${theme.palette.common.black}30)`,
                    }}
                />

                {/* Content */}
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: { xs: 3, sm: 5 },
                    }}
                    className="container"
                >
                    <Box
                        component={motion.div}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        sx={{ maxWidth: 'xl' }}
                    >
                        <Typography
                            variant="h1"
                            component={motion.h1}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            sx={{
                                color: 'common.white',
                                fontWeight: 700,
                                fontSize: {
                                    xs: '2.5rem',
                                    sm: '3rem',
                                    md: '3.75rem',
                                },
                                mb: 2,
                                backgroundImage: `url(${gif})`,
                                WebkitTextFillColor: 'transparent',
                                WebkitBackgroundClip: 'text'
                            }}
                        >
                            Quality Products for Every Lifestyle
                        </Typography>

                        <Typography
                            variant="h5"
                            component={motion.p}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                mb: 4,
                                fontSize: {
                                    xs: '1.125rem',
                                    sm: '1.25rem',
                                },
                            }}
                        >
                            Shop our curated collection of premium products at affordable prices.
                        </Typography>

                        <Box
                            component={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', pt: 2 }}
                        >
                            <Button
                                component={Link}
                                href="/products"
                                variant="contained"
                                size="large"
                                sx={{
                                    color: 'common.white',
                                    px: 4,
                                    py: 1.5,
                                    ':hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        color: 'common.white',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        transition: '0.3s',
                                        transform: 'translateY(-2px)',
                                        fontWeight: 700
                                    }
                                }}
                            >
                                Shop Now
                            </Button>
                            <Button
                                component={Link}
                                href="#"
                                variant="outlined"
                                size="large"
                                hrefLang='en'
                                target="_blank"
                                sx={{
                                    color: 'common.white',
                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    px: 4,
                                    py: 1.5,
                                    fontWeight: 700,
                                    '&:hover': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        fontWeight: 700,
                                        color: 'lightblue',
                                    },
                                }}
                            >
                                Browse Categories  &rarr;
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Catagories />
            <Products products={products} />

            {/* Special Offers */}
            <Container sx={{ mt: 10 }}>
                <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', p: 2 }}>
                    <Grid item lg={6}>
                        <Typography variant='h3' sx={{ fontSize: 30, fontWeight: 1000 }}>Special Offers</Typography>
                        <Typography variant='body1' sx={{ fontWeight: 500, mt: 1.4, opacity: 0.7 }}>Enjoy exclusive discounts on selected products. Limited time only!</Typography>
                        <Button sx={{ backgroundImage: 'linear-gradient(to top, rgba(233, 135, 74, 0.2), transparent)', mt: 2 }}>Shop Deal &rarr;</Button>
                    </Grid>
                    <Grid item lg={6}>
                        <CardMedia image={logo} component={'img'} sx={{ width: '100%', height: 300 }} />
                    </Grid>
                </Grid>
            </Container>
            <Box component="section" sx={{ py: 8, bgcolor: 'rgb(255, 239, 219)', mt: 10 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: matches ? 0 : 5 }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box sx={{
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    <Box sx={{
                                        backgroundColor: 'rgba(94, 91, 91, 0.1)',
                                        p: 2,
                                        borderRadius: '50%',
                                        width: 56,
                                        height: 56,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mb: 2
                                    }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" fontWeight="medium" sx={{
                                        fontFamily: "Roboto, sans-serif",
                                        fontOpticalSizing: 'auto',
                                        fontWeight: 508,
                                        fontStyle: 'normal',
                                        fontVariationSettings:
                                            "wdth 75",
                                    }} gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HeroSection;