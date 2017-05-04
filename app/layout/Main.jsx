import React, {Component} from 'react';
import Helmet from '../components/Helmet.jsx';

import {Link, IndexLink} from 'react-router';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>


export default class Main extends Component{

    render() {
        let {content} = this.props;
        return (
            <MuiThemeProvider>
                <div id="app-wrapper">
                    <Helmet
                        titleTemplate="APP BASE"
                        title="APP BASE"
                        description="APP BASE"
                        image="/images/logo.png"
                    />
                    <Header/>
                    <div id="app-content">

                        <h1> ++++++ LAYOUT CONTENT ++++++ </h1>


                        {this.props.children}


                        <h1> ++++++ LAYOUT CONTENT ++++++ </h1>


                    </div>
                    <Footer/>
                </div>
            </MuiThemeProvider>
        );
    }
};