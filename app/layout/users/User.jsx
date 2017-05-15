import React, {Component} from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
export default class User extends Component {
    render() {
        return (
        <TableRow>
        <TableRowColumn>{this.props.name}</TableRowColumn>
        <TableRowColumn>{this.props.email}</TableRowColumn>
        <TableRowColumn>{this.props.town}</TableRowColumn>
        </TableRow>
	  );
    }
};