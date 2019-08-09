import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">E-Food Challenge</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/menu" className="nav-link">Menu</Link>
          </li>
          <li className="navbar-item">
          <Link to="/orders" className="nav-link">Orders</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}