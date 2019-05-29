import React, { Component } from 'react';
import Avatar from 'react-avatar';

export default class User extends Component {

    render() {
        const name = `${this.props.user.firstName} ${this.props.user.lastName}`;
        console.log(name);
        return (
            <Avatar name={name} round="100px" size="200" />
        );
    }
}