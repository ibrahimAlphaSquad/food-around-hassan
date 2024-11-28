import React from "react";

function Spinner() {
  return (
    <div className="flex__container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="finding__chefs">Please Wait...</span>
    </div>
  );
}

export default Spinner;
