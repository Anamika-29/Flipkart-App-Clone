import React from "react";
import { FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';

function Wishlist({wishlist,remove}){
    return(<div className="container" style={{marginLeft:"120px",marginRight:"120px"}}>
        {wishlist.length===0 ? <div className="text-center"><img src="https://tse3.mm.bing.net/th?id=OIP.kOaSZ1k00CNgSVYFfH31AgAAAA&pid=Api&P=0&h=180" /></div>: <div>
        <h4 className="m-2">My WishList({wishlist.length})</h4>
        {wishlist.map(ele=><div className="row" >
            <div className="col-2"><img src={ele.img} width={"50px"} style={{marginTop:"5px",marginBottom:"5px"}} /></div>
            <div className="col-8"><Link to={`/mobile/${ele.id}`} style={{textDecoration:"none"}}><h5>{ele.name}</h5></Link>
            <button className="btn btn-sm btn-success" style={{marginTop:"5px",marginRight:"15px"}}>
                {ele.rating}{' '}
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="/>
              </button>({ele.ratingDesc}){ele.assured ? <img src="https://i.ibb.co/t8bPSBN/fa-8b4b59.png " style={{ width: '10%', height: '10%', objectFit: 'contain' }}/> : ""}
            <div className="price-info">
      
      <span className="mrp m-2" ><span className="text-secondary" style={{textDecoration:"line-through"}}>Rs. {ele.prevPrice}</span></span>
      <span className="discount"><span className="text-danger"><strong>{ele.discount}% off</strong></span></span>
    </div>
    <p className="text-success">
                <b>{ele.exchange}</b>
            </p>
            <span className="cost m-2" ><strong style={{fontSize:"20px"}}>Rs. {ele.price}</strong></span>
            </div>
            <div className="col-2" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    <FaTrash style={{ color: 'red' }} onClick={()=>remove(ele)} />
  </div>
</div>            
            <hr/>

            </div>)}</div>}

    </div>)
}
export default Wishlist;