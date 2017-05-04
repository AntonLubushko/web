
import React, {Component} from 'react';
import Helmet from '../components/Helmet.jsx';

import {Link} from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

export default class NotFound extends Component{
    render() {
        return (
            <div>
                <Helmet title="Index Page" />
                    <div style={{textAlign:'center'}}
                         className="index-page">
                        <h1>
                            Index Page
                        </h1>
                        <Link to="/user">
                            <RaisedButton label="!Profile!" />
                        </Link>


                    </div>
            </div>
        );
    }
};