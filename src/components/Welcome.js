import React, { Component } from 'react';
import {
    Card
} from 'react-bootstrap';
import background from '../assets/back.jpg';

export default class Welcome extends Component {
    render() {
        return (
            <>
                <Card>
                    <Card.Body>
                        <div>
                            <h1>Welcome, {this.props.user.firstName}!</h1>
                            We've been expecting you
                            <br />
                            Select your writing style(s)
                            <input />
                            <input />
                            <input />
                            <input />
                            

                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }
}