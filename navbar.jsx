import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Navbar = ({cart}) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link to="/" className="navbar-brand" href="#" style={{marginLeft:"100px"}}>
        <img src="https://i.ibb.co/qs8BK6Y/flipkart-plus-4ee2f9.png" alt="Logo" style={{ height: '20px',width:"100%" }} />
       <br/>
        <span style={{fontStyle:"italic"}}>Explore Plus</span> <img className="plus-image" src="https://i.ibb.co/t2WXyzj/plus-b13a8b.png" alt="Plus Image" style={{ height: '15px' }} />
      </Link>
      <div className="d-flex align-items-center ml-auto">
      <form className="form-inline ml-3">
  <div className="input-group">
    
    <input className="form-control search-bar" type="search" placeholder="Search for products, brands and more" aria-label="Search" style={{ borderRadius: '0', width: '350px',border:"none" }} />
    <div className="input-group-prepend">
      <span className="input-group-text" style={{ borderRadius: '0',paddingBottom:"13px",verticalAlign:"center",paddingTop:"11px",border:"none" }}>
        <FontAwesomeIcon icon={faSearch} style={{verticalAlign:"center"}}/>
      </span>
    </div>
  </div>
</form>

{user ? (
          <div className="m-3">
            <span className="text-light mr-2">Hello, {user.firstName}</span>
            
          </div>
        ) : (
          <div className="m-3">
            <Link to="/login" className="btn bg-light col-12" style={{ marginLeft: '60px', borderRadius: '0', color: 'blue' }}>
              <b>Login</b>
            </Link>
          </div>
        )}
          {user&& <div className="m-3">
<Link to="/wishlist" className="btn btn-link text-light" style={{ textDecoration: 'none' }}>
              Wishlist
            </Link>
            </div>}
            
        <div className="m-3">
  <a className="btn btn-link text-light" href="#" style={{ marginLeft: "120px", textDecoration: "none", fontSize: "18px" }}>Become a Seller</a>
</div>
{user&& <div className="m-3">
<Link to="/logout" className="btn btn-link text-light" style={{ textDecoration: 'none' }}>
              Logout
            </Link>
            </div>}

        <div className="ml-auto">
  <Link to="/cart" className="navbar-brand cart-icon" href="#" style={{marginLeft:"120px"}}>
    <FontAwesomeIcon icon={faShoppingCart} /> Cart({cart.length})
  </Link>

  
</div>

      </div>
    </nav>
  );
};

export default Navbar;

