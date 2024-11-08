import React from 'react'

function About() {
    return (
        <div>
         {/* ======= About Section ======= */}
         <section id="about" className="about">
         <div className="container" data-aos="fade-up">
           <div className="row">
             <div className="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay={100}>
               <div className="about-img">
                 <img src="assets/img/about.jpg" alt="k" />
               </div>
             </div>
             <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
               <h3>How to order delecious food</h3>
               <p className="font-italic">
                 You just need to follow these steps. It is so simple
               </p>
               <ul>
                 <li><i className="icofont-check-circled" /> You have to select the food you want.</li>
                 <li><i className="icofont-check-circled" /> Find The Chefs near you using the Map </li>
                 <li><i className="icofont-check-circled" /> Click on the chef to open his/her kitchen.</li>
               </ul>
               <p>
                 Khansaama is Very Simple To Use And The User Can Easily Find the Chefs Near His/Her Location. User Just has to Click The Chefs And View Their Menu
               </p>
             </div>
           </div>
         </div>
       </section>{/* End About Section */}
        </div>
    )
}

export default About
