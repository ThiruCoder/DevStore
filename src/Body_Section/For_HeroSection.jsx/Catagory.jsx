import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Box, Button, CardMedia, Container, Grid, Link, Typography, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Catagories = () => {
    // const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                await axios.get(`${backendUrl}/products/getCategories`)
                    .then((response) => setCategories(response.data.data))
                    .catch((error) => console.log(error))
            } catch (error) {
                console.error('Failed to fetch project details:', error);
            }
        };
        getCategoryDetails();
    }, []);

    return (
        <Container sx={{ py: 3, display: 'flex', flexDirection: 'column', gap: 4, mt: 4 }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 1
            }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: 'clamp(1rem, 10vw, 2rem)' }}>
                        Browse Categories
                    </Typography>
                    <Typography color="text.secondary">
                        Find products from our popular categories
                    </Typography>
                </Box>

                <Button
                    component={Link}
                    href="/categories"
                    variant="outlined"
                    sx={{
                        backgroundColor: 'rgba(209, 207, 207, 0.4)',
                        backdropFilter: 'blur(8px)',
                        boxShadow: 'none',
                        color: 'GrayText',
                        top: 0,
                        fontWeight: 700
                    }}
                >
                    View All
                </Button>
            </Box>

            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
                        <CategoryCard category={category} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Catagories

const CategoryCard = ({ category, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const navigte = useNavigate()
    const matches = useMediaQuery('(min-width: 600)');
    return (
        <motion.div>
            <Box sx={{
                border: '1px solid',
                borderRadius: 1,
                overflow: 'hidden',
                width: { sm: 270, xs: '100%' },
                position: 'relative',
                borderColor: isHovered ? 'primary.main' : 'divider',
                '&:hover': {
                    boxShadow: 2,
                    borderColor: 'primary.main',
                }

            }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                {...props}>
                <Box sx={{ width: '100%', height: '100%' }}>
                    <CardMedia component={'img'} image={category.image}
                        alt={category.name} style={{
                            width: '100%', height: 200, objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        }} />
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 2, backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)' }}>
                        <Typography variant="h6" color="common.white" sx={{ fontWeight: 600 }}>{category.name}</Typography>
                        <Typography variant="body1" sx={{ width: 242, color: 'white', fontWeight: 500, opacity: 0.8 }}>{category.description}</Typography>
                        <Button variant="outlined" color="primary" sx={{ border: '2px solid rgba(247, 247, 247, 0.4)', color: 'white', mt: 2 }} size="small">Shop Now</Button>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );
};