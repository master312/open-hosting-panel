import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Card, CardHeader, CardBody, Col, Row} from 'reactstrap';

import './Settings.css'

import GitCredidentals from './components/git-credidentals/GitCredidentals'

class Settings extends Component {

  render() {
    return (
      <Container fluid={ true }>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h2>User settings</h2>
              </CardHeader>
              <CardBody>
                TODO
              </CardBody>
            </Card>
          </Col>

          <Col>
            <Card>
              <CardHeader>
                <h2>Credidentals</h2>
              </CardHeader>
              <CardBody>
                <Col>
                  <GitCredidentals />
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h2>Other settings</h2>
              </CardHeader>
              <CardBody>
                TODO
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Settings)