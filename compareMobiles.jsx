import React from "react";
import { Link } from "react-router-dom";
import { FaMinusCircle } from 'react-icons/fa';

function CompareMobiles({arr,addToCart,history,remove}){
    const changeURL = (ele) =>{
        let newJson = {...ele,quantity:1}
        addToCart(newJson);
    }
    return(
      <div style={{marginLeft:"100px",marginRight:"100px"}} className="text-center">
        {arr.length===0 ?<div className="row text-center"><h2 className="text-secondary">Add Products To Compare.!!</h2></div> :<div className="row">
            {arr.map(ele=><div className="col-4 border" style={{padding:"50px"}}>
            <div className="row"><FaMinusCircle style={{marginLeft:"130px"}} onClick={()=>remove(ele)} /></div>
                <img src={ele.img} style={{marginTop:"15px"}} />
                <br/>
                <h4><Link to={`/mobile/${ele.id}`}>{ele.name}</Link></h4>
                <h5 className="text-center" style={{marginTop:"20px"}}><span >
                Rs.{ele.price} </span>{"   "}<span className="text-secondary" style={{ textDecoration: 'line-through' }}>
                Rs.{ele.prevPrice} </span>{"   "}<span className="text-success" style={{ textDecoration: 'none' }}>
                {ele.discount}%
              </span>
              </h5>
              {ele.assured && (
                <img
                  src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png"
                  alt="Assured"
                  width={"40px"}
                />
              )}
              {ele.exchange &&<hr/>}
              <div><b>{ele.exchange}</b></div>
             <hr/>
              <button className="btn btn-success" style={{marginTop:"5px"}}>
                {ele.rating}{' '}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="/>
              </button>
              <br/>
              <span className="text-success"><b>{ele.ratingDesc}</b></span>
              <hr/>
              <li>
      <p>{ele.details.map(ele=><li>{ele}</li>)}</p>
      </li>
      <hr/>
      <b>{ele.EMI}</b>
      <br/>

      <button className="btn btn-warning m-1" style={{paddingTop:"10px",paddingBottom:"10px",paddingLeft:"60px",paddingRight:"60px"}} onClick={() => changeURL(ele)}>
            ADD TO CART
          </button>


              



                </div>)}
        </div>}
      </div>
        )
}

export default CompareMobiles;