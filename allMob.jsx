import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,withRouter} from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

function AllMob({updateArr,history,wishlist,setWishlist}) {
  const [products, setProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brands: [],
    ratings: [],
    prices: [],
    rams: [],
    
  });
  const [compareArr,updateCompare] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  

  useEffect(() => {
    axios
      .get('https://flipkart-kepc.onrender.com/getMobiles')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setShowButton(scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    updateArr(compareArr);
    history.push("compareMobiles");
  };
  

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const handleHeartClick = (index) => {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user) {
      let prodArr = [...products];
      let wishlistArr = [...wishlist];
  
      if (prodArr[index].class === 'gray' || !prodArr[index].class) {
        prodArr[index].class = 'red';
        wishlistArr.push(prodArr[index]);
      } else {
        prodArr[index].class = 'gray';
        wishlistArr = wishlistArr.filter((item) => item.id !== prodArr[index].id);
      }
  
      setProducts(prodArr);
      setWishlist(wishlistArr);
    } else {
      alert('Please login first');
    }
  };

  const handleCompareCheckboxChange = (productId) => {
    if(compareArr.length>2){
      alert('Only 3 items can be compared')
    }
    else{
    updateCompare((prevCompareArr) => {
      if (prevCompareArr.includes(productId)) {
        return prevCompareArr.filter((id) => id !== productId);
      } else {
        return [...prevCompareArr, productId];
      }
    });
  }
  };
  

console.log("Compare",compareArr);
const filteredProducts = products.filter(product => {
  const brandFilter = selectedFilters.brands.length === 0 || selectedFilters.brands.includes(product.brand);
  const ratingFilter =
    selectedFilters.ratings.length === 0 || selectedFilters.ratings.some(filter => filter <= product.rating);
  const priceFilter =
    selectedFilters.prices.length === 0 || selectedFilters.prices.some(filter=>{
      if (filter === "0-5000") {
        return product.price>=0 && product.price<=5000;
      }
      else if (filter === "5000-10000"){
      return product.price>=5000 && product.price<=10000;
      }
      else if (filter === "10000-20000"){
        return product.price>=10000 && product.price<=20000;
        }else if (filter === "20000 AND ABOVE"){
          return product.price>=20000;
          }
    });
  const ramFilter = selectedFilters.rams.length === 0 || selectedFilters.rams.some(filter => {
    if (filter === "6 GB AND MORE") {
      return product.ram===6;
    }
    else if (filter === "4 GB"){
    return product.ram===4;
    }
    else if (filter === "3 GB"){
      return product.ram===3;
      }else if (filter === "2 GB"){
        return product.ram===2;
        }
  });
  return brandFilter && ratingFilter && priceFilter && ramFilter;
});
  const ratingArr = [4,3,2,1];
  const ramArr = ["6 GB AND MORE","4 GB","3 GB","2 GB"];
  const priceArr = ["0-5000","5000-10000","10000-20000","20000 AND ABOVE"];


  return (
    <div className="row">
      <div className="col-3" style={{marginLeft:"100px"}}>
      <h4>Filters</h4>
        <hr/>
        <div>
          <h4>Brands</h4>
          {Array.from(new Set(products.map(product => product.brand))).map(brand => (
            <label key={brand} className='col-12'>
              <input
                type="checkbox"
                checked={selectedFilters.brands.includes(brand)}
                onChange={() => handleFilterChange('brands', brand)}
              />
              {brand}
            </label>
            
          ))}
        </div>
        <div>
          <h4>Customer Rating</h4>
          {ratingArr.map(rating => (
            <label key={rating} className='col-12'>
              <input
                type="checkbox"
                checked={selectedFilters.ratings.includes(rating)}
                onChange={() => handleFilterChange('ratings', rating)}
              />
{rating} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
    <path d="M8 1.393l1.932 4.712h5.066l-3.867 2.813 1.933 4.712L8 11.307l-5.066 3.323 1.933-4.712L.002 6.105h5.066L8 1.393z" fill="#000000" /> 
  </svg> AND ABOVE
            </label>
          ))}
        </div>
        <div>
          <h4>Price</h4>
          {priceArr.map(price => (
            <label key={price} className='col-12'>
              <input
                type="checkbox"
                checked={selectedFilters.prices.includes(price)}
                onChange={() => handleFilterChange('prices', price)}
              />
              {price}
            </label>
          ))}
        </div>
        <div>
          <h4>RAM</h4>
          {ramArr.map(ram => (
            <label key={ram} className='col-12'>
              <input
                type="checkbox"
                checked={selectedFilters.rams.includes(ram)}
                onChange={() => handleFilterChange('rams', ram)}
              />
              {ram}
            </label>
          ))}
        </div>
      </div>
      <div className="col-8">
        <h4>Showing {filteredProducts.length} Results</h4>
        <hr/>
        <nav aria-label="breadcrumb">
        <h5 className='text-secondary'  >
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    <li class="breadcrumb-item active" aria-current="page">All Mobiles</li>
  </ol>
  </h5>
</nav>
        {filteredProducts.map((ele,index) => (
          <div className="row" key={ele.id}>
            <div className="col-2 p-2">
              <img src={ele.img} alt={ele.name} />
              <input
  type="checkbox"
  onChange={() => handleCompareCheckboxChange(ele)}
/>
 Add to Compare
            </div>
            <div className="col-6">
            <h4>
        <FaHeart
          className={`heart-icon ${loggedIn ? 'red' : ''}`}
          style={ele.class ?{color:ele.class} : { color: 'gray' }}
          onClick={()=>handleHeartClick(index)}
        />
        {' '}
        <Link
          to={`/mobile/${ele.id}`}
          style={{ textDecoration: 'none' }}
          className="text-dark"
        >
          {ele.name}
        </Link>
      </h4>
              <button className="btn btn-success" style={{marginTop:"5px"}}>
                {ele.rating}{' '}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="/>
              </button>
              
              <ul >
                {ele.details.map(e1 => (
                  <li key={e1}>{e1}</li>
                ))}
              </ul>
            </div>
            <div className="col-3">
              <h3>Rs.{ele.price}{" "}<span>{ele.assured && (
                <img
                  src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png"
                  alt="Assured"
                  style={{ width: '45%', height: '20%', objectFit: 'contain' }}
                />
              )}</span> </h3>
              
              <h5><span className="text-secondary" style={{ textDecoration: 'line-through' }}>
                Rs.{ele.prevPrice} </span> <span className="text-danger" style={{ textDecoration: 'none' }}>
                {ele.discount}%
              </span>
              </h5>
              
              <h6 className="text-primary">{ele.exchange}</h6>
            </div>
          </div>
        ))}
      </div>
      {compareArr.length > 0 && showButton && (
        <button
        className="btn btn-primary fixed-bottom-right-button col-2"
        onClick={handleButtonClick}
      >
        COMPARE ITEMS ({compareArr.length})
      </button>
    )}

    <style>{`
      .fixed-bottom-right-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }
    `}</style>
    </div>
  );
}

export default withRouter(AllMob);
