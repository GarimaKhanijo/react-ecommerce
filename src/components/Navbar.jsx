import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { items } from './Data';
import { BsFillCartCheckFill } from 'react-icons/bs';

const Navbar = ({ setData, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const priceRanges = [
    { label: '≤ 199', value: '199' },
    { label: '≤ 499', value: '499' },
    { label: '≤ 999', value: '999' },
    { label: '≤ 4999', value: '4999' },
    { label: '≤ 9999', value: '9999' },
    { label: '≤ 49999', value: '49999' },
    { label: '≤ 69999', value: '69999' },
    { label: '≤ 89999', value: '89999' }
  ];

  const filterByCategory = (category) => {
    const filteredItems = items.filter((product) => product.category === category);
    setData(filteredItems);
  };

  const filterByPrice = (price) => {
    const filteredItems = items.filter((product) => product.price <= price);
    setData(filteredItems);
  };

  const handlePriceFilterChange = (e) => {
    const selectedPrice = e.target.value;
    setSelectedPrice(selectedPrice);
    if (selectedPrice) {
      filterByPrice(Number(selectedPrice));
    } else {
      setData(items);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm('');
  };

  return (
    <header className='sticky-top'>
      <div className='nav-bar'>
        <Link to={'/'} className='brand'>
          E-Mart
        </Link>

        <form onSubmit={handleSubmit} className='search-bar'>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type='text'
            placeholder='Search Products'
          />
        </form>

        <Link to={'/cart'} className='cart'>
          <button type='button' className='btn btn-primary position-relative'>
            <BsFillCartCheckFill style={{ fontSize: '1.5rem' }} />
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
              {cart.length}
              <span className='visually-hidden'>unread messages</span>
            </span>
          </button>
        </Link>
      </div>

      {location.pathname === '/' && (
        <div className='nav-bar-wrapper'>
          <div className='items'>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" onClick={() => setShowCategories(!showCategories)}>
                Categories
              </button>
              <div className={`dropdown-menu ${showCategories ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                <div onClick={() => setData(items)} className='dropdown-item'>
                  All Categories
                </div>
                <div onClick={() => filterByCategory('smartphones')} className='dropdown-item'>
                  Smartphones
                </div>
                <div onClick={() => filterByCategory('laptops')} className='dropdown-item'>
                  Laptops
                </div>
                <div onClick={() => filterByCategory('tablets')} className='dropdown-item'>
                  Tablets
                </div>
                <div onClick={() => filterByCategory('perfumes')} className='dropdown-item'>
                  Perfumes
                </div>
                <div onClick={() => filterByCategory('skincare')} className='dropdown-item'>
                  Skincare
                </div>
                <div onClick={() => filterByCategory('home decoration')} className='dropdown-item'>
                  Home-decor
                </div>
                <div onClick={() => filterByCategory('men clothing')} className='dropdown-item'>
                  Men clothing
                </div>
                <div onClick={() => filterByCategory('women clothing')} className='dropdown-item'>
                  Women clothing
                </div>
              </div>
            </div>
          </div>

          <div className='items'>
            Price:
            <select value={selectedPrice} onChange={handlePriceFilterChange}>
              <option value=''>All</option>
              {priceRanges.map((range, index) => (
                <option key={index} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
