import React, { Component } from 'react';
import logo from '../logo.svg';
import btn from '../ic_Search.png';
import '../styles/header.css';

class Header extends Component {
  render() {
    return (
      <div className="Encabezado">
          <img src={logo} className="Logo1" alt="logo"/>
          <form action = "/items" method="get">
          <input className="barra" type="text" name = "search" placeholder="Nunca dejes de buscar"/>
          <button className="btn-Lupa" type="submmit">
            <img src={btn} className="lupa" />
          </button>
        </form>
      </div>
    );
  }
}

export default Header;
