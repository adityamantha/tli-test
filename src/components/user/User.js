import React, { Component } from 'react';
import Avatar from 'react-avatar';

export default class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Avatar name="Aditya Mantha" round="100px" size="200" />
        );
    }
}