import { useEffect, useState } from 'react'
import './App.css'
import Header from './Body_Section/Header'
import HeroSection from './Body_Section/HeroSection'
import { Footer } from './Body_Section/Footer'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './About_Section/About'
import ProductsPageWrapper from './Product_Section/Products'
import ProductById from './Product_Section/ById/ProductById'
import Add_Cart_Page from './Add_Cart/Add_Cart'
import 'sweetalert2/dist/sweetalert2.min.css';
import Purchase_page from './Purchase_Section/Purchase_page'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from './Redux_Section/Dispatch_Actions'
import { fetchCartProducts } from './Redux_Section/AddCartFunctions'
import ProductShowcase from './Body_Section/For_HeroSection.jsx/product'

function App() {
  const dispatch = useDispatch()
  // const [products, setProducts] = useState([])

  const { products } = useSelector((state) => state.products)
  const { addCartItems } = useSelector((state) => state.cartItems)
  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchProducts())
    }, 1000)
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCartProducts())
  }, [dispatch])

  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<HeroSection products={products} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ProductsPage" element={<ProductsPageWrapper products={products} />} />
        <Route path="/Products/:id" element={<ProductById />} />
        <Route path="/addCart" element={<Add_Cart_Page addCartItems={addCartItems} />} />
        <Route path="/purchase_page/:id" element={<Purchase_page />} />
        <Route path="/productShowcase" element={<ProductShowcase card={products} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
