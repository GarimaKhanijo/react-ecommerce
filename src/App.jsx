import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Product from './components/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import { items } from './components/Data';
import Footer from './components/Footer';

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);

  return (
    <>
      <Router>
        <Navbar cart={cart} setData={setData} />

        <img src="https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg" max-width="1350px" min-width='350px' width='1230' height="440px" />
        <div className='heading' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,color:'#2542c4',fontFamily:'unset'}}>
          <b><h1>We Know What You Want !...</h1></b>
        </div>

        <Routes>
          <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} />} />
          <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
          <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;


