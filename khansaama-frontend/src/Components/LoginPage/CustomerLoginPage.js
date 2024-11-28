import React, { useState, Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
//import  { AuthContext } from '../Context/Auth-context';
//import { AuthContextt} from '../Context/AuthContext';
//import CustomerHomePage from '../CustomerHomePage/CustomerHomePage';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();


class CustomerLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
      
    };
  
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  } 

  onChange = e => {
    console.log(`Value is :${e.target.value}`);
        this.setState({ [e.target.name]: e.target.value });
      }


      onSubmit = e =>{
        e.preventDefault();

        console.log(`Form submitted`)
          
      // const url = "http://localhost:3002/user/signin";
      const loginInfo = {
        email: this.state.email,
        password: this.state.password
   }

   fetch("http://localhost:3002/user/signIn",
     {
       method: "POST",
       headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify(loginInfo)
     }
   )
   .then(res => res.json())
   .then(data => {

    console.log(`User data: ${JSON.stringify(data)}`);
    cookies.set('ka_token', data.token, { path: '/' });
    cookies.set('userId', data.user._id, { path: '/' });
    cookies.set('userEmail', data.user.email, { path: '/' });
    cookies.set('userName', data.user.name, { path: '/' });
    cookies.set('userRole', data.user.role, { path: '/' });
    let dashboardRoute = data.user.role === "customer" ? "/home": "/dashboard";
    return  this.props.history.push({
      pathname: dashboardRoute,
      state: { userData: data }
    });
   })
   .catch(err => {
     console.log(`Error while signing in..${err}`);
     return this.props.history.push('/login');
   })

    }

    
    render() {
    return(
      <React.Fragment>
      
              <form style={{maxWidth: "50%", padding:"1em", margin: "auto", boxShadow:"0px 0px 10px 0px #ddd"}}>
             <div className="form-group input-group">
              <div className="input-group-prepend">
            <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
            </div>
             <input className="form-control" placeholder="Email Address" type="text"
             onChange = {this.onChange} name="email" />
             </div> {/* form-group// */}
             <div className="form-group input-group">
              <div className="input-group-prepend">
             <span className="input-group-text"> <i className="fa fa-lock" /> </span>
             </div>
             <input  className="form-control" placeholder="Password" type="password"
             onChange = {this.onChange} name="password"/>
            </div> {/* form-group// */}
            <div style={{display: "grid", gridTemplateColumns: "30% 70%"}}>
            <button 
            onClick = {this.onSubmit} style={{justifySelf: "left"}}>
            Log In!
            </button>
            <Link style={{justifySelf: "right"}} to = '/register'>Dont have an account? Register here </Link>
            
            </div>
        </form>
       
     </React.Fragment>
    )
    
}

}


export default CustomerLogin;