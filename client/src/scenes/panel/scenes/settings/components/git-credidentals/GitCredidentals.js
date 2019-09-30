import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class GitCredidentals extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      selectedGitCredidentals: null,
      gitNewModal: false,
      gitEditModal: false,
      gitDeleteModal: false
    }

    this.toggleGitNewModal = this.toggleGitNewModal.bind(this)
    this.toggleGitEditModal = this.toggleGitEditModal.bind(this)
    this.selectGitCredidentals = this.selectGitCredidentals.bind(this)
    this.toggleGitDeleteModal = this.toggleGitDeleteModal.bind(this)
  }

  selectGitCredidentals(value) {
    this.setState({ selectedGitCredidentals: value })
  }

  toggleGitNewModal() {
    this.setState({ gitNewModal: !this.state.gitNewModal })
  }

  toggleGitDeleteModal() {
    this.setState({ gitDeleteModal: !this.state.gitDeleteModal })
  }

  toggleGitEditModal() {
    this.setState({ gitEditModal: !this.state.gitEditModal })
  }

  render() {
    return (
      <Container className='bg-light'>
        {/* Git new credidentals modal */}
        <Modal isOpen={this.state.gitNewModal} toggle={this.toggleGitNewModal} >
          <ModalHeader toggle={this.toggleGitNewModal}>Add new GIT credidentals</ModalHeader>
          <ModalBody>
            <Row>
              <Col><Input type='text' placeholder='Username' /></Col>
              <Col><Input type='text' placeholder='Password' /></Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggleGitNewModal}>Save</Button>
            <Button color='secondary' onClick={this.toggleGitNewModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* Git edit credidentals modal */}
        <Modal isOpen={this.state.gitEditModal} toggle={this.toggleGitEditModal} >
          <ModalHeader toggle={this.toggleGitEditModal}>Edit '<i>{this.state.selectedGitCredidentals}</i>' credidentals</ModalHeader>
          <ModalBody>
            <Row>
              <Col><Input type='text' placeholder='New password' /></Col>
              <Col><Input type='text' placeholder='Confirm password' /></Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggleGitEditModal}>Save</Button>
            <Button color='secondary' onClick={this.toggleGitEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        {/* Git delete credidentals modal */}
        <Modal isOpen={this.state.gitDeleteModal} toggle={this.toggleGitDeleteModal} >
          <ModalHeader toggle={this.toggleGitDeleteModal}>Delete '<i>{this.state.selectedGitCredidentals}</i>' credidentals</ModalHeader>
          <ModalBody>
            ARE YOU ABSOLITELLYYYYY SURE YOU WANT TO PROCEED MY SON?!??! <br />
            Credidentals known by '<i>{this.state.selectedGitCredidentals}</i>' will forever lost!
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.toggleGitDeleteModal}>YES</Button>
            <Button color='primary' onClick={this.toggleGitDeleteModal}>NOPE</Button>
          </ModalFooter>
        </Modal>

        <Label> GIT Credidentals: </Label>
        <Row>
          <Col>
            <Input type='select' onChange={ (event) => this.selectGitCredidentals(event.target.value) } >
              <option value="" hidden>Select credidentals</option>
              <option value="PH Cred 1" >PH Cred 1</option>
            </Input>
            <Button color='primary' onClick={() => this.toggleGitNewModal() }>New</Button> {' '}
            <Button color='primary' disabled={this.state.selectedGitCredidentals === null} onClick={ () => this.toggleGitEditModal() }>Change password</Button> {' '}
            <Button color='danger' disabled={this.state.selectedGitCredidentals === null} onClick={ () => this.toggleGitDeleteModal() }>Delete</Button> {' '}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(GitCredidentals)