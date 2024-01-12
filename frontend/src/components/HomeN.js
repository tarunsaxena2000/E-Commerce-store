import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'

const HomeN = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      const filtered = products.filter(product => product.price >= min && product.price <= max);
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = products.filter(
      product =>
        product.title.toLowerCase().includes(searchTermLower) ||
        product.category.toLowerCase().includes(searchTermLower)
    );
    setFilteredProducts(filtered);
  };

  const handleReset = () => {
    setFilteredProducts(products);
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
  };


  const addToCart = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd && !updatedCart.some(item => item.id === productId)) {
      setCart([...updatedCart, { ...productToAdd, quantity: 1 }]);
    } else {
      setCart(updatedCart);
    }
  };
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(10);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);


  return (
    
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Filter by Price:</label>
        <div className="row">
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <div className="mt-4">
            <h3>Shopping Cart</h3>
            <ul className="list-group">
              <li className="list-group-item">
                Total Amount: ${calculateTotal()}
              </li>
              <li className="list-group-item">
                Cart Count: {cartCount}
              </li>
            </ul>
          </div>
          </div>
          <div className="col">
            <input
              type="number"
              className="form-control"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleFilter}>
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Search by Name or Category:</label>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="col">
            <button className="btn btn-secondary gre" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4">
            <div className="card" style={{ width: '18rem', margin: '20px' }}>
              <img className="card-img-top" src={product.thumbnail} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
                  Add to Cart🛒
                </button>
               
                <p className="card-text">Quantity: {cart.find(item => item.id === product.id)?.quantity || 0}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Price: ${product.price}</li>
                <li className="list-group-item">Discount: {product.discountPercentage}%</li>
                <li className="list-group-item">Rating: {product.rating}</li>
                <li className="list-group-item">Stock: {product.stock}</li>
                <li className="list-group-item">Brand: {product.brand}</li>
                <li className="list-group-item">Category: {product.category}</li>
              </ul>
             
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default HomeN;
