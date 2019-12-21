import React, {Component} from 'react';

import API from '../utils/API';
import {Redirect} from 'react-router-dom';
import {Col, Row, Container} from '../components/Grid';
import {Input, FormBtn} from '../components/Form';

class Login extends Component {
  state = {
    loading: true,
    authenticated: false,
    email: '',
    password: ''
  };

  componentDidMount() {
    this.props.authenticate(this);
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.email && this.state.password) {
      API.loginUser({
        email: this.state.email,
        password: this.state.password
      })
        .then(res => {
          if (res.status === 200) {
            this.props.authenticate(this);
            return <Redirect to="/contacts" />;
          }
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.loading) return <div></div>;
    else if (!this.state.authenticated) return (
      <Container fluid>
        <Row>
          <Col size="12">
            <form>
              <Input
                value={this.state.email}
                onChange={this.handleInputChange}
                name="email"
                placeholder="email (required)"
              />
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                placeholder="(required)"
                type="password"
              />

              <FormBtn
                disabled={!(this.state.email && this.state.password)}
                onClick={this.handleFormSubmit}>
                Submit
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
    );
    else return <Redirect to="/" />;
  }
}

export default Login;
