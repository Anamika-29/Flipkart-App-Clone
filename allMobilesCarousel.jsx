import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link,withRouter } from 'react-router-dom';

const CustomPrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-prev-arrow" onClick={onClick}>
    <i className="fas fa-chevron-left"></i>
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-next-arrow" onClick={onClick}>
    <i className="fas fa-chevron-right"></i>
  </div>
);

const AllMobiles = ({history}) => {
  const [products, setProducts] = useState([]);
  

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

   const changeURL = () =>{
    
history.push("/allMobiles")
  }

  const chunkSize = 5;
  const chunks = Array.from({ length: Math.ceil(products.length / chunkSize) }, (_, index) =>
    products.slice(index * chunkSize, index * chunkSize + chunkSize)
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center m-3">
      <div style={{ marginLeft: '50px' }}>
        <h4>All Mobiles</h4>
      </div>
      <div>
        <button className="btn btn-primary" onClick={()=>changeURL()}>View All</button>
      </div>
    </div>

      <Carousel
        showThumbs={false} // Disable thumbnail navigation
        autoPlay={true} // Enable automatic slide transition
        infiniteLoop={true} // Enable infinite loop
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
      >
        {chunks.map((chunk, index) => (
          <div key={index} className="row">
            {chunk.map(product => (

<Link to={`/mobile/${product.id}`} style={{textDecoration:"none"}} key={product._id} className="col-2 m-4">
<div  >
                  <React.Fragment>
                <img src={product.img} alt={product.name} style={{objectFit:"contain",width:"200px",height:"200px",textDecoration:"none"}} />
                <h4 className='text-dark'>{product.name}</h4>
                <h6 className='text-success'  >{product.exchange}</h6>
                
                <p className='text-secondary'>{product.EMI}</p>
                </React.Fragment>
              </div>
              </Link>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default withRouter(AllMobiles);
