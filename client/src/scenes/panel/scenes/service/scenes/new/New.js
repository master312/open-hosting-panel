import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Col, Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';

import './../../Service.css'


class New extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      selectedRunner: '',
      selectedSource: '',
      instanceName: '',
      domainName: '',
    };
    this.selectSource = this.selectSource.bind(this);
    this.selectRunner = this.selectRunner.bind(this);
    this.updateInstanceName = this.updateInstanceName.bind(this);
    this.updateDomainName = this.updateDomainName.bind(this);
  }

  selectSource(selectedOption) {
    this.setState({ selectedSource: selectedOption })
  }

  selectRunner(selectedOption) {
    this.setState({ selectedRunner: selectedOption })
  }
  
  updateInstanceName(value) {
    this.setState({ instanceName: value });
  }

  updateDomainName(value) {
    this.setState({ domainName: value });
  }

  render() {
    return (
      <Container fluid={ true }>
        <Form className='form'>
          <Col>
            <FormGroup>
              <Label>Instance name:</Label>
              <Input type='text' name='name' id='name' placeholder='My awsome app' onChange={ (event) => this.updateInstanceName(event.target.value) }/>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Domain:</Label>
              <Input type='text' name='domain' id='domain' placeholder='awsomeapp.com' onChange={ (event) => this.updateDomainName(event.target.value) } />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Runner type:</Label>
              <Input type='select' onChange={ (event) => this.selectRunner(event.target.value) }>
                <option value="" hidden>select runner</option>
                <option value='node'>NodeJS</option>
                <option value='java' disabled>Java</option>
                <option value='php' disabled>PHP</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Source:</Label>
              <Input type='select' onChange={ (event) => this.selectSource(event.target.value) } >
                <option value="" hidden>select source</option>
                <option value='git'>Git</option>
                <option disabled value='local'>Local</option>
                <option disabled>FTP</option>
              </Input>
            </FormGroup>
            <FormGroup hidden={ this.state.selectedSource !== 'git'}>
              <Label>GIT settings:</Label>
              {/* onChange={ (event) => this.selectSource(event.target.value) } */ }
              <Row>Link: <Input type='text' placeholder='https://github.com/insertheroicname/my-project'/> </Row>
              <Row>Credidentals:
                <Input type='select'>
                <option value="" hidden>select credidentals</option>
                </Input>
              </Row>
            </FormGroup>
          </Col>
          
          <Button>Submit</Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(New)