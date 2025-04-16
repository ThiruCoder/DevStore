import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Card, Typography, Button, TextField, Container, Grid, CardMedia } from '@mui/material';
import { ShoppingCart, CreditCard, Package } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Redux_Section/Dispatch_Actions';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Purchase_page() {
    const { id } = useParams()
    const [buyProduct, setBuyProduct] = useState(null)
    const [isHover, setIsHover] = useState(false)

    const backendUrl = import.meta.env.MODE === 'development'
        ? 'http://localhost:5000'
        : 'https://mern-ecom-backend-q7di.onrender.com';

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };
    const dispatch = useDispatch()

    const fetchProduct = async () => {
        try {
            const response = await axios.post(`${backendUrl}/products/getProductsById/${id}`);
            setBuyProduct(response.data.data);
        } catch (err) {
            console.error('Failed to fetch product:', err);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, [id]);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])



    return (
        <Container maxWidth="lg" className="min-h-screen py-12" sx={{ mt: 5 }}>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
            >
                <Grid container spacing={4}>
                    {/* Product Details */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Card className="p-6" component={'div'}
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)} >
                            <CardMedia
                                image={buyProduct?.images[0]}
                                sx={{ transition: 'transform 0.3s ease', transform: isHover ? 'scale(1.1)' : 'scale(1' }}
                                component={'img'}
                                key={buyProduct?.id}
                                alt='Product Image' />
                            <Box sx={{ p: 4 }}>
                                <Typography variant="h4" className="mb-4" key={buyProduct?.id} >
                                    {buyProduct?.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" className="mb-4" key={buyProduct?.id}>
                                    {buyProduct?.description}
                                </Typography>
                                <Box className="flex items-center gap-4 mb-4" key={buyProduct?.id} sx={{ mt: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.2 }}>
                                    <Typography variant="h5" color="primary">
                                        {buyProduct?.price}
                                    </Typography>
                                    <Typography variant="body2" className="line-through text-gray-500" sx={{ textDecoration: 'line-through' }}>
                                        {buyProduct?.discount}
                                    </Typography>
                                </Box>
                            </Box>

                        </Card>
                    </Grid>
                    {/* Purchase Form */}
                    <Grid item xs={12} md={6} lg={6}>
                        <Card className="p-6" sx={{ p: 2 }}>
                            <Typography variant="h5" className="mb-6" sx={{ fontWeight: 700, mb: 4 }}>
                                Complete Your Purchase
                            </Typography>

                            <Box component="form" className="space-y-4" sx={{ mt: 2, mb: 2, display: 'flex', gap: 4, flexDirection: 'column' }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    className="mb-4"
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    className="mb-4"
                                />
                                <TextField
                                    fullWidth
                                    label="Card Number"
                                    variant="outlined"
                                    className="mb-4"
                                />

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="Expiry Date"
                                            placeholder="MM/YY"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="CVV"
                                            type="password"
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        className="mt-6"
                                        sx={{ pt: 1.8 }}
                                        startIcon={<ShoppingCart className="w-5 h-5" />}
                                    >
                                        Complete Purchase
                                    </Button>
                                </motion.div>
                            </Box>

                            {/* Features */}
                            <Box className="mt-8" sx={{ py: 4 }}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={6}>
                                        <Box className="flex items-center gap-2" sx={{ display: 'flex', flexBasis: 4, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                            <CreditCard className="w-5 h-5 text-blue-500" />
                                            <Typography variant="body2">Secure Payment</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className="flex items-center gap-2" sx={{ display: 'flex', flexBasis: 4, flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                                            <Package className="w-5 h-5 text-blue-500" />
                                            <Typography variant="body2">Free Shipping</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
}
