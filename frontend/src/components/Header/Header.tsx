import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export interface HeaderProps {
  buttons: JSX.Element[];
}
export interface HeaderState {
  burgerIsActive: boolean;
}

class Header extends Component<HeaderProps, HeaderState> {
  state = {
    burgerIsActive: false
  }

  handleToggleMenuClick = () => {
    this.setState({ burgerIsActive: !this.state.burgerIsActive });
  }

  render() {
    return (
      <nav className="header navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="#" className="header__title navbar-item">Receptplaneraren</a>

          <a
            role="button"
            href="#"
            className= {"navbar-burger burger " + (this.state.burgerIsActive ? 'is-active' : '')}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.handleToggleMenuClick}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className={"navbar-menu " + (this.state.burgerIsActive ? 'is-active' : '')}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons header__buttons">{this.props.buttons}</div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;
