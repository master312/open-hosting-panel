import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Button, ButtonDropdown, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Table,
} from 'reactstrap';

import './../../Service.css'


class List extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  getRootPath() {
    // .path is like: "base.com/service/list"
    var path = this.props.match.path
    var index = path.indexOf('list')
    return path.substring(0, index > 0 ? index : path.length)
  }
  
  render() {
    return (
      <Container fluid={ true }>
        <CardBody>
          <Button color="primary" onClick={() => this.props.history.push(this.getRootPath() + "new")}>New service</Button>

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
                Satanic Stuff
              </td>
              <td>
                <div class="text-success">Running</div>
                <div className="small text-muted">
                  Uptime: 6d 6h 6m
                </div>
              </td>
              <td className="text-center">
                root.satan.com
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
      </Container>
    )
  }
}

export default withRouter(List)