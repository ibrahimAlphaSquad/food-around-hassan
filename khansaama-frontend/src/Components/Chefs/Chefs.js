import React from "react";
import SingleChefCard from "./SingleChefCard";
function Chefs({ chefs }) {
  return (
    <div>
      <section id="chefs" className="chefs">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Chefs</h2>
            <p style={{ color: "#d7385e" }}>Our Top Rated Chefs</p>
          </div>
          <div className="row">
            {chefs.map((chef) => (
              <SingleChefCard
                name={chef.name}
                specialities={chef.specialities}
                id={chef._id}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Chefs;
