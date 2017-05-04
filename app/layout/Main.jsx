import React, {Component} from 'react';

import {Link, IndexLink} from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

export default class Main extends Component {

    render() {
        let {content} = this.props;
        return (
            <MuiThemeProvider>
                <div id="app-wrapper">
                    <div id="app-content">
                        {this.props.children}
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
};