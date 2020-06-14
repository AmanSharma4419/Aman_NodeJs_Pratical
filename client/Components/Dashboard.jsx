import React from "react";
import validator from "validator";

class AdminLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responseData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/users/all-users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ ...this.state, responseData: response });
      });
  }
  render() {
    console.log(this.state.responseData);
    return (
      <React.Fragment>
        <h1>Getting The All Users</h1>
        <p>
          {this.state.responseData &&
            this.state.responseData.response.map((index, value) => {
              console.log(index);
              return (
                <>
                  <h1>{index.userName}</h1>
                </>
              );
            })}
        </p>
      </React.Fragment>
    );
  }
}

export default AdminLogin;
