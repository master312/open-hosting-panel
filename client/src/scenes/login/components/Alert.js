import React, { Component } from 'react'

class Alert extends Component {
  constructor() {
    super()

    this.state = {
      isFadingOut: true,
      type: 'danger',
      text: 'placeholder'
    }

    this.timeout = null
  }

  show(type, text) {
    this.setState({
      isFadingOut: false,
      type: type,
      text: text
    })

    clearTimeout(this.timeout)

    this.timeout = setTimeout(() => this.setState({isFadingOut: true}), 4000)
  }

  hide() {
    clearTimeout(this.timeout)
    this.setState({
      isFadingOut: true
    })
  }

  render(props) {
    return(
      <div class={this.state.isFadingOut ? "fade hide" : "fade show"}>
        <div class={"alert alert-" + this.state.type} role="alert">
          {this.state.text}
        </div>
      </div>
    )
  }

}

export default Alert