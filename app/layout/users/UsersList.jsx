import React, {Component} from 'react';

const styles = {
    indexPage: {textAlign: 'center'},
};

export default class UsersList extends Component {
    render() {
        return (
            <h1 style={styles.indexPage} >
                Users
            </h1>
        );
    }
};