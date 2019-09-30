import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { getCredidentals } from '../../../../../../services/CredidentalsProvider'

class GitCredidentals extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      selectedGitCredidentalsName: null,
      selectedGitCredidentalsId: null,
      gitNewModal: false,
      gitEditModal: false,
      gitDeleteModal: false,
      gitCredidentalsList: []
    }

    this.toggleGitNewModal = this.toggleGitNewModal.bind(this)
    this.toggleGitEditModal = this.toggleGitEditModal.bind(this)
    this.selectGitCredidentals = this.selectGitCredidentals.bind(this)
    this.toggleGitDeleteModal = this.toggleGitDeleteModal.bind(this)
  }

  
  componentWillMount() {
    getCredidentals('git-user').then((data) => {
      this.setState({gitCredidentalsList: data})
    }).catch((error) => {
      alert("Err " + error)
    })
  }

  selectGitCredidentals(name, id) {
    this.setState({ selectedGitCredidentalsName: name,
                    selectedGitCredidentalsId: id })
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
          <ModalHeader toggle={this.toggleGitEditModal}>Edit '<i>{this.state.selectedGitCredidentalsName}</i>' credidentals</ModalHeader>
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
          <ModalHeader toggle={this.toggleGitDeleteModal}>Delete '<i>{this.state.selectedGitCredidentalsName}</i>' credidentals</ModalHeader>
          <ModalBody>
            ARE YOU ABSOLITELLYYYYY SURE YOU WANT TO PROCEED MY SON?!??! <br />
            Credidentals known by '<i>{this.state.selectedGitCredidentalsName}</i>' will forever lost!
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.toggleGitDeleteModal}>YES</Button>
            <Button color='primary' onClick={this.toggleGitDeleteModal}>NOPE</Button>
          </ModalFooter>
        </Modal>

        <Label> GIT Credidentals: </Label>
        <Row>
          <Col>
            <Input type='select' onChange={ (event) => this.selectGitCredidentals(event.target.options[event.target.selectedIndex].text, event.target.value) } >
              <option value="" hidden>Select credidentals</option>
              {this.state.gitCredidentalsList.map(item => {
                return (<option value={item.id} name={item.name} >{item.name}</option>)
              })}
            </Input>
            <Button color='primary' onClick={() => this.toggleGitNewModal() }>New</Button> {' '}
            <Button color='primary' disabled={this.state.selectedGitCredidentalsName === null} onClick={ () => this.toggleGitEditModal() }>Change password</Button> {' '}
            <Button color='danger' disabled={this.state.selectedGitCredidentalsName === null} onClick={ () => this.toggleGitDeleteModal() }>Delete</Button> {' '}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(GitCredidentals)