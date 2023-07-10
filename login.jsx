import React, { useState } from 'react';
import axios from 'axios';
import authSys from './services/authSys';
import http from './services/httpServer';
import {withRouter} from 'react-router-dom';

const LoginPage = ({history}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  async function  postData(url, obj) {
    try {
    let response = await http.post(url, obj);
    let {data}=response;
authSys.login(data);
history.push("/allMobiles");
} 
     catch (ex) {
     
    setIsInvalidCredentials(true)
    
}
    }

    async function  postData(url, obj) {
      try {
      let response = await http.post(url, obj);
      let {data}=response;
  authSys.login(data);
  history.push("/allMobiles");
  } 
       catch (ex) {
       
      setIsInvalidCredentials(true)
      
  }
      }
  

  

  const handleLogin = (event) => {
    event.preventDefault();
    let obj={username,password}
 postData("/api/login",obj);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setIsInvalidCredentials(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsInvalidCredentials(false);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  

  const handleRegister = async (e) => {
    e.preventDefault();
    let obj={firstName, lastName, username, email, password, phone }
 postData("/api/register",obj);
  };

  const showRegistrationFormOnClick = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="container bg-light" style={{ marginLeft: '120px', marginRight: '120px', marginTop: '30px' }}>
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://consumerboard.org/wp-content/uploads/2016/05/flipkart-logo.jpg"
            alt="Flipkart Logo"
            className="img-fluid m-2"
          />
        </div>
        <div className="col-md-6">
          {!showRegistrationForm ? (
            <>
              <h2 className="mt-4">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className={`form-control ${isInvalidCredentials ? 'is-invalid' : ''}`}
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                  {isInvalidCredentials && <div className="invalid-feedback">Invalid username or password</div>}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <span className='text-secondary'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy</span><br/>
                <div className='text-center' style={{marginTop:"20px"}}>
                  <button type="submit" className="btn col-5" style={{background:"#ff4500",color:"white"}}>Login</button>
                  <h5 className='m-3'>OR</h5>
                  <button type="submit" className="btn col-5 btn-light border" style={{color:"blue"}}>Request OTP</button>
                </div>

                <h6 className='text-primary text-center' style={{marginTop:"10px"}} onClick={showRegistrationFormOnClick}>
                  New to Flipkart?{' '}
                  
                    Create an account
                  
                </h6>
              </form>
            </>
          ) : (
            <>
              <h2 className="mt-4">Register</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>Enter First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={handleFirstNameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Enter Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={handleLastNameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Enter Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Enter Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Enter Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Enter Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                <div className='text-center' style={{marginTop:"20px"}}>
                  <button type="submit" className="btn col-5" style={{background:"#ff4500",color:"white"}}>Continue</button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);


// import React, { useState } from "react";
// import { Link} from "react-router-dom";
//  import authSys from "./services/authSys";
// import http from "./services/httpServer";
// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   async function  postData(url, obj) {
//     try {
//     let response = await http.post(url, obj);
//     let {data}=response;
//     console.log(data);
// authSys.login(data);
// } 
//      catch (ex) {
//     if (ex.response && ex.response.status==500){
//     let errors={}; 
//     errors.name= "Login Failed. Check the username and password";
//     }
// }
//     }
//   const handleEmailChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//   };

  

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let obj={username,password}
//  postData("/api/login",obj);
//   };

//   return (
//     <div className="popup" style={{width:"100%"}}>
        
//       <form className="popup__form" onSubmit={handleSubmit}>
         
      
//         <label className="popup__label" htmlFor="email">
//           Username
//         </label>
//         <input
//           className="popup__input"
//           type="username"
//           id="username"
//           value={username}
//           onChange={handleEmailChange}
//           required
//         />

// <label className="popup__label" htmlFor="email">
//           Password
//         </label>
//         <input
//           className="popup__input"
//           type="password"
//           id="password"
//           value={password}
//           onChange={handlePassword}
//           required
//         />
      
        
//         <button className="popup__button" type="submit" style={{width:"90px",text:"center"}}>
//           Sign in
//         </button>

//       </form>
//     </div>
//   );
// };

// export default LoginPage;

