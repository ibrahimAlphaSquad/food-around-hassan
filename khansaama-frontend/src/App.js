import React from "react";
//import {Route} from 'react-router-dom';
//import {Providor} from 'react-redux'
//import ErrorModal from './Components/ErrorModal/ErrorModal';
//import ErrorContextProvider from './Components/Context/Error';
//import AuthContextProvider from './Components/Context/Auth-context';
//import { AuthContextt } from './Components/Context/AuthContext';
import { Route, Switch } from "react-router-dom";
import MainPage from "./Components/WebsiteMainPage/MainPage";
//import DashBoard from "./Components/ChefDashBoard/DashBoard";
import ChefDashBoard from "./Components/ChefDashBoard/Dashboard";
import CustomerHomePage from "./Components/CustomerHomePage/CustomerHomePage";
// import About from './Components/About/About';
// import WhyUs from './Components/Why-us/WhyUs';
// import OurSpecials from './Components/OurSpecials/OurSpecials';
import Menu from "./Components/Menu/Menu";
import Order from "./Components/Order/Order";
import CustomerOrder from "./Components/Order/CustomerOrder/CustomerOrder";
// import Gallery from './Components/Gallery/Gallery';
// import Chefs from './Components/Chefs/Chefs';
// import Contact from './Components/Contact/Contact';
import CustomerRegistration from "./Components/CustomerRegistration/CustomerRegistration";
//import CustomerRegistration from './Components/CustomerRegistration/CustomerRegistration';
import CustomerLogin from "./Components/LoginPage/CustomerLoginPage";
import AddFood from "./Components/ChefDashBoard/AddFood";
//import Cart from "./Components/Cart/cart";
import Cart from "./Cart";
// import Card from './Components/Payment/Card';
import { Elements, StripeProvider } from "react-stripe-elements";
import Card from "./Components/Payment/Card";
import ChatBot from "./Components/ChatBot/ChatBot";

const App = () => {
  return (
    <>
      <Switch>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/register" component={CustomerRegistration} />
          <Route path="/login" component={CustomerLogin} />
          <Route path="/home" component={CustomerHomePage} />
          <Route path="/dashboard" component={ChefDashBoard} />
          <Route path="/chef/:chefId/dishes" component={Menu} />
          <Route path="/add/food" component={AddFood} />
          <Route path="/orders" component={Order} />
          <Route path="/customer-order" component={CustomerOrder} />
          <Route path="/cart" component={Cart} />
          <StripeProvider apiKey={"pk_test_hGENnJ7Ns3whNA4pXCFNOHm900LPxvKeOc"}>
            <Elements>
              <Route path="/payment" component={Card} />
            </Elements>
          </StripeProvider>
        </div>
      </Switch>
      <ChatBot />
    </>
  );
};

export default App;
