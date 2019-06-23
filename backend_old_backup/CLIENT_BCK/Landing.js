// /**
//  * This is used to redirect to main page if user is not logged in, or to login page if session has expired.
//  */

// import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import {getAccessToken, isSessionValid } from '../utils/UserFunctions'

// import Welcome from '../scenes/welcome/Welcome'
// // import dashboard from '../scenes/dashboard'

// class Landing extends Component {


//   componentDidMount() {
//     this.isLoggedIn = false
//     if (getAccessToken() != null) {
//       /* TODO: Check session validity */
//       this.isLoggedIn = true;
//     }
//   }

// }

// export default withRouter(Landing)