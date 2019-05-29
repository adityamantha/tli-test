import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    FormControl,
    Button,
    Row,
    Col,
    InputGroup,
} from 'react-bootstrap';
import '../assets/App.css';
import { debounce } from 'lodash';
import Signup from '../components/Signup';
import { setToken } from '../services/tokenService';
import NavbarLogin from './NavbarLogin';
import Moment from 'moment';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            validateSignUp: false,
            firstSignIn: true,
            isDateValid: '',
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkDate = this.checkDate.bind(this);
        this.debounceChange = debounce(this.handleInputChange, 300);
    }

    login = async () => {
        try {
            const { loginEmail, loginPassword } = this.state;
            const loginResponse = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
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

    signUp = async () => {
        try {
            const {
                firstName,
                lastName,
                email,
                username,
                password,
                confirmPassword,
                date,
                gender,
                firstSignIn,
            } = this.state;
            const signUpResponse = await fetch('/api/users/signup', {
                method: 'POST',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                    confirmPassword,
                    date,
                    gender,
                    firstSignIn
                }),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            const { data } = await signUpResponse.json();
            console.log('response from the create::: ', data);
            const [tokenData] = data;
            const { token } = tokenData;
            setToken(token);
            this.props.fetchUser();

        } catch (e) {
            console.error('error:', e);
        }
    };

    handleInputChange(event) {
        const target = event.target;
        const value = (target.type === 'radio' || target.type === 'checkbox') ? target.id : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
        })
    }

    checkDate(month, day, year) {
        console.log(month, day, year);
        const dateValidity = Moment(`${month}-${day}-${year}`, "MM-DD-YYYY").isValid();
        console.log('Valid', dateValidity);
        this.setState({ isDateValid: dateValidity });
        console.log('Inside check date:::', this.state.isDateValid);
        return this.state.isDateValid;
    };


    handleSubmit(event) {
        this.setState({ isDateValid: true });
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (form.name === 'login') {
            this.setState({ validateLogin: true });
            if (form.name === 'login' && form.checkValidity() === true) {
                this.login();
            }
        }
        if (form.name === 'signUp')
            this.setState({ validateSignUp: true })
        if (form.name === 'signUp' && form.checkValidity() === true) {
            const isDateValid = Moment(`${this.state.month}-${this.state.day}-${this.state.year}`, "MM-DD-YYYY").isValid();
            console.log('Date :: ', isDateValid);
            if (isDateValid) {
                this.signUp();
            } else {
                this.setState(function(state, props) {
                    return {
                        isDateValid: false
                    };
                  });
                console.log("Date Validity ::: ", this.state.isDateValid);
            }
        }

        event.preventDefault();
        event.stopPropagation();
    }

    render() {
        const { validateSignUp, validateLogin } = this.state;
        return (
            <>
                <NavbarLogin
                    validateLogin={validateLogin}
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                />
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
                                            isValid={this.state.isDateValid}
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
                                            isValid={this.state.isDateValid}
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
                                            isValid={this.state.isDateValid}
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