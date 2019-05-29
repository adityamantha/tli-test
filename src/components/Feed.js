import React, { Component } from 'react';
import Post from '../components/Post';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import {
    Link
} from 'react-router-dom';
import User from './User';
import { removeToken } from '../services/tokenService';
import Welcome from './Welcome';
import '../assets/App.css';


export default class Feed extends Component {

    componentDidMount() {
        console.log("Loaded User::: ", this.props.user);
    }

    logout = () => {
        removeToken();
        window.location.reload();
    }

    render() {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return (
            <>
                {
                    this.props.user.firstSignIn && (
                        <Container fluid className="padRightLeft0">
                            <Link to="/login" onClick={this.logout}> Log Out</Link>
                            <Welcome user={this.props.user} />
                        </Container>
                    )
                }
                {
                    !this.props.user.firstSignIn && (
                        <Container fluid>
                            <Link to="/login" onClick={this.logout}> Log Out</Link>
                            <Row>
                                <Col lg={2}>
                                    <User user={this.props.user} />
                                </Col>
                                <Col>
                                    {/* <CardDeck> */}
                                    {
                                        arr.map((el, index) => {
                                            return (
                                                <Post key={index} title={el} />
                                            )
                                        })

                                    }
                                    {/* </CardDeck> */}
                                </Col>
                                <Col lg={2} >
                                    Search
                            </Col>
                            </Row>
                        </Container>
                    )
                }

            </>
        )
    }

}