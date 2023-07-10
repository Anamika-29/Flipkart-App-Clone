import React from 'react';
import CarouselComp from './carousel';
import ProductCarousel from './dealofTheDay';
import ImageRow from './imageRow';
import AllMobiles from './allMobilesCarousel';

const All = () => {
  return (
    <div>
      <CarouselComp />
        <div className="row">
          <div className="col-9">
            <ProductCarousel />
          </div>
          <div className="col-2">
            <img src="https://i.ibb.co/1GBrRnn/fa04c5362949d9f1.jpg" width="350px" height="450px" />
          </div>
        </div>

      <ImageRow />
      <div className='row'>
        <AllMobiles />
      </div>
    </div>
  );
};

export default All;
