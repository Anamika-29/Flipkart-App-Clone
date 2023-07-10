import React from 'react';

const Cart = ({cart,increase,decrease,remove}) => {
    console.log("Cart",cart);
    const confirm = () => {
      alert('Order has been placed successfully!!');
      window.location = ("/");
    }
  return (
    <div style={{marginLeft:"100px",marginRight:"100px"}}>
      <br/>
      {cart.length===0 ? <div className='text-center'>
        <img src='https://i.ibb.co/NFHkG3n/d438a32e-765a-4d8b-b4a6-520b560971e8.png' width={"50%"} height={"50%"} />
        <h4>
          Your Cart is Empty<br/>
          Add items to it now

          
        </h4>
      </div>:<React.Fragment>
      <h5>My Cart ({cart.length})</h5>
      <hr/>
      <div className='row'>
        <div className='col-8'>
        {cart.map(ele=><div className='row m-2'>
      <div className='col-3 text-center'><img  src={ele.img} width={"120px"} height={"220px"}/>
      <br/>
      <br></br>
      <button className='btn border-secondary' onClick={()=>increase(ele)} style={{borderTopLeftRadius:"50%",borderBottomLeftRadius:"50%",borderTopRightRadius:"0%",borderBottomRightRadius:"0%"}}>+</button>
      <button className='btn border-secondary' style={{borderRadius:"0"}}>{ele.quantity}</button>
      <button className='btn border-secondary' onClick={()=>decrease(ele)} style={{borderTopRightRadius:"50%",borderBottomRightRadius:"50%",borderTopLeftRadius:"0%",borderBottomLeftRadius:"0%"}}>-</button>
      </div>
      <div className='col-9'>
        <h5>{ele.name}</h5>
        <br/>
        <h5><span className="text-secondary" style={{marginTop:"50px"}}>
                Seller : RetailNet </span>{" "}<span>{ele.assured && (
                <img
                  src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png"
                  alt="Assured"
                  style={{ width: '5%', height: '10%', objectFit: 'contain' }}
                />
              )}</span> </h5>
      
              <h5 style={{marginTop:"20px"}}><span >
                Rs.{ele.price} </span>{"   "}<span className="text-secondary" style={{ textDecoration: 'line-through' }}>
                Rs.{ele.prevPrice} </span>{"   "}<span className="text-secondary" style={{ textDecoration: 'none' }}>
                {ele.discount}%
              </span>
              </h5>
              <br/><br/><br/>
              <h6 onClick={()=>remove(ele)}>REMOVE</h6>
              

      </div>
      

      </div>)}
      <div className='row bg-light' >
        <div className='col-9'>

        </div>
        <div className='col-2'>
          <button className='btn btn-primary' onClick={()=>confirm()}>Place Order</button>
          
        </div>

      </div>
          </div>
          {cart.length===0 ? <div className='col-4'><h4>Cart is Empty</h4></div> :<div className='col-4'>
        <h5>PRICE DETAILS</h5>
        <div className='row'>
          <div className='col-6'><b>price({cart.length})</b>
          <br/><br/>
          <b>Discount</b>
          <br/><br/>
          <b>Delivery Charges</b>
          <br/><br/>
          <h4>Total Amount</h4></div>
          <div className='col-6'><b>Rs.{cart.reduce((acc,curr)=>acc+curr.prevPrice*curr.quantity,0)}</b>
          <br/>
          <br/>
          <b>Rs.{cart.reduce((acc,curr)=>acc+(curr.prevPrice-curr.price)*curr.quantity,0)}</b>
          <br/><br/>
          <b>Rs.40</b>
          <br/><br/>
          <h4>Rs.{cart.reduce((acc,curr)=>acc+curr.price*curr.quantity,0)+40}</h4></div>
<br/><br/>
          <h6 className='text-success'>You will save Rs.{cart.reduce((acc,curr)=>acc+(curr.prevPrice-curr.price)*curr.quantity,0)-40} on this order</h6>

        </div>
        </div>}
          </div>
      
      
          </React.Fragment>}
    </div>
  );
};

export default Cart;
