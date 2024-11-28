import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import ErrorModal from "../ErrorModal/ErrorModal";
import styles from "./customerRegistration.css";

const cookies = new Cookies();

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // Check if any form errors exist
  Object.values(formErrors).forEach((val) => {
    if (val.length > 0) valid = false;
  });

  // Check if all required fields are filled
  if (!rest.name || !rest.email || !rest.password || !rest.phone) {
    valid = false;
  }

  return valid;
};

class CustomerRegistration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "customer",
      lat: "",
      lng: "",
      locationError: "",
      formErrors: {
        name: "",
        email: "",
        password: "",
        phone: "",
        errorOccured: false,
      },
      submitted: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (!navigator.geolocation) {
      this.setState({
        locationError: "Geolocation is not supported by your browser",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const crd = position.coords;
        this.setState({
          lat: crd.latitude,
          lng: crd.longitude,
          locationError: "",
        });
      },
      (err) => {
        this.setState({
          locationError: "Please enable location services to continue",
        });
        console.error(`ERROR(${err.code}): ${err.message}`);
      },
      options
    );
  }

  onChange = (e) => {
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "Minimum 3 characters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 8 ? "Minimum 8 characters required" : "";
        break;
      case "phone":
        formErrors.phone =
          value.length < 10 ? "Minimum 10 characters required" : "";
        break;
      case "role":
        // Handle radio button selection
        this.setState({ role: value });
        return; // Return early for radio buttons
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  validateForm = () => {
    const { name, email, password, phone } = this.state;
    let formErrors = { ...this.state.formErrors };
    let isValid = true;

    // Validate required fields if empty
    if (!name) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    }
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    }
    if (!phone) {
      formErrors.phone = "Phone number is required";
      isValid = false;
    }

    this.setState({ formErrors, submitted: true });
    return isValid;
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    if (!this.state.lat || !this.state.lng) {
      this.setState({
        locationError:
          "Location access is required. Please enable location services and try again.",
      });
      this.getLocation();
      return;
    }

    if (formValid(this.state)) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        lat: this.state.lat,
        lng: this.state.lng,
        role: this.state.role,
      };

      fetch("http://localhost:3002/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          cookies.set("ka_token", data.token, { path: "/" });
          cookies.set("userId", data.user._id, { path: "/" });
          cookies.set("userName", data.user.name, { path: "/" });
          cookies.set("userRole", data.user.role, { path: "/" });
          let dashboardRoute =
            data.user.role === "customer" ? "/home" : "/dashboard";
          return this.props.history.push({
            pathname: dashboardRoute,
            state: { userData: data },
          });
        })
        .catch((err) => {
          this.setState({
            errorOccured: true,
            formErrors: {
              ...this.state.formErrors,
              errorOccured: true,
            },
          });
        });
    }
  };

  render() {
    const { formErrors, locationError, errorOccured, submitted } = this.state;
    const errorMessage = `Email is already registered`;

    return (
      <div className={styles}>
        {errorOccured ? (
          <ErrorModal
            errorMessage={errorMessage}
            clicked={this.props.clickedHandler}
          />
        ) : (
          <div className="content-w3ls">
            <div className="content-bottom">
              <h2>Sign Up</h2>
              <form onSubmit={this.onSubmit}>
                <div className="field-group">
                  <span className="fa fa-user" />
                  <div className="wthree-field">
                    <input
                      className=""
                      type="text"
                      placeholder="Username"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                {(formErrors.name.length > 0 ||
                  (submitted && !this.state.name)) && (
                  <span style={{ color: "red" }}>
                    {formErrors.name || "Name is required"}
                  </span>
                )}

                <div className="field-group">
                  <span className="fa fa-envelope" />
                  <div className="wthree-field">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                {(formErrors.email.length > 0 ||
                  (submitted && !this.state.email)) && (
                  <span style={{ color: "red" }}>
                    {formErrors.email || "Email is required"}
                  </span>
                )}

                <div className="field-group">
                  <span className="fa fa-lock" />
                  <div className="wthree-field">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                {(formErrors.password.length > 0 ||
                  (submitted && !this.state.password)) && (
                  <span style={{ color: "red" }}>
                    {formErrors.password || "Password is required"}
                  </span>
                )}

                <div className="field-group">
                  <span className="fa fa-phone" />
                  <div className="wthree-field">
                    <input
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                {(formErrors.phone.length > 0 ||
                  (submitted && !this.state.phone)) && (
                  <span style={{ color: "red" }}>
                    {formErrors.phone || "Phone is required"}
                  </span>
                )}

                {locationError && (
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",

                  }}>
                    <span style={{ color: "red" }}>{locationError}</span>
                    <button
                      type="button"
                      onClick={this.getLocation}
                      style={{
                        padding: "4px 8px",
                        background: "#f8d7da",
                        border: "1px solid #f5c6cb",
                        borderRadius: "4px", 
                      }}
                    >
                      Enable Location
                    </button>
                  </div>
                )}

                <div className="field-group role-selection">
                  <p className="options-color">Sign Up as?</p>
                  <label className="options-color">
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={this.state.role === "customer"}
                      onChange={this.onChange}
                    />
                    Foodie
                  </label>
                  <label className="options-color">
                    <input
                      type="radio"
                      name="role"
                      value="chef"
                      checked={this.state.role === "chef"}
                      onChange={this.onChange}
                    />
                    Chef
                  </label>
                </div>

                <div className="wthree-field">
                  <input
                    id="saveForm"
                    type="submit"
                    value="Sign Up"
                    onClick={this.onSubmit}
                  />
                </div>

                <ul className="list-login">
                  <li>
                    <Link to="/login">Have an account? Log In</Link>
                  </li>
                  <li className="clearfix" />
                </ul>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CustomerRegistration;
