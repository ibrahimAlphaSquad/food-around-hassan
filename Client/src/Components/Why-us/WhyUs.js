import React from 'react'

function WhyUs() {
    return (
        <div>
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
                <h4>Easily Accessible</h4>
                <p>The Food will be easily accessible in ones nearby</p>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="box" data-aos="zoom-in" data-aos-delay={200}>
                <span>02</span>
                <h4>Hygenic Food</h4>
                <p>Completely Hygenic and Clean food for the user </p>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">
              <div className="box" data-aos="zoom-in" data-aos-delay={300}>
                <span>03</span>
                <h4> Favourite Chefs</h4>
                <p>User Can see the top rated chefs and can view their Menus</p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}

export default WhyUs
