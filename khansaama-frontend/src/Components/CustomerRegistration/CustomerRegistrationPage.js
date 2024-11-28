import React, { Component } from 'react';
import CustomerRegistration from './CustomerRegistration';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import { registerUser } from '../../store/actions/authActions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../../store/actions/authActions'




class  CustomerRegistrationPage  extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      lat: "",
      lng: ""
      
    };
  
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  } 
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('');
    // const [password, setPassword] = useState('');
    // const [lat, setLat] = useState('');
    // const [lng, setLng] = useState('');
    // const [role,setRole] = useState('customer');

   onChange = e => {
    console.log(`Value is :${e.target.value}`);
        this.setState({ [e.target.name]: e.target.value });
      }

    //  props.nameChangeHandler = e => setName(e.target.value);
    //  props.emailChangeHandler = e => setEmail(e.target.value);
    //  props.phoneChangeHandler = e => setPhone(e.target.value);
    // props.passwordChangeHandler = e => setPassword(e.target.value);
    //  props.latChangeHandler = e => setLat(e.target.value);
    //  props.lngChangeHandler = e => setLng(e.target.value);

     onSubmit = e =>{
          e.preventDefault();

          console.log(`Form submitted`)
            
        // const url = "http://localhost:3002/user/signUp";
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          password: this.state.password,
          lat: this.state.lat,
          lng: this.state.lng,
          role: 'customer'
     }

    this.props.onRegisterUser(newUser, this.props.history)
    console.log("This Is the container" + newUser)
      }
        // const response = axios.post(
        //   url,
        //   data
        // )
        // .then(res => {
        //   console.log(res)
        //   if(data.exists= true){
        //     alert('oops looks like you are already registered');
        //     //this.props.history.push('/login')
        //     return <Link to = '/login' />
        //   }
          
        //  })
          
          // else{
          //   console.log(response);
          //   console.log(props)
          // }
        //})
    //     .catch(error =>{
    //       console.log(error)
    //     });
        
     
  render(){

  
    
    return(
        <CustomerRegistration
        onChange = {this.onChange}
        onSubmit = {this.onSubmit}
      
        />
    );
  }
}
 

  
// CustomerRegistrationPage.propTypes = {
//   registerUser: propTypes.func.isRequired
// }

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onRegisterUser: () => dispatch(actionCreator.registerUser())
    
  }
}


export default connect(mapStateToProps,mapDispatchToProps )(withRouter(CustomerRegistrationPage));