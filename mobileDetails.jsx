import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaBolt } from 'react-icons/fa';
import { Link ,withRouter} from 'react-router-dom';

const MobileDetails = ({match,history,addToCart}) => {
  const [product, setProduct] = useState(null);
  const [pics,setPics] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [review, setReview] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pincodes,setPincode] = useState([]);
  const [alert,setAlert] = useState("");
  const [alertNo, setAlertNo] = useState(1);
  const [pin,setPin] = useState("");
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://flipkart-kepc.onrender.com/getMobiles');
        const products = response.data;
        
        const productId = match.params.id;
        const foundProduct = products.find(product => product.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.img)


        } else {
          // Product not found
          // Handle the error or show a message
        }
      } catch (error) {
        console.log(error);
        // Handle the error or show a message
      }
    };

    

    fetchData();
  }, [match.params.id]);

  useEffect(() => {
    axios
      .get('https://flipkart-kepc.onrender.com/getPics')
      .then(response => {
        setPics(response.data);

      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://flipkart-kepc.onrender.com/getPincode')
      .then(response => {
        setPincode(response.data);

      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://flipkart-kepc.onrender.com/getReview');
        const products = response.data;
        
        const productId = match.params.id;
        const foundProduct = products.find(product => product.mobileId === productId);
        
        if (foundProduct) {

          setReview(foundProduct);

        } else {
          // Product not found
          // Handle the error or show a message
        }
      } catch (error) {
        console.log(error);
        // Handle the error or show a message
      }
    };
    fetchData();
  }, [match.params.id]);


  if (!product) {
    return <div>Loading...</div>;
  }
 
  const picJson = pics.find(p1 => p1.brand === product.brand );

  const handleClick = (image) => {
    setSelectedImage(image);
  };
  const pageSize = 7;
  console.log("REview",review);
  const totalReviews = review.ratings ? review.ratings.length : 0;
  const totalPages = Math.ceil(totalReviews / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get the current page's reviews
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentReviews = review.ratings ? review.ratings.slice(startIndex, endIndex) :[];
  

const changeURL = () =>{
    let newJson = {...product,quantity:1}
    addToCart(newJson);
    
    history.push("/cart");
}

const checkPin = () => {
  let find = pincodes.find(ele=>ele.pincode===+pin);
  if(find){
    setAlert("Delivery available");
    setAlertNo(1);

  }
  else{
    setAlert("Delivery not available");
    setAlertNo(0);
  }

}

  return (
    <div className='row'>
      <div className='col-5' style={{marginLeft:"60px"}}>
        <div className='row'>
        <div className="col-3 m-3">
        {picJson.imgList.map((ele) => (
          <div className="row" key={ele}>
            <img
              src={ele}
              alt={ele}
              style={{ height: '80px', width: '50px', objectFit: 'contain', cursor: 'pointer' }}
              onClick={() => handleClick(ele)}
            />
          </div>
        ))}
      </div>
      <div className="col-7">
        <img
          src={selectedImage}
          alt=""
          style={{ height: '550px', width: '150px', objectFit: 'contain' }}
        />
      </div>
        </div>
        <div className="button-row">
          <button className="btn btn-warning m-1" style={{paddingTop:"10px",paddingBottom:"10px",paddingLeft:"60px",paddingRight:"60px"}} onClick={() => changeURL()}>
            <FaShoppingCart className="button-icon"  />
            Add to Cart
          </button>
          <button className="btn btn-danger m-1" style={{paddingTop:"10px",paddingBottom:"10px",paddingLeft:"60px",paddingRight:"60px"}}>
            <FaBolt className="button-icon" />
            Buy Now
          </button>
        </div>
      </div>
      <div className='col-6' style={{ overflowY: 'auto', maxHeight: '600px' }}>
      <nav aria-label="breadcrumb">
        <h5 className='text-secondary'  style={{ marginTop: '50px' }}>
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><Link to="/">Home</Link></li>
    <li class="breadcrumb-item"><Link to="/allMobiles">All Mobiles</Link></li>

    <li class="breadcrumb-item active" aria-current="page">{product.name}</li>
  </ol>
  </h5>
</nav>

      <h4>{product.name}</h4>
      {product.ratingDesc} {product.assured ? <img src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png " style={{ width: '10%', height: '10%', objectFit: 'contain' }}/> : ""}

      <div className="price-info">
      <span className="cost m-2" ><strong style={{fontSize:"30px"}}>Rs. {product.price}</strong></span>
      <span className="mrp m-2" ><span className="text-secondary" style={{textDecoration:"line-through"}}>Rs. {product.prevPrice}</span></span>
      <span className="discount"><span className="text-success"><strong>{product.discount}% off</strong></span></span>
    </div>
    <h4>Availability Offers</h4>
    <ul style={{listStyle:"none"}}>
      <li>
        <img src='https://i.ibb.co/zZCY6nY/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png' width="15px" height={"15px"}/> Get extra 20% off upto Rs.50 on 1 item
      </li>
      <br/>
      <li>
      <img src='https://i.ibb.co/zZCY6nY/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png' width="15px" height={"15px"}/> Sign up for Flipkart Pay Later and get Flipkart Gift Card worth up to Rs.1000
      </li>
      <br/>

      <li>
      <img src='https://i.ibb.co/zZCY6nY/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png' width="15px" height={"15px"}/> 10% off on ICICI Bank Credit Card EMI Transactions, up to Rs.1250, on orders of Rs.5,000 and above
      </li>
      <br/>

      <li>
      <img src='https://i.ibb.co/zZCY6nY/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png' width="15px" height={"15px"}/> 10% off on IDBI Bank Bebit and Credit Card  Transactions, up to Rs.500, on orders of Rs.1,500 and above
      </li>
      <br/>

      <li>
      <img src='https://i.ibb.co/zZCY6nY/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png' width="15px" height={"15px"}/> Flat Rs.100 Instant Cashback on Paytm Wallet. Min Order Value Rs.1000. Valid once per Paytm account
      </li>
    </ul>
    <br/>

    <div className='row'>
    <div className='col-2'>
        <p className='text-secondary'>
          Warranty
        </p>

      </div>
      <div className='col-9'>
        <h6>No Warranty</h6>
      </div>
      <br/>

    <div className='col-2'>
        <p className='text-secondary'>
          Seller
        </p>

      </div>
      <div className='col-9'>
        <p className='text-primary'>SuperconNet</p>
        <h6>GST invoice available</h6>
        <h6>view more sellers starting from Rs. {product.price}</h6>
      </div>
      <br/>

      <div className='col-12'>
      <div className="row">
        <div className="col-4">
          <img
            src='https://i.ibb.co/j8CMRbn/CCO-PP-2019-07-14.png'
            style={{ width: '120%', height: '120%', objectFit: 'contain' }}
          />
        </div>
        <div className="col-8">
          {/* Content of the column */}
        </div>
      </div>
    </div>
    <br/>
    
        <div className='col-2' style={{marginTop:"20px"}}>
        <p className='text-secondary'>
          Check Pincode Availability
        </p>

      </div>
      <div className='col-9' style={{marginTop:"20px"}}>
        <input type='text' placeholder='enter pincode' onChange={(e)=>setPin(e.currentTarget.value)}/><button className='btn btn-primary m-2' onClick={()=>checkPin()}>Check</button>
      </div>
      <div className={alertNo===0 ? 'text-danger' : 'text-success'}>{alert}</div>

      <div className='col-2' style={{marginTop:"20px"}}>
        <p className='text-secondary'>
          Description
        </p>

      </div>
      <div className='col-9' style={{marginTop:"20px"}}>
      <p>{product.details.join(" | ")}</p>
      </div>
      <div style={{marginTop:"20px"}}>
        <h5>RATINGS AND REVIEWS</h5>
        <h6 className='text-secondary'>(Total {review.ratings ?review.ratings.length :0} reviews)</h6>
        <div>
      {currentReviews.map((review) => (
        <div key={review.title} style={{marginTop:"20px"}}>
            <div className='row'><div className='col-1'><button className={review.star>3 ? 'btn btn-success text-white  btn-sm' : 'btn-sm btn btn-danger text-white'}>{review.star}{' '}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="/> </button></div>
          <div className='col-10'><h4>{review.title}</h4>
          <p>{review.description}</p>
          </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              <span className="page-link">{page}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
      </div>
    </div>
      
      </div>

    </div>
  );
};

export default withRouter(MobileDetails);
