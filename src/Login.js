import React, { Component } from "react";
import InputMask from "react-input-mask";
import mobile from "is-mobile";
import axios from "axios";

import "./App.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      number: ""
    };

    this.initStream = this.initStream.bind(this);
  }

  async initStream() {
    await this.setState({
      loading: true
    });

    const auth = await axios.post(process.env.REACT_APP_AUTH_ENDPOINT, {
      name: this.state.name
        .split(" ")
        .join("_")
        .toLowerCase(),
      number: this.state.number
    });

    if (mobile()) {
      return window.open(
        `sms://${process.env.REACT_APP_TWILIO_NUMBER}?body=Hi, ${
          auth.data.user.name
        } here! How is everyone doing?`,
        "_system"
      );
    }

    sessionStorage.setItem("user", JSON.stringify(auth.data.user));
    sessionStorage.setItem("token", auth.data.token);

    await this.setState({
      loading: false
    });

    this.props.history.push("/");
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="login-root">
        <div className="login-card">
          <h1>Chatty</h1>
          <InputMask
            type="text"
            placeholder="Username"
            name="name"
            onChange={e => this.handleChange(e)}
          />
          <br />
          <InputMask
            {...this.props}
            type="tel"
            placeholder="Phone Number"
            name="number"
            onChange={e => this.handleChange(e)}
            mask="+1\ 999-999-9999"
            maskChar=" "
          />
          <br />
          <button onClick={this.initStream}>Start</button>
        </div>
      </div>
    );
  }
}

export default Login;
