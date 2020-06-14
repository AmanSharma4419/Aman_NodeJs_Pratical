import React from "react";
import validator from "validator";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
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
    if (!validator.isEmail(this.state.Email)) {
      return alert("Invalid Email");
    } else {
      fetch("http://localhost:3000/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.props.history.push("/");
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "lightgreen",
          }}
        >
          <div
            style={{
              width: "300px",
              display: "flex",
              marginLeft: "39%",
              marginTop: "10%",
            }}
          >
            <form onSubmit={this.handleSubmit}>
              <h1 style={{ marginLeft: "35%" }}>UserLogin</h1>
              <hr />

              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="Email"
                    placeholder="Email"
                    name="Email"
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button
                    className="button is-success"
                    type="submit"
                    style={{ marginLeft: "37%" }}
                  >
                    Login
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

export default AdminLogin;
