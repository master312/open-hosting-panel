import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../../services/Auth'
import './Navigation.css'

class Nav extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-md navbar-light">
        <div class="container">
          <div class="collapse navbar-collapse">
            <div class="navbar-nav">
              <NavLink className="navlink" activeClassName="navlink-active" to="/panel/dashboard">
                <div class="nav-item nav-link">Dashboard</div>
              </NavLink>
              <NavLink className="navlink" activeClassName="navlink-active" to="/panel/service">
                <div class="nav-item nav-link">Services</div>
              </NavLink>
              <NavLink className="navlink" activeClassName="navlink-active" to="/panel/settings">
                <div class="nav-item nav-link">Settings</div>
              </NavLink>
              <NavLink className="navlink" activeClassName="navlink-active" to="/panel/messages">
                <div class="nav-item nav-link">Messages</div>
              </NavLink>
              <NavLink className="navlink" activeClassName="navlink-active" to="/panel/reports">
                <div class="nav-item nav-link">Reports</div>
              </NavLink>
            </div>
            <div class="navbar-nav ml-auto">
              <a href="/" onClick={()=>logout()} class="nav-item nav-link">Logout</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
