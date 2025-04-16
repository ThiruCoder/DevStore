import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Grid,
    Container,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Badge,
    Chip,
    IconButton
} from '@mui/material';
import { BetweenHorizontalStart, LayoutGrid, ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux_Section/Dispatch_Actions';
import { Link, useNavigate } from 'react-router-dom';


const ProductCard = ({ sorting, product, className, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    return (
        <motion.div
            whileHover={{ y: -5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Card
                sx={{
                    height: { sm: 200, md: '100%', lg: 420, xs: 200 },
                    width: { sm: '100%', md: '100%', lg: '100%' }, // 350 ,
                    display: 'flex',
                    flexDirection: { lg: 'column', md: 'column', sm: 'row', xs: 'row' },
                    gap: 2,
                    transition: 'border-color 0.3s ease',
                    borderColor: isHovered ? 'primary.main' : 'divider',
                    '&:hover': {
                        borderColor: 'primary.main'
                    },
                    justifyContent: 'center'

                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}
            >
                <Box sx={{ width: { xs: '40%', lg: '100%', sm: '100%' } }}>
                    <Box sx={{ position: 'relative' }}>
                        <Box
                            sx={{
                                overflow: 'hidden',
                                bgcolor: 'background.default',
                                position: 'relative',
                                width: '100%',
                                height: 200
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={product.images[0]}
                                alt={product.name}
                                onClick={() => navigate(`/Products/${product?._id}`)}
                                sx={{
                                    width: sorting ? '100%' : 200,//'100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.3s ease',
                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                    filter: isLoading ? 'blur(4px)' : 'none'
                                }}
                                onLoad={() => setIsLoading(false)}
                            />
                        </Box>
                        {product.discount && (
                            <Chip
                                label="Sale"
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    bgcolor: 'primary.main',
                                    color: 'primary.contrastText'
                                }}
                            />
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: { xs: '60%', lg: '100%', sm: '100%' }, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1 }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: "center" }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical',
                                    fontWeight: 700,
                                    mt: 3,
                                    fontSize: { xs: 17, lg: 22 },
                                    opacity: 0.8,
                                    width: { xs: 150, lg: '100%' }
                                }}
                            >
                                {product.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', top: 8 }}>
                                <Star sx={{ color: 'primary.main', fontSize: '1rem' }} />
                                <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {product.rating}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                                fontSize: 'clamp(0.8rem, 10vw, 1rem)',
                                fontWeight: 500,
                                opacity: 0.7,
                                position: 'relative',
                                bottom: 12
                            }}
                        >
                            {product.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                                {product.discount ? (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body1" sx={{
                                                fontSize: '1.2rem', position: 'relative', bottom: 2,
                                                fontWeight: 700
                                            }}>
                                                ${product.price - product.discount}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    textDecoration: 'line-through',
                                                    fontSize: '0.8rem', opacity: 0.6, position: 'relative', bottom: 2,
                                                    fontWeight: 900
                                                }}
                                            >
                                                ${product.price}
                                            </Typography>
                                        </Box>

                                    </>
                                ) : (
                                    <Typography variant="body1" sx={{ fontSize: '1.2rem', position: 'relative', bottom: 2, fontWeight: 700 }}>
                                        ${product.price}
                                    </Typography>
                                )}

                            </Box>
                            <CardActions sx={{ display: sorting ? 'block' : 'none', justifyContent: 'space-between', p: 2, position: 'relative', right: sorting ? null : 100 }}> {/*  allStyle */}
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<ShoppingCart fontSize="small" />}
                                    onClick={() => CreateAddCart(product)}
                                    sx={{ height: 32 }}
                                >
                                    Add
                                </Button>
                            </CardActions>
                        </Box>
                    </CardContent>

                    <CardActions sx={{ display: sorting ? 'none' : 'block', justifyContent: 'space-between', p: 2, position: 'relative', right: sorting ? null : 100, top: 12 }}> {/*  allStyle */}
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<ShoppingCart fontSize="small" />}
                            onClick={() => CreateAddCart(product)}
                            sx={{ height: 32 }}
                        >
                            Add
                        </Button>
                    </CardActions>
                </Box>
            </Card>

        </motion.div>
    );
};

const Products = () => {
    const [sorting, setSorting] = useState(true)
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products)
    useEffect(() => {
        setTimeout(() => {
            dispatch(fetchProducts())
        }, 1000)
    }, [])



    return (
        <Container component="section" sx={{ py: 6, bgcolor: "rgb(255, 239, 219)", mt: 5, borderRadius: 3 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 4,

                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center', ml: 3 }}>
                    <Typography variant="h4" component="h2" sx={{
                        fontWeight: 700,
                        textDecorationSkipInk: "all",
                        textDecorationThickness: 30,
                        textFillColor: 'black',
                        perspective: '200px',
                        wordSpacing: '0.2em',
                        color: 'black'
                    }}>
                        Featured Products
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Shop our most popular items
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    {products.map((product) => (
                        <Grid item xs={12} sm={12} md={5} lg={4} key={product._id}>
                            <ProductCard product={product} sorting={sorting} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default Products;