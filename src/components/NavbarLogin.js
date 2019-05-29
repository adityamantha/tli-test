import React, { Component } from 'react';
import {
    Form,
    FormControl,
    Button,
    Col,
    Navbar,
} from 'react-bootstrap';
import '../assets/App.css';
import logo from '../assets/logo.png';

export default class NavbarLogin extends Component {
    render() {
        return (
            <Navbar bg="primary" variant="dark" fixed="top">
                <Col>
                    <Navbar.Brand><img className="nav-logo" src={logo} alt="TLI Logo" /></Navbar.Brand>
                </Col>
                <Col>
                    <Form
                        name="login"
                        inline
                        noValidate
                        validated={this.props.validateLogin}
                        onSubmit={e => this.props.handleSubmit(e)}
                    >
                        <FormControl
                            type="email"
                            name="loginEmail"
                            id="loginEmail"
                            onChange={this.props.handleInputChange}
                            placeholder="Email"
                            className="mr-sm-2"
                            required
                        />
                        <FormControl
                            type="password"
                            name="loginPassword"
                            id="loginPassword"
                            onChange={this.props.handleInputChange}
                            placeholder="Password"
                            className="mr-sm-2"
                            required
                        />
                        <Button variant="outline-light" type="submit">Log In</Button>
                    </Form>
                </Col>
            </Navbar>
        )
    }
}