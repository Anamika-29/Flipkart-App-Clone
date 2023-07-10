import React from 'react';

const LeftPanel = () => {
  return (
    <div className='bg-light' style={{margin:"30px"}}>
      <h3 className='m-2'>Filters</h3>
      <hr/>

      <div className="brand-filter">
        <h6>BRAND</h6>
        <label>
          <input type="checkbox" value="brand1" />
          Brand 1
        </label>
        <br/>
        <label>
          <input type="checkbox" value="brand2" />
          Brand 2
        </label>
        <br/>
        <label>
          <input type="checkbox" value="brand3" />
          Brand 3
        </label>
      </div>

      <div className="ram-filter">
        <h6>RAM</h6>
        <label>
          <input type="checkbox" value="2GB" />
          2GB
        </label>
        <br/>
        <label>
          <input type="checkbox" value="4GB" />
          4GB
        </label>
        <br/>

        <label>
          <input type="checkbox" value="8GB" />
          8GB
        </label>
        <br/>

      </div>

      <div className="customer-rating-filter">
        <h6>CUSTOMER RATING</h6>
        <label>
          <input type="checkbox" value="1" />
          1 star
        </label>
        <br/>
        <label>
          <input type="checkbox" value="2" />
          2 stars
        </label>
        <br/>

        <label>
          <input type="checkbox" value="3" />
          3 stars
        </label>
      </div>

      <div className="customer-rating-filter">
        <h6>PRICE</h6>
        <label>
          <input type="checkbox" value="1" />
          1 star
        </label>
        <br/>
        <label>
          <input type="checkbox" value="2" />
          2 stars
        </label>
        <br/>

        <label>
          <input type="checkbox" value="3" />
          3 stars
        </label>
      </div>
    </div>
  );
};

export default LeftPanel;
