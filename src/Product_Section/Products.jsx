"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Box,
    Typography,
    Button,
    Divider,
    Input,
    Chip,
    Select,
    MenuItem,
    IconButton,
    Container,
    Paper,
    Badge,
    TextField,
    CardMedia,
    Grid,
    CardHeader,
    Link
} from "@mui/material";
import { motion } from 'framer-motion'
import axios from "axios";
import { Suspense } from "react";
import { CircleChevronDown, CircleX, LayoutGrid, List, ListFilterPlus, ListStart, RefreshCw, Search, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductsPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductsPage />
        </Suspense>
    );
}
const backendUrl = import.meta.env.VITE_BACKEND_URL;


function ProductsPage() {
    const { id } = useParams()
    const searchParams = 12
    const categoryParam = 12

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortOption, setSortOption] = useState("featured");
    const [viewMode, setViewMode] = useState("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [products, setProducts] = useState([]);
    const [grids, setGrids] = useState(false)
    const [refrest, setRefresh] = useState(false)


    const navigate = useNavigate()

    const getProjectDetails = async () => {
        try {
            await axios.get(`${backendUrl}/products/getProducts`)
                .then((response) => setProducts(response.data))
                .catch((error) => console.log(error));
        } catch (error) {
            console.error('Failed to fetch project details:', error);
        }
    };

    useEffect(() => {
        getProjectDetails();
    }, []);

    // ✅ Debounce function
    const debounceFunction = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    // ✅ Your search logic
    const debounce = (val) => {
        const filtering = products.filter((item) =>
            item?.name?.toLowerCase()?.includes(val.toLowerCase())
        );
        console.log(filtering, 'filtered result');
        setFilteredProducts(filtering);
    };

    // ✅ Memoize the debounced version ONCE
    const debouncedSearch = useMemo(() => debounceFunction(debounce, 500), [products]);

    // ✅ Use it in onChange
    const handleSearching = (e) => {
        const { value } = e.target;
        debouncedSearch(value);
    };



    useEffect(() => {
        let result = [...products];

        // Filter by category
        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        result = result.filter(
            product => {
                const price = product.discount || product.price;
                return price >= priceRange[0] && price <= priceRange[1];
            }
        );

        // Sort products
        switch (sortOption) {
            case "price-asc":
                result.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
                break;
            case "price-desc":
                result.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "name-desc":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;
            default:
                result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
                break;
        }

        setFilteredProducts(result);
    }, [selectedCategory, searchQuery, priceRange, sortOption, products]);

    const categories = [
        { id: "electronics", name: "Electronics" },
        { id: "clothing", name: "Clothing" },
        { id: "home", name: "Home & Kitchen" },
        { id: "beauty", name: "Beauty" }
    ];


    const SwitchCaseFunction = () => {
        if (filteredProducts.length > 0) {
            return (
                <>
                    <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {filteredProducts.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} lg={viewMode === 'grid' ? 4 : 12} md={4}>
                                <ProductCard product={product} viewMode={viewMode} variant="list" />
                            </Grid>
                        ))}
                    </Grid>
                </>
            );
        } else if (products.length > 0) {
            return (
                <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={viewMode === 'grid' ? 4 : 12} xl={3}>
                            {/* Replace with your MUI ProductCard list view component */}
                            <ProductCard product={product} variant="list" viewMode={viewMode} />
                        </Grid>
                    ))}
                </Grid>
            );
        } else {
            return (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                    <Typography variant="h6" fontWeight="medium">
                        No products found
                    </Typography>
                    <Typography color="text.secondary" mb={3}>
                        Try adjusting your search or filter criteria
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setSelectedCategory(null);
                            setSearchQuery("");
                            setPriceRange([0, 1000]);
                        }}
                    >
                        Reset Filters
                    </Button>
                </Box>
            );
        }
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: 'sans-serif' }} gutterBottom>
                            Products
                        </Typography>
                        <Link component={'button'} onClick={() => navigate(-1)} sx={{ fontWeight: 700, fontSize: 18, cursor: 'pointer' }} >&larr; Back to previous</Link>
                    </Box>
                    <Typography color="text.secondary">
                        Browse our collection of high-quality products
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 3 }}>
                    {/* Filters - Mobile Toggle */}
                    <Box sx={{
                        display: { xs: 'flex', lg: 'none' },
                        justifyContent: 'space-between',
                        mb: 2
                    }}>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={showFilters ? <CircleX /> : <ListFilterPlus />}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </Button>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                color={viewMode === "grid" ? "primary" : "default"}
                                onClick={() => setViewMode("grid")}
                            >
                                <LayoutGrid />
                            </IconButton>
                            <IconButton
                                color={viewMode === "list" ? "primary" : "default"}
                                onClick={() => setViewMode("list")}
                            >
                                <List />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Filters - Sidebar */}
                    <Box
                        component="aside"
                        sx={{
                            width: { xs: '100%', lg: 290 },
                            display: showFilters ? 'block' : { xs: 'none', lg: 'block' }
                        }}
                    >
                        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography fontWeight="medium">Categories</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Button
                                        variant={selectedCategory === null ? "contained" : "text"}
                                        size="small"
                                        fullWidth
                                        sx={{ justifyContent: 'flex-start' }}
                                        onClick={() => setSelectedCategory(null)}
                                    >
                                        All Products
                                    </Button>
                                    {categories.map((category) => (
                                        <Button
                                            key={category.id}
                                            variant={selectedCategory === category.id ? "contained" : "text"}
                                            size="small"
                                            fullWidth
                                            sx={{ justifyContent: 'flex-start' }}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            {category.name}
                                        </Button>
                                    ))}
                                </Box>
                            </Box>

                            <Divider />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Typography fontWeight="medium">Price Range</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <TextField
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange[0]}
                                        onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                                        size="small"
                                        sx={{ width: 200 }}
                                    />
                                    <Typography>—</Typography>
                                    <TextField
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 1000])}
                                        size="small"
                                        sx={{ width: 200 }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* Product Grid */}
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography variant="body2" color="text.secondary">
                                {filteredProducts.length} products
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1 }}>
                                    <IconButton
                                        color={viewMode === "grid" ? "primary" : "default"}
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <LayoutGrid />
                                    </IconButton>
                                    <IconButton
                                        color={viewMode === "list" ? "primary" : "default"}
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List />
                                    </IconButton>
                                </Box>

                                <Select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    size="small"
                                    IconComponent={CircleChevronDown}
                                    sx={{ minWidth: 120, border: 'none', ':focus': { border: 'none' } }}
                                >
                                    <MenuItem value="featured">Featured</MenuItem>
                                    <MenuItem value="price-asc">Price: Low to High</MenuItem>
                                    <MenuItem value="price-desc">Price: High to Low</MenuItem>
                                    <MenuItem value="name-asc">Name: A to Z</MenuItem>
                                    <MenuItem value="name-desc">Name: Z to A</MenuItem>
                                    <MenuItem value="rating">Top Rated</MenuItem>
                                </Select>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {selectedCategory && (
                                <Chip
                                    label={categories.find(c => c.id === selectedCategory)?.name}
                                    onDelete={() => setSelectedCategory(null)}
                                    deleteIcon={<CircleX />}
                                />
                            )}
                            {searchQuery && (
                                <Chip
                                    label={`Search: ${searchQuery}`}
                                    onDelete={() => setSearchQuery("")}
                                    deleteIcon={<CircleX />}
                                />
                            )}
                            {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                                <Chip
                                    label={`Price: $${priceRange[0]} — $${priceRange[1]}`}
                                    onDelete={() => setPriceRange([0, 1000])}
                                    deleteIcon={<CircleX />}
                                />
                            )}
                        </Box>

                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{
                                position: 'absolute',
                                left: 12,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'text.secondary'
                            }}>
                                <Search />
                            </Box>
                            <Input
                                placeholder="Search products..."
                                onChange={handleSearching}
                                fullWidth
                                sx={{ pl: 6 }}
                            />
                        </Box>
                        <Grid>
                            <SwitchCaseFunction />
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

