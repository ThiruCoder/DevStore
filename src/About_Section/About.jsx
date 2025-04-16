"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    Button,
    Divider,
    Grid,
    Card,
    CardContent,
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Container,
    Link,
    CardMedia,
    useMediaQuery,
} from "@mui/material";
import { CircleCheck, Link2, MoveRight, Stars } from "lucide-react";
import gif from '../assets/Outer Space GIF by BBC.gif'
// import CardMedia
// component={'img'} from "next/image";
// import Linimagerom "next/link";


const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerContainer = {
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function AboutPage() {
    const [projects, setProjects] = useState([]);
    const [isHover, setIsHover] = useState(!false)
    const backendUrl = "https://mern-ecom-backend-q7di.onrender.com";
    const matches = useMediaQuery("(min-width:1000px)");
    const matches1 = useMediaQuery("(min-width:800px)");

    useEffect(() => {
        const getProjectDetails = async () => {
            try {
                const { data } = await axios.get(
                    `${backendUrl}/projects/allproject`
                );
                setProjects(data.data);
            } catch (error) {
                console.error("Failed to fetch project details:", error);
            }
        };
        getProjectDetails();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 8 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {/* Hero Section */}
            <Grid
                container
                spacing={4}
                alignItems="center"
                sx={{
                    mb: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly'
                }}
                component={motion.div}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}

            >
                <Grid item xs={12} md={6} lg={6} gap={4} width={'100%'} component={motion.div} variants={fadeIn}>

                    <Typography variant="h2" fontWeight="bold" sx={{ justifyContent: 'start' }} gutterBottom>
                        About <span style={{
                            backgroundImage: `url(${gif})`,
                            WebkitTextFillColor: 'transparent',
                            WebkitBackgroundClip: 'text'
                        }}>DevStore</span>
                    </Typography>

                    <Typography variant="h6" color="text.secondary" paragraph>
                        We're on a mission to provide high-quality products at affordable
                        prices, with exceptional customer service.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            href="/ProductsPage"
                        >
                            Shop Now
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            component={Link}
                            href="tel:7569583293"
                        >
                            Contact Us
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6} gap={4} display={'flex'} flexDirection={matches ? 'row' : 'column'} justifyContent={'space-evenly'} alignItems={'center'} width={'100%'} component={motion.div} variants={fadeIn}>
                    <Box
                        sx={{
                            position: "relative",
                            borderRadius: 2,
                            overflow: "hidden",
                            width: matches ? 500 : '100%',
                            height: matches ? 400 : 400
                        }}
                    >
                        <CardMedia
                            component={'img'}
                            image="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop"
                            alt="Our Store"
                            sx={{ objectFit: "cover", width: '100%', height: '100%' }}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* About me */}
            <Card
                sx={{
                    py: 10,
                    px: 4,
                    borderRadius: 2,
                    mb: 15,
                    border: 'none',
                    borderLeft: '1px solid green',
                    borderRight: '1px solid green',

                }}
                component={motion.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', pb: 4, }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: { lg: 31, sm: 26, md: 28, xs: 24 } }}>Crafted by Code, Driven by Passion – Welcome to devStore.</Typography>
                        <Typography sx={{
                            alignSelf: 'flex-end',
                            fontStyle: 'italic',
                            mt: 1,
                        }}>- Charipalli Thirumalesh (Fullstack developer)</Typography>
                    </Box>
                </Box>
                <Grid container spacing={6} maxWidth="xl" alignItems={'center'}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h5" sx={{ fontWeight: 1000, }} gutterBottom>
                            Our passion -
                        </Typography>
                        <Typography variant="h6" paragraph sx={{ opacity: 0.9 }}>
                            DevStore isn’t just another e-commerce site — it’s a developer-built destination where design meets functionality. Created by a passionate full-stack developer, devStore blends a smooth shopping experience with sleek, modern tech under the hood.
                            From the backend logic to the frontend flair, every line of code was handcrafted to ensure performance, speed, and simplicity. Whether you're browsing products, managing your cart, or checking out — you’re interacting with a custom-built system made with real-world tech skills and a heart for great user experience.
                        </Typography>

                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <List>
                            {[
                                {
                                    title: "Quality Products",
                                    description:
                                        "🧑‍💻 Built by a skilled Full-Stack Developer using React, Node.js, Express, and MongoDB.",
                                },
                                {
                                    title: "Affordable Pricing",
                                    description:
                                        "⚙️ Clean architecture, responsive UI, and fast performance.",
                                },
                                {
                                    title: "Customer Satisfaction",
                                    description:
                                        "💡 User-friendly experience powered by modern frameworks.",
                                },
                                {
                                    title: "Customer Satisfaction",
                                    description:
                                        "🌍 Designed for scalability, security, and seamless shopping.",
                                },
                                {
                                    title: "Customer Satisfaction",
                                    description:
                                        "❤️ A personal passion project turned into a real-world e-commerce solution.",
                                },
                            ].map((item, index) => (
                                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                                    <ListItemIcon sx={{ minWidth: 40, position: 'relative', bottom: 6 }}>
                                        <Avatar sx={{ bgcolor: "black", width: 22, height: 22 }}>
                                            <CircleCheck sx={{ color: "primary.contrastText", fontSize: 16 }} />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            </Card>

            {/* Our Mission */}
            <Box
                sx={{
                    backgroundColor: "rgb(255, 239, 219)",
                    py: 10,
                    px: 4,
                    borderRadius: 2,
                    mb: 15,
                }}
                component={motion.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Grid container spacing={6} maxWidth="xl" alignItems={'center'}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
                            Our Mission
                        </Typography>
                        <Typography variant="h6" paragraph>
                            We believe everyone deserves access to premium products <br /> that enhance
                            their lifestyle without breaking the bank.
                        </Typography>
                        <List>
                            {[
                                {
                                    title: "Quality Products",
                                    description:
                                        "We source only the best products that meet our rigorous quality standards.",
                                },
                                {
                                    title: "Affordable Pricing",
                                    description:
                                        "We believe premium products should be accessible to everyone.",
                                },
                                {
                                    title: "Customer Satisfaction",
                                    description:
                                        "Our top priority is ensuring our customers have an exceptional experience.",
                                },
                            ].map((item, index) => (
                                <ListItem key={index} sx={{ px: 0, py: 2 }}>
                                    <ListItemIcon sx={{ minWidth: 40, position: 'relative', bottom: 6 }}>
                                        <Avatar sx={{ bgcolor: "black", width: 22, height: 22 }}>
                                            <CircleCheck sx={{ color: "primary.contrastText", fontSize: 16 }} />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1" fontWeight="medium">
                                                {item.title}
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Box
                            sx={{
                                position: "relative",
                                maxWidth: 400,
                                mx: "auto",
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >
                            <CardMedia
                                component={'img'}
                                image="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                                alt="Our Mission"
                                style={{ objectFit: "cover" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Our Story */}
            <Box sx={{ mb: 15 }} textAlign="center">
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Our Story
                </Typography>
                <Typography variant="h6" color="text.secondary" maxWidth="md" mx="auto" paragraph>
                    At DevStore, we started with a simple belief — that shopping should feel personal, exciting, and effortless. What began as a small dream turned into a growing platform where quality meets care. Every product we offer is handpicked with love, with your lifestyle and needs in mind.
                    We’re not just an online store — we’re a community. A space where creativity thrives, and customers become family. Whether it’s beauty, fashion, or lifestyle essentials, our goal is to deliver not just products, but moments of joy to your doorstep.
                    Thank you for being part of our journey. Let’s continue building this beautiful story together — one order, one smile at a time. 💛
                </Typography>
                <Grid container spacing={4} mt={6} >
                    <Box sx={{ display: 'flex', flexDirection: matches1 ? 'row' : 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {[
                            {
                                step: "1",
                                title: "The Beginning",
                                description:
                                    "Started as a small passion project by our founder, aiming to make premium products accessible to everyone.",
                            },
                            {
                                step: "2",
                                title: "Growth & Expansion",
                                description:
                                    "Expanded our product range and reached customers across the country, establishing a loyal customer base.",
                            },
                            {
                                step: "3",
                                title: "Today",
                                description:
                                    "Now a trusted e-commerce destination with thousands of products and a commitment to quality and service.",
                            },
                        ].map((item, index) => (
                            <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <motion.div
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Box sx={{ height: "100%", px: 2 }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: "primary.light",
                                                color: "primary.main",
                                                width: 56,
                                                height: 56,
                                                fontSize: "1.5rem",
                                                mb: 3,
                                                mx: "auto",
                                            }}
                                        >
                                            {item.step}
                                        </Avatar>
                                        <Typography variant="h5" fontWeight="medium" gutterBottom>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Box>
                </Grid>
            </Box>

            {/* Testimonials */}
            <Box
                sx={{
                    backgroundColor: "rgb(255, 239, 219)",
                    py: 10,
                    px: 4,
                    borderRadius: 2,
                    mb: 15,
                }}
            >
                <Box textAlign="center" maxWidth="md" mx="auto" mb={8}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Our Projects
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Don't just take our word for it. Here's what our satisfied customers
                        have to say.
                    </Typography>
                </Box>
                {projects && projects.length > 0 && (
                    <Grid container spacing={4}>
                        {projects.map((project, index) => (
                            <Grid item sm={6} md={4} lg={4} key={index}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onMouseEnter={() => { setIsHover(true) }}
                                    onMouseLeave={() => { setIsHover(false) }}
                                >
                                    <Card sx={{ height: "100%" }}>
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: "100%",
                                                    height: '100%',
                                                    mb: 3,
                                                    borderRadius: 1,
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <CardMedia
                                                    component={'img'}
                                                    image={project?.image?.url}
                                                    alt="Project"
                                                    fill
                                                    style={{
                                                        objectFit: "cover", height: 150, width: '100%',
                                                        transition: 'transform 0.3s ease',
                                                        transform: isHover ? 'scale(1.04)' : 'scale(1)',
                                                    }}
                                                />
                                            </Box>
                                            <Box sx={{ display: "flex", gap: 0.5, mb: 3 }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <Stars key={i} color="primary" />
                                                ))}
                                            </Box>
                                            <Typography
                                                variant="body1"
                                                fontStyle="italic"
                                                paragraph
                                                sx={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 5,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {project?.description}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    mt: 3,
                                                }}
                                            >
                                                <Avatar
                                                    src="/path-to-logo.png" // Replace with your logo path
                                                    sx={{ width: 40, height: 40 }}
                                                />
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="subtitle1" fontWeight="medium">
                                                        Thirumal
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Fullstack developer
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    component="a"
                                                    href={project?.url}
                                                    target="_blank"
                                                    rel="noopener"
                                                    size="small"
                                                    color="primary"
                                                    startIcon={<Link2 />}
                                                >
                                                    Visit
                                                </Button>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>

            {/* CTA */}
            <Box textAlign="center" maxWidth="md" mx="auto" py={0}>
                <Typography variant="h3" fontWeight="bold"
                    sx={{
                        fontFamily: '"Roboto", sans-serif',
                        fontOpticalSizing: 'auto',
                        fontWeight: '508',
                        fontStyle: 'normal',
                        fontVariationSettings:
                            "wdth 75",
                    }}
                    gutterBottom>
                    Ready to Experience StyleStore?
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Join thousands of satisfied customers and discover our premium products
                    at affordable prices.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    href="/ProductsPage"
                    endIcon={<MoveRight />}
                    sx={{ mt: 4 }}
                >
                    Shop Now
                </Button>
            </Box>
        </Container >
    );
}