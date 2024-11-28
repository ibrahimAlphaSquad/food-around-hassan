// import React from 'react';

// function FoodCard(props) {
//     return (
//         <div className="card" style={{width: '18rem'}}>
//         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Biryani_Home.jpg/1200px-Biryani_Home.jpg" className="card-img-top" alt="..." />
//         <div className="card-body">
//           <h5 className="card-title">props.data.name</h5>
//           <p className="card-text">props.data.description.</p>
//           <a href="#" className="btn btn-primary">Details</a>
//         </div>
//       </div>
//     );
// }

// export default FoodCard;

import React, { useState } from "react";
import EditFood from "./EditFood.js";

function FoodCard(props) {
  console.log("Food Props are ", props);
  let { name, description } = props;
  const [showEditModal, setShowEditModal] = useState(false);

  ////////////////////////////////////////////////////////////
  //Delete Handler Added For Deleting Food From Chef Dashboar
  async function deleteHandler() {
    const request = await fetch("http://localhost:3002/food/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodId: props._id }),
    });
    const response = await request.json();
    console.log(response);
  }
  ////////////////////////////////////////////////////////////

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Biryani_Home.jpg/1200px-Biryani_Home.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}.</p>
          <button
            className="btn btn-primary"
           onClick={() => setShowEditModal(true)}
          >
            Edit {/*Button to Edit Food */}
          </button>
          <button className="btn btn-danger" onClick={() => deleteHandler()}>
            DELETE
          </button>{" "}
          {/*Button to Delete Food */}
        </div>
      </div>
      {showEditModal && <EditFood {...props} />} {/*Edit Food Handler */}
    </>
  );
}

export default FoodCard;





                     