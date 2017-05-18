// Route localhost/git
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

const styles = {
    indexPage: {textAlign: 'center'},
};

export default class NotFound extends Component {
    render() {
        return (
            <div style={styles.indexPage} >
               <Link to={'/users'}>
                 <RaisedButton label="to users" primary={true}/>
               </Link>
            </div>
        );
    }
};