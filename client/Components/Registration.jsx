import React from "react";

class UserRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      userName: "",
      Gender: "",
      Country: "",
      City: "",
      Hobbies: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/users/user-credentials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response, "getting the resp");
      })
      .then(this.props.history.push("/login"));
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ backgroundColor: "lightgreen" }}>
          <div
            style={{
              width: "300px",
              display: "flex",
              marginLeft: "38%",
              marginTop: "10%",
            }}
          >
            <form onSubmit={this.handleSubmit}>
              <h1 style={{ marginLeft: "35%" }}>Registration</h1>
              <hr />
              <center></center>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Firstname"
                    name="firstName"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i class="far fa-user"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="lastName"
                    name="lastName"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="Email"
                    placeholder="Email"
                    name="Email"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="userName"
                    name="userName"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>

              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Gender"
                    name="Gender"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Country"
                    name="Country"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="City"
                    name="City"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control has-icons-left">
                  <input
                    className="input"
                    type="text"
                    placeholder="Hobbies"
                    name="Hobbies"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    className="button is-success"
                    type="submit"
                    style={{ marginLeft: "33%" }}
                  >
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserRegister;
