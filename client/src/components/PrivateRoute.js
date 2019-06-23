/** This is used to determine if a user is authenticated and if they are allowed to visit the page they navigated to.
 * If they are: they proceed to the page. If not: they are redirected to the '/' page. 
 * 
 * TODO:
 *  If user is not logged in redirect to home (/)
 *  If user session has expired, redirect to login (/login) */

import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getAccessToken } from '../services/User'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = getAccessToken() != null;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute