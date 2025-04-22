import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    IconButton,
    Link,
    Paper,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import {
    Minus,
    Plus,
    Trash2,
    ShoppingCart
} from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { REMOVE_CART_ITEM } from '../Redux_Section/ReducerType';
import { fetchCartProducts } from '../Redux_Section/AddCartFunctions';

export default function Add_Cart_Page({ addCartItems }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [currentQuantity, setCurrentQuantity] = useState(0);
    const [isDeleted, setIsDeleted] = useState(false);
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    const updateQuantity = (_id, quantityChange, priceChange, name) => {
        const updateCartItem = async () => {

            try {
                await axios.put(`${backendUrl}/products/updateAddCartById/${_id}`, {
                    quantity: quantityChange,
                    totalPrice: priceChange,
                    name: name,
                })

                setTimeout(() => {
                    setIsDeleted((prev) => !prev);
                }, 60);

                // ✅ Optional: Notify user or trigger UI update
                fetchCartProducts(); // Refresh cart
            } catch (error) {
                console.error('❌ Failed to update cart:', error.response.data.message || error.message);
            }
        };

        updateCartItem();
    };

    const removeItem = (id) => {
        const deleteCartItem = async () => {
            try {
                dispatch({ type: REMOVE_CART_ITEM, payload: id })
                const removeAnItem = await axios.delete(`${backendUrl}/products/deleteAddCartById/${id}`);
                if (removeAnItem.status === 200) {
                    Swal.fire({
                        toast: true,
                        position: 'top-end', // top-right corner
                        icon: 'warning', // 'success', 'error', 'warning', 'info', or 'question'
                        title: 'Created to add cart',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.style.top = '60px'; // 👈 set custom top distance
                        }
                    });
                }
                setTimeout(() => {
                    setIsDeleted((prev) => !prev);
                }, 200);
            } catch (error) {
                console.error('Failed to remove item:', error);
                Swal.fire({
                    toast: true,
                    position: 'top-end', // top-right corner
                    icon: 'warning', // 'success', 'error', 'warning', 'info', or 'question'
                    title: 'No Item detected',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.style.top = '60px'; // 👈 set custom top distance
                    }
                });

            }
        };
        deleteCartItem();
    };

    // const fetchCartProducts = async () => {
    //     try {
    //         const response = await axios.get(`${backendUrl}/products/getAddCarts`);
    //         setCartProducts(response.data.data);
    //         if (response.data.data.length > 0) {
    //             setCurrentQuantity(response.data.data[0].quantity);
    //         }
    //     } catch (error) {
    //         console.error('Failed to fetch cart:', error);
    //     }
    // };

    useEffect(() => {
        dispatch(fetchCartProducts())
    }, [dispatch, isDeleted]);


    const [quantity, subtotal, shipping, tax, total] = useMemo(() => {
        const quantity = addCartItems?.length > 0 ? addCartItems.reduce((sum, item) => sum + item.quantity, 0) : null;
        const subtotal = addCartItems?.length > 0 ? addCartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        ) : null;
        const shipping = 10;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;
        return [quantity, subtotal, shipping, tax, total];
    }, [addCartItems]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h3" fontWeight="bold" mb={4}>
                        Shopping Cart
                    </Typography>
                    <Link component={'button'} onClick={() => navigate(-1)} sx={{ fontWeight: 700, fontSize: 18, cursor: 'pointer' }} >&larr; Back to previous</Link>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            {addCartItems.length > 0 ? (
                                <Stack spacing={3}>
                                    {addCartItems.map((item) => (
                                        <Box key={item._id}>
                                            <Stack direction="row" spacing={2}>
                                                <Box
                                                    component="img"
                                                    src={item?.images[0]}
                                                    alt={item.name}
                                                    sx={{
                                                        width: 96,
                                                        height: 96,
                                                        objectFit: 'cover',
                                                        borderRadius: 1
                                                    }}
                                                />
                                                <Box flexGrow={1}>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="flex-start"
                                                    >
                                                        <Typography variant="h6" fontWeight="medium">
                                                            {item.name}
                                                        </Typography>
                                                        <IconButton
                                                            onClick={() => removeItem(item._id)}
                                                            color="error"
                                                        >
                                                            <Trash2 size={20} />
                                                        </IconButton>
                                                    </Stack>
                                                    <Typography variant="h6" fontWeight="bold" mt={1}>
                                                        ${item.price.toFixed(2)}
                                                    </Typography>
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        spacing={1}
                                                        mt={2}
                                                    >
                                                        <IconButton
                                                            disabled={item.quantity <= 1}
                                                            onClick={() => updateQuantity(item._id, -1, -item.price, item?.id)}
                                                            sx={{ border: `1px solid ${theme.palette.divider}` }}
                                                        >
                                                            <Minus size={16} />
                                                        </IconButton>
                                                        <Typography width={32} textAlign="center">
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            onClick={() => updateQuantity(item._id, 1, item.price, item?.id)}
                                                            sx={{ border: `1px solid ${theme.palette.divider}` }}
                                                        >
                                                            <Plus size={16} />
                                                        </IconButton>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                            <Divider sx={{ mt: 2 }} />
                                        </Box>
                                    ))}
                                </Stack>
                            ) : (

                                <Box textAlign="center" py={4}>
                                    <Typography variant="h6" color="text.secondary" mb={2}>
                                        Your cart is empty
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate('/ProductsPage')}
                                    >
                                        Continue Shopping
                                    </Button>
                                </Box>
                            )}
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h5" fontWeight="bold" mb={2}>
                                Order Summary
                            </Typography>
                            <Stack spacing={1.5} mb={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Quantity</Typography>
                                    <Typography>{quantity}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Subtotal</Typography>
                                    <Typography>${subtotal ? subtotal.toFixed(2) : null}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Shipping</Typography>
                                    <Typography>${shipping.toFixed(2)}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Tax</Typography>
                                    <Typography>${tax.toFixed(2)}</Typography>
                                </Stack>
                            </Stack>
                            <Divider />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                mt={2}
                                mb={3}
                            >
                                <Typography variant="h6" fontWeight="bold">
                                    Total
                                </Typography>
                                <Typography variant="h6" fontWeight="bold">
                                    ${total.toFixed(2)}
                                </Typography>
                            </Stack>
                            <Button
                                variant="contained"
                                fullWidth
                                size="large"
                                startIcon={<ShoppingCart size={20} />}
                                disabled={addCartItems.length === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </motion.div>
    );
}