import { useState } from 'react'
import './App.css'
import Header from './Body_Section/Header'
import HeroSection from './Body_Section/HeroSection'
import { Footer } from './Body_Section/Footer'
import { Route, Routes } from 'react-router-dom'
import AboutPage from './About_Section/About'
import ProductsPageWrapper from './Product_Section/Products'
import ProductById from './Product_Section/ById/ProductById'
import Add_Cart_Page from './Add_Cart/Add_Cart'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Purchase_page from './Purchase_Section/Purchase_page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ProductsPage" element={<ProductsPageWrapper />} />
        <Route path="/Products/:id" element={<ProductById />} />
        <Route path="/addCart" element={<Add_Cart_Page />} />
        <Route path="/purchase_page/:id" element={<Purchase_page />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
