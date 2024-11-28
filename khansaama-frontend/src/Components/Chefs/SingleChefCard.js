import React from "react";
import { Link } from "react-router-dom";

function SingleChefCard({ name, specialities, id }) {
  
  console.log("Chefs IDS are ", id);
  return (
    <div className="col-lg-4 col-md-6">
      <Link to={`/chef/${id}/dishes`}>
        <div className="member" data-aos="zoom-in" data-aos-delay={100}>
          <img
            src="assets/img/chefs/chefs-1.jpg"
            className="img-fluid"
            alt="r"
          />
          <div className="member-info">
            <div className="member-info-content">
              <h4>{name}</h4>
              <span>Master Chef</span>
              <span>Specialities: {specialities}</span>
            </div>

            <div className="social">
              <a>
                <i className="icofont-twitter" />
              </a>
              <a>
                <i className="icofont-facebook" />
              </a>
              <a>
                <i className="icofont-instagram" />
              </a>
              <a>
                <i className="icofont-linkedin" />
              </a>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SingleChefCard;
