import React, {Component} from 'react';

export default class User extends Component {
    render() {
       
        return (
            <ul>
				<li>Name {this.props.name}</li>
				<li>Email {this.props.email}</li>
				<li>Town {this.props.town}</li>
			</ul>
        );
    }
};