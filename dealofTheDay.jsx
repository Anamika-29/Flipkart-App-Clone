import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

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

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft,setTimeLeft] = useState('');
  

  useEffect(() => {
    axios
      .get('https://flipkart-kepc.onrender.com/getProducts')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Set the end time for the deal
    const endTime = new Date();
    endTime.setHours(23, 59, 59); // Assuming the deal ends at 11:59:59 PM

    // Update the clock every second
    const updateClock = () => {
      const currentTime = new Date();
      const remainingTime = endTime - currentTime;

      if (remainingTime > 0) {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Deal ended');
      }
    };

    const timer = setInterval(updateClock, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const chunkSize = 4;
  const chunks = Array.from({ length: Math.ceil(products.length / chunkSize) }, (_, index) =>
    products.slice(index * chunkSize, index * chunkSize + chunkSize)
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center m-3">
      <div style={{ marginLeft: '50px' }}>
        <h4>Deal of the day</h4>
      </div>
      <div><FontAwesomeIcon icon={faClock} />{" "}{timeLeft} left</div>

      {/* <div>
        <button className="btn btn-primary">View All</button>
      </div> */}
    </div>

      <Carousel
        showThumbs={true} // Disable thumbnail navigation
        autoPlay={true} // Enable automatic slide transition
        infiniteLoop={true} // Enable infinite loop
        prevArrow={<CustomPrevArrow />}
        nextArrow={<CustomNextArrow />}
      >
        {chunks.map((chunk, index) => (
          <div key={index} className="row">
            {chunk.map(product => (

<Link to={`/product/${product.id}`} style={{textDecoration:"none"}} key={product._id} className="col-3">
<div  >
                  <React.Fragment>
                <img src={product.url} alt={product.title.shortTitle} style={{objectFit:"contain",width:"200px",height:"300px",textDecoration:"none"}} />
                <h5 className='text-success'  >{product.discount}</h5>
                
                <p className='text-secondary'>{product.tagline}</p>
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

export default ProductCarousel;
