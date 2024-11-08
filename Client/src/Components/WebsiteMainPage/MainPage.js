import React, {useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import Marker from '../../Components/Maps/Marker' ;
import Chefs from "../Chefs/Chefs";

import axios from 'axios';


function MainPage(props) {

  const [chefLocation,setChefLocation]=useState([])
  const [dishes, setDishes] = useState(null);
  const [chefs, setChefs] = useState(null);


  useEffect(() => {
		async function fetchAllChefs() {
		
			let result = await axios({
        method: 'get',
        url : "http://localhost:3002/role/chefs"
		})
		console.log(result, 'check1');
    let location=[] ; 
    result.data.map((chef)=>{
        let obj={
          name:chef.name,
          id:chef._id,
          location:{
            lat:chef.address.coordinates[0],
            lng:chef.address.coordinates[1],
          }
        }
        location.push(obj)
      })
      setChefLocation(location) ;
      console.log(location)
		}
		fetchAllChefs();
    async function fetchChefDishes() {
      const url = `http://localhost:3002/food/find/`;
      const request = await fetch(url);
      const response = await request.json();
      console.log(response);
      setDishes(response);
    }
    fetchChefDishes();

    async function fetchChefs() {
      const request = await fetch("http://localhost:3002/role/chefs/");
      const response = await request.json();
      console.log(response);
      setChefs(response);
    }
    fetchChefs();
	},[]);

const center = {
  center: {
    lat: 33.6844,
    lng: 73.0479
  },
  zoom: 8

}

    return (
        <div>
        <div>
  {/* ======= Top Bar ======= */}
  <div id="topbar" className="d-flex align-items-center fixed-top">
    <div className="container d-flex">
      <div className="contact-info mr-auto">
       
        <span className="d-none d-lg-inline-block"><i className="icofont-clock-time icofont-rotate-180" /> Mon-Sat: 11:00 AM - 23:00 PM</span>
      </div>
      <div className="languages">
        <ul>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
  {/* ======= Header ======= */}
  <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">
      <h1 className="logo mr-auto"><a href="index.html">Khansaama</a></h1>
      {/* Uncomment below if you prefer to use an image logo */}
      {/* <a href="index.html" class="logo mr-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
      <nav className="nav-menu d-none d-lg-block">
        <ul>
          <li className="active"><a href="index.html"></a></li>
          <li><a href="#about"></a></li>
          <li><a href="#menu"></a></li>
          <li><a href="#specials"></a></li>
          <li><a href="#events"></a></li>
          <li><a href="#gallery"></a></li>
          <li><a href="#gallery"></a></li>
          <li><a href="#contact"></a></li>
          <li className="book-a-table text-center"><Link to = {'/register'}>Register Your Self</Link></li>
        </ul>
      </nav>{/* .nav-menu */}
    </div>
  </header>{/* End Header */}
  {/* ======= Hero Section ======= */}
  <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCo2LPH3BJbSjKpMdlgYVlXN6-SKrfO9oc" }}
          defaultCenter={center.center}
          defaultZoom={center.zoom}
        >
        {
          chefLocation.map((chef)=>{
            return(
            <Marker
            name={chef.name}
            id={chef.id}
            lat={chef.location.lat}
            lng={chef.location.lng}
            text="My Marker"
          />)
          })
        }       
        
        
        </GoogleMapReact>
      </div>
  <section id="hero" className="d-flex align-items-center">
    <div className="container position-relative text-center text-lg-left" data-aos="zoom-in" data-aos-delay={100}>
      <div className="row">
        <div className="col-lg-8">
          <h1>Welcome to <span>Khansaama</span></h1>
          <h2>Great Home made food</h2>
          <div className="btns">
            <Link to = '/register' href="#menu" className="btn-menu animated fadeInUp scrollto">Chef Registration</Link>
            <Link to = '/home' className="btn-book animated fadeInUp scrollto">All registered Chefs</Link>
          </div>
        </div>
       
      </div>
    </div>
  </section>{/* End Hero */}
  <main id="main">
    {/* ======= About Section ======= */}
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay={100}>
            <div className="about-img">
              <img src="assets/img/about.jpg" alt="" />
            </div>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content text-white">
            <h3>We are home made food based platform to serve you.</h3>
            <p className="font-italic text-white" >
              You can Find alot of interesting features through our platform from searching food to ordering your favourite foods.
              Finding Chefs whom you like and so more. You can also start your own business if you thought that you are a goo chef
            </p>
            <ul>
              <li><i className="icofont-check-circled" /> Search For Chefs and Their foods</li>
              <li><i className="icofont-check-circled" /> Order your favourite food.</li>
              <li><i className="icofont-check-circled" />Work as a Chef.</li>
            </ul>
            <p>
              This Platform will help both sets of people, the one looking for tasty homemade food and the one who 
              want to sell the food at which they are good at making
            </p>
          </div>
        </div>
      </div>
    </section>{/* End About Section */}
    {/* ======= Why Us Section ======= */}
    <section id="why-us" className="why-us">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Why Us</h2>
          <p>Why Choose Our Platform</p>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="box" data-aos="zoom-in" data-aos-delay={100}>
              <span>01</span>
              <h4>Easy To Find</h4>
              <p>Find Your favourite chef and Food easily</p>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay={200}>
              <span>02</span>
              <h4>Location Based Search</h4>
              <p>You will find your nearby Chef in radius of 10 km</p>
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="box" data-aos="zoom-in" data-aos-delay={300}>
              <span>03</span>
              <h4> Work As Chef</h4>
              <p>You Can work as Chef as well</p>
            </div>
          </div>
        </div>
      </div>
    </section>{/* End Why Us Section */}
    {/* ======= Menu Section ======= */}
          <section id="menu" className="menu section-bg">
            <div className="container" data-aos="fade-up">
              <div className="section-title">
                <h2>Menu</h2>
                <p>Check Our Tasty Menu</p>
              </div>
              <div
                className="row menu-container"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {/* //////////////////////////////////////////// */}
                {dishes?.map((dish) => (
                  <div className="col-lg-6 menu-item filter-starters">
                    <img
                      src="assets/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="e"
                    />
                    <div className="menu-content">
                      <Link to={`/chef/${dish.chef}/dishes`}>{dish.name}</Link>
                      <span>pkr {dish.price}</span>
                    </div>
                    <div className="menu-ingredients">
                      {dish.description}
                    </div>
                  </div>
                ))}

                {/* //////////////////////////////////////////// */}
              </div>
            </div>
          </section>
          {/* End Menu Section */}
    
    
    {/* ======= Chefs Section ======= */}
    <section id="chefs" className="chefs">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Chefs</h2>
          <p>Our Proffesional Chefs</p>
        </div>
        <div className="row">
        {chefs?.map((chef) => (
          <div className="col-lg-4 col-md-6">
            <div className="member" data-aos="zoom-in" data-aos-delay={100}>
              <img src="assets/img/chefs/chefs-1.jpg" className="img-fluid" alt="" />
              <div className="member-info">
                <div className="member-info-content">
                  <h4>{chef.name}</h4>
                  <span>Master Chef</span>
                </div>
                <div className="social">
                  <a href><i className="icofont-twitter" /></a>
                  <a href><i className="icofont-facebook" /></a>
                  <a href><i className="icofont-instagram" /></a>
                  <a href><i className="icofont-linkedin" /></a>
                </div>
              </div>
            </div>
            

          </div>
          ))}

          
          
        </div>
      </div>
    </section>{/* End Chefs Section */}
    
  </main>{/* End #main */}
  {/* ======= Footer ======= */}
  <footer id="footer">
    <div className="footer-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-info">
              <h3>Khansaama</h3>
              <p>
                Peshawar And Islamabad <br />
                Pakistan<br /><br />
                <strong>Phone:</strong>03365152551<br />
                <strong>Email:</strong>hayatjunaid25@gmail.com<br />
              </p>
              <div className="social-links mt-3">
                <a href= "#" className="twitter"><i className="bx bxl-twitter" /></a>
                <a href="" className="facebook"><i className="bx bxl-facebook" /></a>
                <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
                <a href="#" className="google-plus"><i className="bx bxl-skype" /></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i className="bx bx-chevron-right" /> <a href="#">Home</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">About us</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">Services</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">Terms of service</a></li>
              <li><i className="bx bx-chevron-right" /> <a href="#">Privacy policy</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footer-links">
            
          </div>
          <div className="col-lg-4 col-md-6 footer-newsletter">
            
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="copyright">
        © Copyright <strong><span>Khaansaama</span></strong>. All Rights Reserved
      </div>
     
    </div>
  </footer>{/* End Footer */}
</div>

        </div>
    );
}

export default MainPage;