// Example ProductCard component (you'll need to implement this)
function ProductCard({ product, viewMode, variant = 'grid' }) {
    const navigate = useNavigate()
    const handleAddCartItem = (prod) => {
        const handleFunction = async () => {
            try {
                const createCart = await axios.post(`${backendUrl}/products/createAddCart`, prod, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (createCart) {
                    const showToast = (message, icon = 'success') => {
                        Swal.fire({
                            toast: true,
                            position: 'top-end', // top-right corner
                            icon: icon, // 'success', 'error', 'warning', 'info', or 'question'
                            title: message,
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.style.top = '60px'; // 👈 set custom top distance
                            }
                        });
                    };
                    showToast('Created to add cart')
                }
            } catch (error) {
                console.error('Failed to fetch project details:', error);
            }
        }
        handleFunction()
    }



    return (
        <>
            <Box component={motion.div} initial={{ y: '100vh', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }} sx={{ p: 2, width: '100%', height: '100%', position: 'relative', transition: '0.2s ease-in', display: 'flex', flexDirection: viewMode === 'grid' ? 'column' : 'row' }}>

                <CardMedia image={product?.images[0]} onClick={() => navigate(`/Products/${product?._id}`)} component={'img'} sx={{ width: 200, height: 200, borderRadius: 2 }} />
                <span style={{ position: 'absolute', top: 22, right: viewMode === 'grid' ? 86 : 72, fontWeight: 700, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                    {Array(5).fill().map((_, index) => (
                        <Star key={index} size={14} color="gray" />
                    ))}
                    <Typography >{product?.rating}</Typography>
                </span>

                <Box sx={{ position: 'relative', left: viewMode === 'grid' ? null : 5 }}>
                    <Box>
                        <CardHeader title={
                            <Typography sx={{
                                width: 180,
                                display: '-webkit-box',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical',
                            }}>{product?.name}</Typography>
                        }
                            subheader={
                                <Typography
                                    sx={{
                                        width: viewMode === 'grid' ? 180 : 400,
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        fontSize: 12
                                    }}
                                >
                                    {product?.description}
                                </Typography>
                            } />
                    </Box>
                    <Box lg={4} sx={{ display: viewMode === 'grid' ? 'flex' : 'none', justifyContent: viewMode === 'grid' ? 'space-between' : null, alignItems: 'center', flexDirection: viewMode === 'grid' ? 'row' : 'column', mt: 2 }}>
                        <Typography sx={{ fontWeight: 700, }}>${product?.price}</Typography>
                        <Button sx={{ position: 'relative', right: viewMode === 'grid' ? 44 : 0 }} onClick={() => handleAddCartItem(product)}>Add cart</Button>
                    </Box>
                    <Box sx={{ display: viewMode === 'grid' ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Typography sx={{ position: 'relative', left: 20, fontSize: 22 }}>${product?.price}</Typography>
                        <Typography sx={{ fontSize: 12, position: 'relative', top: 1.3, fontStyle: 'oblique' }}>{product?.discount}</Typography>
                    </Box>
                    <Button sx={{ display: viewMode === 'grid' ? 'none' : 'flex', position: 'relative', left: 10 }} onClick={() => handleAddCartItem(product)}>Add cart</Button>
                </Box>

            </Box>

        </>
    );
}

