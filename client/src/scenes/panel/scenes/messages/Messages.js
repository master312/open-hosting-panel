import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'


class Messages extends Component {

  render() {
    return (
      <div>
        <h2 class="text-center">PajdoMessages</h2>
      </div>
    )
  }
}

export default withRouter(Messages)