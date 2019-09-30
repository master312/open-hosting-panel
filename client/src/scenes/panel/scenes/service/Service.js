import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

import './Service.css'
import List from './scenes/list/List' 


class Service extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }
  
  render() {
    return (
      <div class="container-fluid">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h2>Services</h2>
                <br />
                <Button color="primary">New service</Button>{' '}
              </CardHeader>

              <List />
              
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default withRouter(Service)