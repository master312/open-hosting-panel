import React, { Component } from 'react';
import './demo.css';

class DemoComponent extends Component {
  constructor() {
    super();
    this.state = {
      demo: []
    };
  }

  componentDidMount() {
    fetch('/api/hello_wolrd_test')
      .then(res => res.json())
      .then(demo => this.setState({demo}, () => console.log('demo fetched...', demo)));
  }

  render() {
    return (
      <div>
        <h2>The holy data has been delivered from old mighty backend service with love</h2>
        <ul>
        {this.state.demo.map(theData => 
          <li key={theData.id}>{theData.data1} <br /> {theData.subData}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default DemoComponent;
