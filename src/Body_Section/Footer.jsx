import {
    Box,
    Typography,
    Button,
    TextField,
    Divider,
    List,
    ListItem,
    IconButton,
    Container,
    Link,
    CardMedia,
    Grid
} from "@mui/material";
import logo from '../assets/Screenshot (16).png';
import React from "react";
import { BriefcaseBusiness, Github, Linkedin, Phone, Youtube } from "lucide-react";

const footerLinks = {
    shop: [
        { label: "All Products", href: "/products" },
        { label: "Electronics", href: "/products?category=electronics" },
        { label: "Clothing", href: "/products?category=clothing" },
        { label: "Home & Kitchen", href: "/products?category=home" },
        { label: "Beauty", href: "/products?category=beauty" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Blog", href: "/blog" },
    ],
    support: [
        { label: "FAQ", href: "/faq" },
        { label: "Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
        { label: "Track Order", href: "/track-order" },
    ],
};

export function Footer() {
    return (
        <Box component="footer" sx={{
            bgcolor: 'background.default',
            borderTop: 1,
            borderColor: 'divider',
            py: 8,
            mt: 8
        }}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    {/* Brand and Newsletter */}
                    <Grid item xs={12} sm={3} md={3} lg={3} >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <CardMedia
                                component={'img'}
                                image={logo}
                                alt="DevStore Logo"
                                style={{ borderRadius: 8, objectFit: 'cover', width: 40, height: 40 }}
                            />
                            <Typography variant="h6" fontWeight="bold">
                                DevStore
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            Quality products for every lifestyle. Shop with confidence.
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Subscribe to our newsletter
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    type="email"
                                    placeholder="Email address"
                                    size="small"
                                    sx={{ maxWidth: 220 }}
                                />
                                <Button variant="contained" size="small">
                                    Subscribe
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Shop Links */}
                    <Grid item xs={4} sm={3} md={3} lg={3} sx={{ display: 'flex', justifyContent: { xs: 'center' } }}>

                        <List dense sx={{ display: 'flex', justifyContent: { xs: 'center' }, flexDirection: 'column' }}>
                            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                Shop
                            </Typography>
                            {footerLinks.shop.map((link) => (
                                <ListItem key={link.href} disableGutters>
                                    <Link href={link.href} passHref>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                '&:hover': {
                                                    color: 'text.primary',
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {link.label}
                                        </Typography>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Company Links */}
                    <Grid item xs={4} sm={3} md={3} lg={3} sx={{ display: 'flex', justifyContent: { xs: 'center' } }} >

                        <List dense sx={{ display: 'flex', justifyContent: { xs: 'center' }, flexDirection: 'column' }}>
                            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                Company
                            </Typography>
                            {footerLinks.company.map((link) => (
                                <ListItem key={link.href} disableGutters>
                                    <Link href={link.href} passHref>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                '&:hover': {
                                                    color: 'text.primary',
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {link.label}
                                        </Typography>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {/* Support Links */}
                    <Grid item xs={4} sm={3} md={3} lg={3} sx={{ display: 'flex', justifyContent: { xs: 'center' } }}>

                        <List dense sx={{ display: 'flex', justifyContent: { xs: 'center' }, flexDirection: 'column' }} >
                            <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
                                Support
                            </Typography>
                            {footerLinks.support.map((link) => (
                                <ListItem key={link.href} disableGutters>
                                    <Link href={link.href} passHref>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                '&:hover': {
                                                    color: 'text.primary',
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            {link.label}
                                        </Typography>
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 6 }} />

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 3
                }}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} DevStore. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            component={Link}
                            href="https://portfolio-frontend-92nm.onrender.com/"
                            target="_blank"
                            size="small"
                            color="inherit"
                        >
                            <BriefcaseBusiness fontSize="small" />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://www.youtube.com/@ThiruSoftCode"
                            target="_blank"
                            size="small"
                            color="inherit"
                        >
                            <Youtube fontSize="small" />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="tel:7569583293"
                            size="small"
                            color="inherit"
                        >
                            <Phone fontSize="small" />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://www.linkedin.com/in/charipalli-thirumalesh-a7a127350"
                            target="_blank"
                            size="small"
                            color="inherit"
                        >
                            <Linkedin fontSize="small" />
                        </IconButton>
                        <IconButton
                            component={Link}
                            href="https://github.com/ThiruCoder"
                            target="_blank"
                            size="small"
                            color="inherit"
                        >
                            <Github fontSize="small" />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}