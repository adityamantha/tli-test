import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormControl,
    Button,
    Row,
    Col,
    InputGroup,
    Navbar,
} from 'react-bootstrap';
import '../assets/App.css';
import { debounce } from 'lodash';
import Signup from '../components/Signup';
import { setToken } from '../services/tokenService';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validateSignUp: false,
            validateLogin: false,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.debounceChange = debounce(this.handleInputChange, 300);
    }

    login = async () => {
        try {
            const { loginEmail, loginPassword } = this.state;
            const loginResponse = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email:loginEmail, password:loginPassword }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { data } = await loginResponse.json();
            const [tokenData] = data;
            const { token } = tokenData;
            setToken(token);
            this.props.fetchUser();
        } catch (e) {
            console.error('error:', e);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = (target.type === 'radio' || target.type === 'checkbox') ? target.id : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form.name === 'login') {
            this.setState({ validateLogin: true });
            this.login();
        }
        if (form.name === 'signUp')
            this.setState({ validateSignUp: true })

        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        const { validateSignUp, validateLogin } = this.state;
        return (
            <>
                <Navbar bg="primary" variant="dark" fixed="top">
                    <Col>
                        <Navbar.Brand>T.L.I</Navbar.Brand>
                    </Col>
                    <Col>
                        <Form
                            name="login"
                            inline
                            noValidate
                            validated={validateLogin}
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <FormControl
                                type="email"
                                name="loginEmail"
                                id="loginEmail"
                                onChange={this.handleInputChange}
                                placeholder="Email"
                                className="mr-sm-2"
                                required
                            />
                            <FormControl
                                type="password"
                                name="loginPassword"
                                id="loginPassword"
                                onChange={this.handleInputChange}
                                placeholder="Password"
                                className="mr-sm-2"
                                required
                            />
                            <Button variant="outline-light" type="submit">Log In</Button>
                        </Form>
                    </Col>
                </Navbar>
                <div className="container marTop56">
                    <Row>
                        <Col>
                            <Signup />
                        </Col>
                        <Col>
                            <div>
                                <h1>Sign Up!</h1>
                            </div>
                            <Form
                                name="signUp"
                                onSubmit={e => this.handleSubmit(e)}
                                noValidate
                                validated={validateSignUp}
                            >
                                <Row>
                                    <Col>
                                        <Form.Group controlId="firstName">
                                            <Form.Control
                                                required
                                                onChange={this.handleInputChange}
                                                placeholder="First name"
                                                name="firstName"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="lastName">
                                            <Form.Control
                                                required
                                                onChange={this.handleInputChange}
                                                placeholder="Last name"
                                                name="lastName"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="email">
                                            <Form.Control
                                                required
                                                onChange={this.handleInputChange}
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                            />
                                            <Form.Text className="text-muted">
                                                We'll never share your email with anyone else.
                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="username">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>@</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    required
                                                    placeholder="Username"
                                                    aria-label="Username"
                                                    aria-describedby="username"
                                                    name="username"
                                                    onChange={this.handleInputChange}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="password">
                                            <Form.Control
                                                required
                                                onChange={this.handleInputChange}
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="confirmPassword">
                                            <Form.Control
                                                required
                                                onChange={this.handleInputChange}
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGroupBirthday">
                                        <h4>Birthday</h4>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="month">
                                        <Form.Control
                                            onChange={this.handleInputChange}
                                            type="number"
                                            name="month"
                                            max="12"
                                            placeholder="Month"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="day">
                                        <Form.Control
                                            onChange={this.handleInputChange}
                                            type="number"
                                            name="day"
                                            max="31"
                                            placeholder="Day"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="year">
                                        <Form.Control
                                            onChange={this.handleInputChange}
                                            type="number"
                                            name="year"
                                            min="1900"
                                            max="2001"
                                            placeholder="Year"
                                            required
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Check
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            id="female"
                                            onChange={this.handleInputChange}
                                            required
                                            inline
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            id="male"
                                            onChange={this.handleInputChange}
                                            required
                                            inline
                                        />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit">
                                            Sign Up
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>

            </>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object,
    fetchUser: PropTypes.func,
};

export default Login;