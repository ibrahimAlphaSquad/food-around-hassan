import React,{ useState, Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ErrorModal from '../ErrorModal/ErrorModal';
import Cookies from 'universal-cookie';
import styles from './customerRegistration.css';
import { useHistory } from "react-router-dom";
 
const cookies = new Cookies();

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  // Object.values(formErrors).forEach(val => {
  //   val.length > 0 && (valid = false);
  // });

  //validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
 
  return valid;
};

class CustomerRegistration extends Component {

  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      lat: "",
      lng: "",
      formErrors: {
        name: "",
        email: "",
        password: "",
        errorOccured : false
      }

      
    };
  
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clickedHandler = this.clickedHandler.bind(this);
   

  }

  componentDidMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition((position) => {
      var crd = position.coords;
    
      this.setState({ lat: crd.latitude, lng: crd.longitude});

    },
    (err) => { console.error(`ERROR(${err.code}): ${err.message}`)},
    options);
  }


  clickedHandler = e =>{
    this.useHistory.push('/register')
  }

  onChange = e => {
    // console.log(`Value is :${e.target.value}`);
    //     this.setState({ [e.target.name]: e.target.value });

    e.preventDefault();
    const { name, value } = e.target;
    let formErrors ={ ...this.state.formErrors} ;

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

        case "email":
        formErrors.email =
        formErrors.email = emailRegex.test(value)
        ? ""
        : "invalid email address";
        break;

        case "password":
        formErrors.password =
          value.length < 8 ? "minimum 3 characaters required" : "";
        break;


      case "phone":
        formErrors.phone =
          value.length < 9 ? "minimum 10 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };



      onSubmit = e =>{
        e.preventDefault();

       if(formValid(this.state.formErrors)){
        console.log(`Form submitted`)
          
        // const url = "http://localhost:3002/user/signUp";
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
          lat: this.state.lat,
          lng: this.state.lng,
          role: this.state.role
          
     }
  
     fetch("http://localhost:3002/user/signUp",
       {
         method: "POST",
         headers: {
          'Content-Type': 'application/json'
        },
         body: JSON.stringify(newUser)
       }
     )
     .then(res => res.json())
     .then(data => {
      cookies.set('ka_token', data.token, { path: '/' });
      cookies.set('userId', data.user._id, {path: '/'} );
      cookies.set('userName', data.user.name, {path: '/'} );
      cookies.set('userRole', data.user.role, {path: '/'} );
      let dashboardRoute = data.user.role === "customer" ? "/home": "/dashboard";
      return  this.props.history.push({
        pathname: dashboardRoute,
        state: { userData: data }
      });
     })
    
     .catch(err => {
      const errorMessage = `Email is already registered`; 
      this.setState({errorOccured: true})
      // return(<ErrorModal errorMessage={errorMessage}/>);
      //  console.log(`Error while signing in..${err}`);
      //  return this.props.history.push('/register');
     })
    
       }
       else{
         console.log(`invalid form`)

       }
      
      
      }
       
    
  


  render() {

    const { formErrors } = this.state;
    const {errorOccured} = this.state;
    const errorMessage = `Email is already registered`; 
    const clickedHandler = this.props;
  return (
    <div className= {styles}>
    {errorOccured  ? (
      <ErrorModal 
      errorMessage = {errorMessage}
      clicked = {clickedHandler}/>
    ) : (
    <div className="content-w3ls">
    <div className="content-bottom">
      <h2>Sign In Here</h2>
      <form > 
        <div className="field-group">
          <span className="fa fa-user"  />
          <div className="wthree-field">
          
         <input 
         className=""
           type="text"
           placeholder="Username"
           name="name"
            
           onChange = {this.onChange} 
           />
        </div> 
        </div>
        {formErrors.name.length >0 && (
          <span style = {{color: "red"}}>{formErrors.name}</span>
        )}
        <div className="field-group">
          <span className="fa fa-envelope"  />
          <div className="wthree-field">
            <input 
             type="text" 
              placeholder="email"
              name="email"
               onChange = {this.onChange}
                  />
          </div>
        </div>
        {formErrors.email.length >0 && (
          <span style = {{color: "red"}}>{formErrors.email}</span>
        )}
        <div className="field-group">
          <span className="fa fa-lock"  />
          <div className="wthree-field">
            <input 
             type="password" 
              placeholder="password" 
              name="password"
              onChange = {this.onChange} 
               />
          </div>
        </div>
        {formErrors.password.length >0 && (
          <span style = {{color: "red"}}>{formErrors.password}</span>
        )}
        <div className="field-group">
          <span className="fa fa-phone" />
          <div className="wthree-field">
            <input  type="text" 
            placeholder="Phone"
            name="phone"
             onChange = {this.onChange}   />
          </div>
        </div>
        
        <div className="field-group">
         
        </div>
        <p className= 'options-color'>SignUp as?</p>
        <div className="field-group">
        
          <label className="options-color">
            <input type="radio" name="role" value="customer" onChange= {this.onChange} />Foodie
          </label>
          <label className="options-color">
            <input type="radio" name="role" value="chef" onChange= {this.onChange}/>Chef
          </label>
        </div>
        <div className="wthree-field">
          <input id="saveForm" type="submit"  defaultValue="sign in" onClick = {this.onSubmit}  />
        </div>
        <ul className="list-login">
          <li className="switch-agileits">
          </li>
          <li>
          <Link to = '/login'>Have an account? Log In </Link>
          </li>
          <li className="clearfix" />
        </ul>
      </form>
    </div>
  </div>
    )}
  </div>
  );
  }
}
  export default CustomerRegistration;
  


