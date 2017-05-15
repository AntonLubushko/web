// Route localhost/users

import React, {Component} from 'react';

const styles = {
    indexPage: {textAlign: 'center'},
};

export default class AddUser extends Component {
    render() {
        return (
            <h1 style={styles.indexPage} >
                Page for adding a USER
            </h1>
        );
    }
};