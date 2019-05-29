import React, { Component } from 'react';
import '../assets/App.css';
import {
    Card,
} from 'react-bootstrap';
import Avatar from 'react-avatar';


export default class Post extends Component {

    render() {
        return (
            <>
                <Card className="col-lg-3 padRightLeft0 marLeftRight20" style={{ float: "left" }}>
                    <Card.Header>
                        <div>
                            <span>Aditya Mantha</span>
                            <Avatar className="pull-right" name="Aditya Mantha" round="50px" size="50" />
                        </div>
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