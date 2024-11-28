import React, { useState } from "react";

function EditFood(props) {
  const [changedDescription, setChangedDescription] = useState("");
  const [changedDishName, setChangedDishName] = useState("");
  const [changedPrice, setChangedPrice] = useState("");

  const descriptionChange = (e) => {
    setChangedDescription(e.target.value);
  };
  const dishChange = (e) => {
    setChangedDishName(e.target.value);
  };
  const priceChange = (e) => {
    setChangedPrice(e.target.value);
  };

  const [update, setUpdatedFood] = useState(props);

  console.log(changedDescription);
  console.log(changedPrice);

  console.log("DATA IS ", update);

  const ee = {
    chef: props.chef,
    chefName: props.chefName,
    featured: false,
    image: "URL",
    rating: 10,
    foodId: props._id,
    name: changedDishName,
    description: changedDescription,
    price: changedPrice,
  };

  async function editHandler() {
    const request = await fetch("http://localhost:3002/food/edit", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updates: ee }),
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <div className="">
        <div className="modal-dialog form-dark" role="document">
          <div className="modal-content card card-image">
            <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
              <div className="modal-header text-center pb-4">
                <h3
                  className="modal-title w-100 text-dark font-weight-bold"
                  id="myModalLabel"
                >
                  <strong>Edit</strong>{" "}
                  <a className="green-text font-weight-bold">
                    <strong> {update.name}</strong>
                  </a>
                </h3>
                <button
                  type="button"
                  className="close white-text"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">
                <div className="md-form mb-5">
                  <input
                    type="text"
                    className="form-control validate white-text"
                    placeholder={update.name}
                    onChange={dishChange}
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="Form-email5"
                  >
                    Your Dish Name
                  </label>
                  <input
                    type="text"
                    className="form-control validate white-text"
                    placeholder={update.description}
                    onChange={descriptionChange}
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="Form-email5"
                  >
                    Your description
                  </label>
                </div>
                <div className="md-form mb-5">
                  <input
                    type="text"
                    className="form-control validate white-text"
                    placeholder={update.price}
                    onChange={priceChange}
                  />
                  <label
                    data-error="wrong"
                    data-success="right"
                    htmlFor="Form-email5"
                  >
                    Price
                  </label>
                </div>

                <div className="row d-flex align-items-center mb-4">
                  <div className="text-center mb-3 col-md-12">
                    <button
                      type="button"
                      className="btn btn-success btn-block btn-rounded z-depth-1"
                      onClick={() => editHandler()}
                    >
                      Update Now
                    </button>
                  </div>
                </div>

                <div className="row"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditFood;