//                   <div>
//                    <div className="container">
                  
//                   <div className="card bg-light">
//                     <article className="card-body mx-auto" style={{maxWidth: '400px'}}>
//                       <h4 className="card-title mt-3 text-center">Create Account</h4>
//                       <form>
//                         <div className="form-group input-group">
//                           <div className="input-group-prepend">
//                             <span className="input-group-text"> <i className="fa fa-user" /> </span>
//                           </div>
//                           <input className="form-control" placeholder="Full name" type="text"
//                           onChange = {this.onChange}  name="name"/>
//                         </div> {/* form-group// */}
//                         <div className="form-group input-group">
//                           <div className="input-group-prepend">
//                             <span className="input-group-text"> <i className="fa fa-envelope" /> </span>
//                           </div>
//                           <input  className="form-control" placeholder="Email address" type="email"
//                           onChange = {this.onChange} name="email"/>
//                         </div> {/* form-group// */}
//                         <div className="form-group input-group">
//                           <div className="input-group-prepend">
//                             <span className="input-group-text"> <i className="fa fa-phone" /> </span>
//                           </div>  
                         
//                           <input  className="form-control" placeholder="Phone number" type="text"
//                           onChange = {this.onChange}  name="phone"/>
//                         </div> {/* form-group// */}
                        
//                         {/* form-group end.// */}
//                 <div className="form-group input-group">
//                           <div className="input-group-prepend">
//                             <span className="input-group-text"> <i className="fa fa-lock" /> </span>
//                           </div>
//                           <input className="form-control" placeholder="Create password" type="password" 
//                           onChange = {this.onChange} name="password"/>
//                         </div>
                        
          
//                           <div style={{display:"grid", gridTemplateColumns:"1fr"}}>
//                           <p>I am registering as a :</p>
//                           <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", rowGap:"10px"}}>
//                           <div>
//                           <input type="radio" name="role" value="customer" onChange= {this.onChange}/>
//                           <label style={{marginLeft:"10px"}}>Foodie</label>
//                           </div>
//                           <div>
//                           <input type="radio" name="role" value="chef" onChange= {this.onChange}/>
//                           <label style={{marginLeft:"10px"}}>Chef</label>
//                           </div>
//                           </div>
//                         </div>                                     
//                         <div className="form-group">
//                           <button type="submit" className="btn btn-primary btn-block"
                          
//                           onClick= {this.onSubmit}>
//                           Create Account 
//                           </button>
//                         </div> {/* form-group// */}      
//                         <Link to = '/login'>Have an account? Log In </Link>                                                                 
//                       </form>
//                     </article>
//                   </div> {/* card.// */}
//                </div> 
              
//                 {/*container end.//*/}
              
//        </div>
       
//       );
      
              
            

//           }

//     // const  mapStateToProps = state => {
//     //   return {
//     //     errorOccured: state.isError
//     //   }
//     // }
    
//     // const  mapDispatchToProps = dispatch => {
//     //   return {
//     //     onErrorOccured: () =>  dispatch({type: "ERROR_OCCURED"})
        
//     //   }
//     // }

//   }
// export default CustomerRegistration

  
