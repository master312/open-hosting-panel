import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  ButtonDropdown,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from 'reactstrap';

import './../../Service.css'


class List extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  
  render() {
    return (
      <div class="container-fluid">
        <CardBody>
          <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Domain</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className="text-center">
                Magic Shop
              </td>
              <td>
                <div class="text-success">Running</div>
                <div className="small text-muted">
                  Uptime: 1d 11h 17m
                </div>
              </td>
              <td className="text-center">
                dop.com
              </td>
              <td>
                <div className="clearfix">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret color="primary">
                      Take action
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem disabled>Start</DropdownItem>
                      <DropdownItem>Stop</DropdownItem>
                      <DropdownItem>Restart</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </div>
              </td>
            </tr>
            </tbody>
          </Table>
        </CardBody>
      </div>
    )
  }
}

export default withRouter(List)