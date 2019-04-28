import React, { Component } from 'react';
import Post from '../components/Post';
import {
    CardDeck,
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import User from './User';

export default class Feed extends Component {

    componentDidMount() {
        console.log("Loaded");

    }

    render() {
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const rowCount = Math.floor(arr.length / 3);
        console.log(rowCount);
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col lg={2}>
                            <User />
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
            </>
        )
    }

}