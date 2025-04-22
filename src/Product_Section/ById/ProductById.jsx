import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Rating,
    Stack,
    Typography,
    Chip,
    Badge,
    useTheme,
    CardMedia
} from '@mui/material';
import {
    ArrowLeft,
    ShoppingCart,
    Truck,
    Shield,
    Package,
    Star,
    CreditCard
} from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { CreateToCart } from '../../Redux_Section/AddCartFunctions';

export default function ProductById() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [mouseEntered, setMouseEntered] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const dispatch = useDispatch();

    const fetchProduct = async () => {

        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}/products/getProductsById/${id}`);
            handleSavedProduct(response.data.data);

            if (response.data.data.colors?.length) {
                setSelectedColor(response.data.data.colors[0]);
            }
            if (response?.data?.data?.quantity) {
                setQuantity(response.data.data.quantity);
            }
            if (response.data.data.sizes?.length) {
                setSelectedSize(response.data.data.sizes[0]);
            }
        } catch (err) {
            console.error('Failed to fetch product:', err);
            setError('Failed to load product');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProduct();
    }, [id]);

    const handleSavedProduct = (product) => {
        setProduct(product);
        if (product.quantity) {
            setQuantity(product.quantity);
        } else {
            setQuantity(1);
        }
    }


    if (loading) {
        return (
            <Container sx={{ py: 4, textAlign: 'center' }}>
                <Typography>Loading product...</Typography>
            </Container>
        );
    }

    if (error || !product) {
        navigate('/404');
        return null;
    }


    const updateQuantity = (id, quantityChange, priceChange, name) => {
        const updateCartItem = async () => {

            try {
                await axios.put(`${backendUrl}/products/updateAddCartById/${id}`, {
                    quantity: quantityChange,
                    totalPrice: priceChange,
                    name: name
                }).then((res) => console.log(res))
                    .catch((err) => console.log(err))

            } catch (error) {
                console.error('❌ Failed to update cart:', error.response.data.message || error.message);
            }
        };
        updateCartItem();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <motion.div>
            <Container sx={{ py: 4 }} >
                <Button
                    startIcon={<ArrowLeft size={20} />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 3 }}
                >
                    Back to products
                </Button>

                <Grid container spacing={4} mb={6}>
                    {/* Product Images */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2} component={'div'} >
                            <Box
                                component={'div'}
                                sx={{
                                    aspectRatio: '1/1',
                                    overflow: 'hidden',
                                    borderRadius: 2,
                                    bgcolor: 'background.paper',
                                    position: 'relative'
                                }}
                                onMouseEnter={() => setMouseEntered(true)} onMouseLeave={() => setMouseEntered(false)}
                            >
                                <CardMedia
                                    component={'img'}
                                    image={product.images[selectedImage]}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transform: mouseEntered ? 'scale(1.05)' : 'scale(1)',
                                        transition: 'transform 0.3s ease',
                                        filter: mouseEntered ? 'brightness(0.8)' : 'none',
                                    }}
                                />
                                {product.discount && (
                                    <Chip
                                        label="Sale"
                                        color="primary"
                                        sx={{
                                            position: 'absolute',
                                            top: 16,
                                            right: 16
                                        }}
                                    />
                                )}
                            </Box>
                            <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                                {product.images.map((image, index) => (
                                    <IconButton
                                        key={`image-${index}`}
                                        onClick={() => setSelectedImage(index)}
                                        sx={{
                                            p: 0,
                                            borderRadius: 1,
                                            border: 2,
                                            borderColor: selectedImage === index ? 'primary.main' : 'transparent',
                                            minWidth: 80,
                                            aspectRatio: '1/1'
                                        }}
                                    >
                                        <CardMedia
                                            component={"img"}
                                            image={image}
                                            alt={`${product.name} - Image ${index + 1}`}
                                            sx={{
                                                width: 70,
                                                height: '100%',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </IconButton>
                                ))}
                            </Stack>
                        </Stack>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="h3" fontWeight="bold">
                                    {product.name}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                                    <Stack direction="row" alignItems="center">
                                        <Rating
                                            value={product.rating}
                                            precision={0.5}
                                            readOnly
                                            emptyIcon={
                                                <Star
                                                    style={{ opacity: 0.55 }}
                                                    color={theme.palette.text.disabled}
                                                />
                                            }
                                        />
                                        <Typography variant="body2" color="text.secondary" ml={1}>
                                            ({product.reviews} reviews)
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary">
                                        {product.stock > 10 ? (
                                            <Typography component="span" color="success.main">
                                                In Stock
                                            </Typography>
                                        ) : product.stock > 0 ? (
                                            <Typography component="span" color="warning.main">
                                                Low Stock ({product.stock} left)
                                            </Typography>
                                        ) : (
                                            <Typography component="span" color="error.main">
                                                Out of Stock
                                            </Typography>
                                        )}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                {product.discount ? (
                                    <>
                                        <Typography variant="h4" fontWeight="bold">
                                            ${product.discount}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            color="text.secondary"
                                            sx={{ textDecoration: 'line-through' }}
                                        >
                                            ${product.price}
                                        </Typography>
                                        <Chip
                                            label={`Save $${(product.price - product.discount).toFixed(2)}`}
                                            variant="outlined"
                                            color="success"
                                            size="small"
                                        />
                                    </>
                                ) : (
                                    <Typography variant="h4" fontWeight="bold">
                                        ${product.price}
                                    </Typography>
                                )}
                            </Stack>

                            <Divider />

                            <Stack spacing={3}>
                                <Typography color="text.secondary">
                                    {product.description}
                                </Typography>

                                {/* Color Selection */}
                                {product.colors?.length > 0 && (
                                    <Stack spacing={1}>
                                        <Typography fontWeight="medium">
                                            Color: {selectedColor}
                                        </Typography>
                                        <Stack direction="row" spacing={1}>
                                            {product.colors.map((color) => (
                                                <IconButton
                                                    key={color}
                                                    onClick={() => setSelectedColor(color)}
                                                    sx={{
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: '50%',
                                                        bgcolor: color,
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        ...(selectedColor === color && {
                                                            outline: `2px solid ${theme.palette.primary.main}`,
                                                            outlineOffset: 2
                                                        })
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </Stack>
                                )}
                                <Box component={'form'} onSubmit={handleSubmit}>
                                    {/* Size Selection */}
                                    {product.sizes?.length > 0 && (
                                        <Stack spacing={1}>
                                            <Typography fontWeight="medium">
                                                Size: {selectedSize}
                                            </Typography>
                                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                                {product.sizes.map((size) => (
                                                    <Button
                                                        key={size}
                                                        variant={selectedSize === size ? 'contained' : 'outlined'}
                                                        onClick={() => setSelectedSize(size)}
                                                        sx={{
                                                            minWidth: 0,
                                                            px: 2,
                                                            py: 1
                                                        }}
                                                        type='button'
                                                    >
                                                        {size}
                                                    </Button>
                                                ))}
                                            </Stack>
                                        </Stack>
                                    )}

                                    {/* Quantity Selection */}
                                    <Stack spacing={1}>
                                        <Typography fontWeight="medium">Quantity</Typography>
                                        <Stack direction="row" alignItems="center">
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    updateQuantity(product?._id, -1, product?.price, product?.id)
                                                    setQuantity((prev) => prev - 1);
                                                }}
                                                disabled={quantity <= 1}
                                                sx={{ minWidth: 36, height: 36 }}
                                                type='button'
                                            >
                                                -
                                            </Button>
                                            <Typography width={48} textAlign="center">
                                                {quantity}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    updateQuantity(product?._id, 1, product?.price, product?.id)
                                                    setQuantity((prev) => prev + 1);
                                                }}
                                                disabled={product?.quantity >= product.stock}
                                                sx={{ minWidth: 36, height: 36 }}
                                                type='button'
                                            >
                                                +
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Box>
                                {/* Add to Cart Button */}
                                <Box pt={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 4 }}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        startIcon={<ShoppingCart size={20} />}
                                        onClick={() => {
                                            dispatch(CreateToCart(product))
                                            setClickCount((prevCount) => prevCount + 1);
                                        }}
                                        disabled={
                                            product.stock <= 0 || clickCount > 0
                                        }
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        startIcon={<CreditCard size={20} />}
                                        onClick={() => navigate(`/purchase_page/${product?._id}`)}
                                        disabled={product.stock <= 0}
                                    >
                                        Buy
                                    </Button>
                                </Box>
                            </Stack>

                            {/* Product Features */}
                            <Divider />

                            <Stack spacing={2}>
                                <Typography variant="h5" fontWeight="semibold">
                                    Features
                                </Typography>
                                <Grid container spacing={1}>
                                    {product.features.map((feature, index) => (
                                        <Grid item xs={12} sm={6} key={`feature-${index}`}>
                                            <Stack direction="row" alignItems="flex-start">
                                                <Box
                                                    sx={{
                                                        width: 6,
                                                        height: 6,
                                                        borderRadius: '50%',
                                                        bgcolor: 'primary.main',
                                                        mt: 1,
                                                        mr: 1
                                                    }}
                                                />
                                                <Typography color="text.secondary">{feature}</Typography>
                                            </Stack>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Stack>

                            {/* Shipping & Returns */}
                            <Divider />

                            <Grid container spacing={2} sx={{ objectFit: 'cover', }}>
                                <Grid item xs={12} sm={4}>
                                    <Paper sx={{ p: 3, textAlign: 'center', height: 100 }}>
                                        <Stack alignItems="center">
                                            <Truck size={32} color={theme.palette.primary.main} />
                                            <Typography fontWeight="medium" mt={1}>
                                                Free Shipping
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                On orders over $50
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Paper sx={{ p: 3, textAlign: 'center', height: 100 }}>
                                        <Stack alignItems="center">
                                            <Shield size={32} color={theme.palette.primary.main} />
                                            <Typography fontWeight="medium" mt={1}>
                                                2 Year Warranty
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Full coverage
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                                        <Stack alignItems="center">
                                            <Package size={32} color={theme.palette.primary.main} />
                                            <Typography fontWeight="medium" mt={1}>
                                                30 Day Returns
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Money back guarantee
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Stack>
                    </Grid>
                </Grid>

            </Container >
        </motion.div >
    );
}