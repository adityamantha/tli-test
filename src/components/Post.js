import React, { Component } from 'react';
import '../assets/App.css';
import {
    Card,
    Col,
    CardDeck,
} from 'react-bootstrap';


export default class Post extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const myArray = ['primary', 'secondary', 'dark', 'info', 'danger', 'success'];
        const random = myArray[Math.floor(Math.random() * myArray.length)];
        return (
            <>
                <Card className="col-lg-3 padRightLeft0 marLeftRight20" style={{float: "left"}}>
                <Card.Header>
                    Header
                </Card.Header>
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                            </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                </Card>
            </>
        );
    }
}