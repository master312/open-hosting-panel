import React, { Component } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import {
  Card,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

import './Service.css'
import List from './scenes/list/List' 
import New from './scenes/new/New' 

class Service extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  
  getRootPath() {
    // .path will containt star on the end. Like so: "base.com/service/*"
    var path = this.props.match.path
    if (path[path.length] !== '/') {
      path += '/'
    }
    var index = path.indexOf('*')
    return path.substring(0, index > 0 ? index : path.length)
  }

  render() {
    return (
      <div class="container-fluid">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h2>Services</h2>
              </CardHeader>
              
              <Route exact path={ this.getRootPath() } render={() => (
                  <Redirect to={this.getRootPath() + "list"} />
              )}/>

              <Route exact path={this.getRootPath() + "list" } component={List} />
              <Route exact path={this.getRootPath() + "new" } component={New} />

            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Service)