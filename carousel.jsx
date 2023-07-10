import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const CarouselComp = () => {
  return (
    <Carousel
      showThumbs={false} // Disable thumbnail navigation
      autoPlay={true} // Enable automatic slide transition
      infiniteLoop={true} // Enable infinite loop
    >
      <div >
        <img src="https://i.ibb.co/4m9zL2Y/aa8947d0a8f758f2.jpg" alt="Image 1" style={{height:"300px",width:"100%"}} />
      </div>
      <div >
        <img src="https://i.ibb.co/tq9j6V7/4dfdf0c59f26c4a1.jpg" alt="Image 2"  style={{height:"300px",width:"100%"}} />
      </div>
      <div >
        <img src="https://i.ibb.co/vQZhcvT/68af1ae7331acd1c.jpg" alt="Image 3"  style={{height:"300px",width:"100%"}}/>
      </div>
      <div >
        <img src="https://i.ibb.co/qxHzVsp/30d7dffe1a1eae09.jpg" alt="Image 3" style={{height:"300px",width:"100%"}} />
      </div>
    </Carousel>
  );
}

export default CarouselComp;
